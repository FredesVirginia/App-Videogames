const { Router } = require("express");
const { getApii , getAllVideogame  , getBBDD} = require("../utils/getApi");
const { Videogame , Platforms , Genres } =  require ("../db")
const {Sequelize} = require('sequelize');


const router = Router();

      router.get("/", async (req, res)=>{
          const {name} = req.query;
          try{ 
              if(name){
                const response= await getApii();
                const query = name.toLowerCase();
                const responseName = response.filter((element) =>{
                      if(element.name.toLowerCase().includes(query)){
                          return element;
                      }
                  });
                if(responseName){
                  res.status(200).json(responseName);
                }else{
                  res.status(404).send("NO se econtro");
                }
                  
              } else {
                  let respuesta = await getAllVideogame();
                
                  res.status(200).json(respuesta);
              }
              
          }catch(error){
              res.status(404).json(error);
          }
      });

      router.get("/game/:id" , async (req, res)=>{
        try{
          
          const {id}= req.params;
          console.log("El id desde el back es " , id)
          const allVideogames = await getAllVideogame();

          let response = allVideogames.find((el)=> el.id.toString() == id.toString());
          console.log("El videogame id desde el bacj es ", response)
          res.status(200).json(response);
        }catch(error){
          console.log("Error desde el back en el put");
          res.status(404).json(error);
        }
      });

      router.post("/", async (req , res)=>{
        try {
              const { name, rating , released, description, genero , plataforma } = req.body;
              let image = "https://www.semana.com/resizer/zpFAqbo5FBPBFoXFqFO9GQTPi8o=/1920x1080/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/DD5X25JSKJEZ5JDYZAHJH4S27M.jpg";
              let newVideogame = await Videogame.create({ name,  rating, image,released , description});
              let platform = await Platforms.create({ name : plataforma}) ;
              let genre =  await Genres.create({name : genero})     ;  
              newVideogame.addPlatforms(platform);
              newVideogame.addGenres(genre);

              let videogame = await Videogame.findAll( {
                include: [
                  {
                    model: Platforms,
                    attributes: ['name'],
                    through: {
                      attributes: []
                    }
                  },
                  {
                    model: Genres,
                    attributes: ['name'],
                    through: {
                      attributes: []
                    }
                  }
                ]
              });
              console.log("EL video juego es ", videogame)
              res.status(200).json(videogame);
        } catch(error){
            res.status(404).send("Informe de errores desde el Banck" , error)
        }

      });

      router.put("/:id" , async(req, res)=>{
          const {name, description, released, rating, genero,plataforma} = req.body;
          try{
          const {id}= req.params;
          console.log("EL id des del put es ", id);
        
          
              const videogameId = await Videogame.findByPk(id);
            console.log("EL videogameId del put es " , videogameId);
            if(!videogameId){
              console.log("EL video game no exite");
              return res.status(404).json({message : "No existe el videogame"});
            } else{
              //Pasamos a actualizar los datos del Videogame
              videogameId.name = name;
              videogameId.description = description;
              videogameId.released = released;
              videogameId.rating = rating;

              //Pasamos a actualizar los generos del videogame
               await videogameId.setGenres([]);
               await videogameId.setPlatforms([]);
               const platform = await Platforms.create({name: plataforma});
               const genres = await Genres.create({name: genero});
               await videogameId.addPlatforms(platform);
               await videogameId.addGenres(genres);
              //Guadarmos los datos en la base de Datos
                await videogameId.save();
              
                console.log("MODIFICADO CORRECTO")
              
                res.status(200).json(videogameId);
          }
        }catch(error){
          console.log("El error en el banck de put es ", error);
          res.status(404).send(error);
        }
      });

      router.delete("/:id" , async(req, res)=>{
        const { id } = req.params;
        console.log("EL id es ", id)
          try{
            let videogameDelete = await Videogame.findByPk(id);
            if(!videogameDelete){
              res.status(404). send("No se encontro el game del delete");
            }
            else{
              await videogameDelete.destroy();
              console.log("Se logro");
              const respuesta = await getAllVideogame();
              res.status(200).json(respuesta);
            }

          }catch(error){
            console.log("Error desde el back delete" , error);
            res.status(404).send(error);
          }
      });

     

      

module.exports= router;