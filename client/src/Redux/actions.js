import axios from "axios";

    export function getAllVideogames(){
        return async function (dispatch){
            try{
                const allVideogames = await axios.get("http://localhost:3001/videogames");
                return dispatch ({
                    type: "GET_ALL_VIDEOGAMES",
                    payload: allVideogames.data
                })
                
            }catch(error){
                console.log("Error desde action ", error);
            }
        }
    }

    export function changePage(page){
        return {
            type: "CHANGE_PAGE",
            payload : page
        }
    }
    export function getVideogameId(id){
        return async function (dispatch){
            try{
                const response = await axios.get(`http://localhost:3001/videogames/game/${id}`);
                console.log("La respueta desde action ID es " , response.data);
                 dispatch({
                        type: "VIDEOGAME_FOR_ID",
                        payload : response.data
                })
            }catch(error){
                console.log("Eoor desde action id", error);
            }
        }
    }

    export function getAllVideogamesAPI(){
        return async function(dispatch){
            try{
                let allVideogames = await axios.get("http://localhost:3001/videogames");
                let respuesta = allVideogames.data.filter((game) =>  {return  game.userCreated === false});
                console.log("Reustas deste action getGameApi", respuesta)
                dispatch({
                    type: "GET_ALL_VIDEOGAMES_API",
                    payload : respuesta
                 })
            }catch(error){
                console.log("Error desde action getGameApi" , error);
            }
        }
    }

    export function getAllVideogamesBBDD(){
        return async function(dispatch){
            try{
                let allVideogames = await axios.get("http://localhost:3001/videogames");
                let respuesta = allVideogames.data.filter((game) =>  {return  game.userCreated === true});
                console.log("Reustas deste action getGameApi", respuesta)
                dispatch({
                    type: "GET_ALL_VIDEOGAMES_BBDD",
                    payload : respuesta
                 })
            }catch(error){
                console.log("Error desde action getGameApi" , error);
            }
        }
    }


    export function deleteVideogame(id){
        console.log("EL id del delete de action" , id)
          
            let ide = id.toString().includes("-");
           if(ide){
             return async function (dispatch){
                try{
                const response = await axios.delete(`http://localhost:3001/videogames/${id}`);
                console.log("VIDEOGAME BORRADO" , response);
                dispatch({
                    type: "DELETE_BBDD",
                    payload : response.data
                })
                }catch(error){

                }
             }
           } else{
              return function(dispatch) {
                dispatch({ 
                    type: "DELETE_APII",
                    payload : id
              })
           }
        }
    }

    export function updateVideogame (id , videogame){
        return async function (dispatch){
            try{
                console.log("EL videogames dese action put es ", videogame)
                const reqs = await axios.put(`http://localhost:3001/videogames/${id}`, videogame);
                console.log("EL videogame ACTUALIZADO" , reqs)
                return dispatch ({
                    type : "UPDATE_VIDEOGAME"
                })
            }catch(error){
                console.log("Error de sde action put", error);
                return error;
            }
        }
    }

    export function getNameVideogames(name){
        return async function (dispatch){
            try{
                const allVideogames = await axios.get(`http://localhost:3001/videogames/?name=${name}`);
                return dispatch({
                    type: "GET_NAME_VIDEOGAMES",
                    payload : allVideogames.data
                })
            }catch(error){
                console.log("Error desde actions Name", error)
            }
        }
    }

    export function createVideogame(game){
        return async function (dispatch){
            try{
                const newGame = await axios.post(`http://localhost:3001/videogames`,game);
                console.log("Desde action. Videogame creado es " , newGame);
                return dispatch({
                    type: "CREATE_VIDEOGAME"
                })
            }catch(error){
                console.log("Informe de errores de action Post game" , error);
            }
        }
    }

    export function getGenres(){
        return async function(dispatch){
            try{
                const allGenres = await axios.get("http://localhost:3001/genres");
                return dispatch({
                    type : "GET_ALL_GENRES",
                    payload : allGenres.data
                })
            }catch(error){
                console.log("Informa de errores de action Genres" , error)
            }
        }
    }

    export function getVideogameForGenres(genre){
        return async function (dispatch){
           try{
            const response = await axios.get("http://localhost:3001/videogames");
            const responseGenre = response.data.filter((game) =>{
                //aqui en el split, no se por que pero es necesario poner la coma come esta ahi
                return game.genres && game.genres.split(", ").includes(genre);
            })

             return dispatch({
                type : "GET_VIDEOGAME_FOR_GENRE",
                payload : responseGenre
             })
           }catch(error){
            console.log("Onfroma de errores desde action getGameforGenres" , error);
           }

        }
    }

    export function getPlatforms(){
        return async function (dispatch){
            try{
                const allPlatforms = await axios.get("http://localhost:3001/platforms");
                return dispatch({
                    type: "GET_ALL_PLATFORMS",
                    payload : allPlatforms.data
                })
            }catch(error){
                console.log("Informe de erroes desde action Platform" , error);
            }
        }
    }

    export function getVideogameForPlatform(platform){
        return async function (dispatch){
            try{
                const response = await axios.get("http://localhost:3001/videogames");
                const allresponse= response.data.filter((elem)=>{
                    return elem.platforms && elem.platforms.split(", ").includes(platform)
                });
             return dispatch({
                        type: "GET_VIDEOGAME_FORM_PLATFOMR",
                        payload: allresponse
                })
            }catch(error){
                console.log("Informe de errores desde action getGamePlatform", error);
            }
        }
    }

    export function ordeAscendent(){
        return function (dispatch){
            return dispatch( {
                type: "ORDER_ASCENDENT"
            })
        }
    }

    export function ordeDescendent(){
        return function (dispatch){
            return dispatch( {
                type: "ORDER_DESCENDENT"
            })
        }
    }

    export function orderRatingMin (){
        return function (dispatch){
            return dispatch({
                type : "ORDER_RATING_MIN"
            })
        }
    }

    export function orderRatingMax (){
        return function (dispatch){
            return dispatch({
                type : "ORDER_RATING_MAX"
            })
        }
    }



