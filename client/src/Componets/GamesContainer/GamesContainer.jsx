import React from 'react'
import  {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllVideogames } from "../../Redux/actions";
import Game from "../Game/Game"
import styles from  "./GamesContainer.module.css";
import Paginator from '../Paginator/Paginator';
export default function GamesContainer() {
  const allVideogames = useSelector(state =>state.videogames);
  const actualPage = useSelector(state=>state.actualPage);
  const dispatch = useDispatch();
    console.log("Cantidad de Dogs = " , allVideogames.length);
   
    useEffect(() => {
        dispatch(getAllVideogames());
     }, []);

  return (
   <div>
   <div className = {styles.containerGames}>  
    
   {allVideogames.length > 0 ? allVideogames.map((game, index) =>{
// Se crea un CardCountry por cada country en el state. Si es la pagina 1, solo muestra 9 countries
if(actualPage === 1 & index <15){
  return ( 
   <Game
                key={game.id}
                id= {game.id}
                name={game.name}
                image= {game.image}
                description = {game.description}
                genres={ game.genres}
                platforms={game.platforms}
                rating= {game.rating}
                released= {game.released}
             />
            )
            }
else if(actualPage !== 1 && index >= ((actualPage-1)*15)-1 && (index < (actualPage*15)-1)){
  // Se crea un CardCountry por cada country en el state. Si no es la pagina 1, muestra 10 countries
  return ( <Game
                key={game.id}
                id= {game.id}
                name={game.name}
                image= {game.image}
                description = {game.description}
                genres={ game.genres}
                platforms={game.platforms}
                rating= {game.rating}
                released= {game.released}
             />)}}): 
  <div >
    <p>No hay Gmaes. Intenta otra busqueda.</p>
  </div>}
   </div> 
   
  <div>
     <Paginator videogamesLength={allVideogames.length}/>
  </div>
  
 </div>
  );
}
