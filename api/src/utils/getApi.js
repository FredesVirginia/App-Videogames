
const API_KEY ="97e9895abf9b42af856bd5453366cb64";
const axios = require('axios').default;
const { Videogame , Platforms , Genres} = require ("../db")
require('dotenv').config();

   
    const getApiiO = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`);
        const allVideogames = response.data.results;
        const gameRequests = allVideogames.map(game => axios.get(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`));
        const gameResponses = await axios.all(gameRequests);
        const gamesWithDescriptions = gameResponses.map(response => {
          const { id, name, description, background_image, rating, released } = response.data;
        const platforms = response.data.platforms.map(platform => platform.platform.name);
          const platformsString = platforms.join(", ");
          const genres = response.data.genres.map(genre => genre.name);
          const generosString = genres.join(", ");
          return {
            id,
            name,
            image: background_image,
            description:description.replaceAll(/<[^>]+>/g, " "),
            genres: generosString,
            platforms: platformsString,
            rating,
            released,
          };
        });

        return gamesWithDescriptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const getApii = async () => {
      try {
        let apiGames = [];
    
        const url1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`);
        const url2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
        const url3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
        const url4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
        const url5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);
    
        apiGames = url1.data.results.concat(
          url2.data.results,
          url3.data.results,
          url4.data.results,
          url5.data.results
        );
    
        const gameRequests = apiGames.map(game => axios.get(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`));
        const gameResponses = await Promise.all(gameRequests);
        const gamesWithDescriptions = gameResponses.map(response => {
          const { id, name, description, background_image, rating, released } = response.data;
          const platforms = response.data.platforms.map(platform => platform.platform.name);
          const platformsString = platforms.join(", ");
          const genres = response.data.genres.map(genre => genre.name);
          const generosString = genres.join(", ");
          return {
            id,
            name,
            image: background_image,
            description: description.replaceAll(/<[^>]+>/g, " "),
            genres: generosString,
            platforms: platformsString,
            rating,
            released,
          };
        });
    
        return gamesWithDescriptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    
    



    const getBBDD = async () =>{
        let videoGame = await Videogame.findAll({
          include: [
            {
              model: Platforms,
              as: 'platforms',
            },
            {
              model: Genres,
              as: 'genres',
            },
          ],
        });
        //FORMATEO
        videoGame = videoGame.map((game) => {
          return {
            id: game.id,
            name: game.name,
            rating: game.rating,        
            released: game.released,
            image: game.image,
            description: game.description,
            platforms: game.platforms.map((platform) => {
              return  platform.name;
              }).join(" ,"),
            genres: game.genres.map((genre) => {
              return genre.name;
              }).join(" ,"),
            userCreated: true,
          };
        });
          return videoGame;
        }



    const getAllVideogame = async ()=>{
      const allVideogameApi  =  await getApii();
      const allVideogameBBDD =  await getBBDD();
      const allVideogame = allVideogameApi.concat(allVideogameBBDD);
        return allVideogame;
    }

   

    
    const getGenres = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=300`);
        const allVideogames = response.data.results.map((game) => {
          const genres = game.genres.map((genre) => genre.name);
          const generosString = genres.join(", ");
          const generosArray = generosString.split(", ");
          return generosArray;
        }).flat().filter((genero) => genero !== "");
    
        const resultado = [...new Set(allVideogames)];
        console.log("La platforma dsde getPlatforms", resultado)
        return resultado;
    
      } catch (error) {
        console.log("Error desde el back Genreros", error);
      }
    }
    


    const getPlatforms = async ()=>{
      try{
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=300`);
        const allVideogames = response.data.results.map((game) => {
          const platforms = game.platforms.map((g) => g.platform.name);
          const platformsString = platforms.join(" , ");
          const platformArray = platformsString.split(",");
          return platformArray
        }).flat().filter((plataforma) => plataforma !== "");

        const resultado = [... new Set(allVideogames)]

          return resultado;

           
       }catch(error){
           console.log("Error desde el back Genreros" , error);
       }
    }


module.exports = { getApii , getAllVideogame , getBBDD , getGenres , getPlatforms };