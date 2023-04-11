import React from 'react';
import {Link} from 'react-router-dom';
import styles from "./Game.module.css";
import {useDispatch} from 'react-redux';
import { deleteVideogame } from '../../Redux/actions';

    export default function  Game  (props)  {
        const  { id, name , image, genres , rating,  platforms , released} = props;
        const dispatch = useDispatch();
        const handleDelete= ()=>{
            dispatch(deleteVideogame(id));
        }
          return (
              <div className={styles.containerGames}>
              <div className={styles.cerrar}> <button className={styles.button} onClick={handleDelete}> ✖️</button> </div>
                
                <img alt="Hola" className={styles.imgGame} src={image}/> 
                <h3 className={styles.name}> {name} </h3> 
                <h4 className={styles.containerH3Game}> Rating :{rating}</h4>
                
                  <div className={styles.containerGen}>
                    <h4> Generos : {genres}</h4>
                  </div>
                  <div className={styles.cajaLink}>
                  <Link to={`/videogames/game/${id}`}  className={styles.linkR} >Ver Mas</Link>  
                  <Link to={`/videogames/${id}`}  className={styles.linkR} >Actualizar</Link>  
                  </div>
              </div>
          );
}


