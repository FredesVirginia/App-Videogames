 import { orderAlpha , ratingMin , ratingMax} from "../Order/order";

const initialState = {
    videogames: [],
     videogameId: {},
    genres : [],
    platforms: [],
    actualPage: 1 
}

export default function reducer( state = initialState, action){
        switch(action.type){
            case "GET_ALL_VIDEOGAMES" : {
                return {
                    ...state,
                    actualPage:1,
                    videogames: action.payload
                }
            }
            case "CHANGE_PAGE":
                return {
                    ...state, 
                    actualPage: action.payload
                } 

            case "GET_NAME_VIDEOGAMES" :{
                return {
                    ...state,
                    actualPage: 1,
                    videogames: action.payload
                }
            }

            case "GET_ALL_VIDEOGAMES_API": {
                return  {
                    ...state,
                    actualPage: 1,
                    videogames: action.payload
                }
            }

            
            case "GET_ALL_VIDEOGAMES_BBDD": {
                return  {
                    ...state,
                    actualPage: 1,
                    videogames: action.payload
                }
            }




            case "VIDEOGAME_FOR_ID" :{
                 return {
                    ...state,
                    actualPage:1,
                    videogameId: action.payload
                 }

            }

            case "GET_ALL_GENRES" : {
                return {
                    ...state,
                     genres : action.payload
                }
            }

            case  "CREATE_VIDEOGAME" : {
                return {
                    ...state
                }
            }

            case "UPDATE_VIDEOGAME": {
                return {
                    ...state
                }
            }

            case "DELETE_BBDD" :{
                return {
                    ...state,
                    actualPage:1,
                    videogames: action.payload
                }
            }

            case  "DELETE_APII" : {
                const filterVideogames = state.videogames.filter((game)=> game.id !== action.payload);
                return {
                    ...state,
                    actualPage: 1,
                    videogames : filterVideogames,
                }
            }

            case  "GET_VIDEOGAME_FOR_GENRE" : {
                return {
                    ...state ,
                    actualPage: 1 ,
                    videogames: action.payload
                }
            }

            case "GET_ALL_PLATFORMS" : {
                return {
                    ...state,
                    platforms : action.payload
                }
            }

            case  "GET_VIDEOGAME_FORM_PLATFOMR" : {
                    return {
                        ...state,
                        actualPage:1, 
                        videogames: action.payload
                    }

            }

            case  "ORDER_ASCENDENT" : {
                return {
                    ...state,
                    videogames: state.videogames.slice().sort(orderAlpha)
                    }
            }

            case  "ORDER_DESCENDENT" : {
                return {
                    ...state,
                    videogames: state.videogames.slice().sort(orderAlpha).reverse()
                    }
            }

            case "ORDER_RATING_MIN" : {
                return {
                    ...state,
                    actualPage : 1 ,
                    videogames : state.videogames.slice().sort(ratingMin)
                }
            }

            case "ORDER_RATING_MAX" : {
                return {
                    ...state,
                    actualPage : 1 ,
                    videogames : state.videogames.slice().sort(ratingMax)
                }
            }

            default : 
                return {
                    ...state
                }
            
        }
}