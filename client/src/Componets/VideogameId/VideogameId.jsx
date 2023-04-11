import React from 'react';
import  {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { getVideogameId } from '../../Redux/actions';
import styles from "./VideogameId.module.css";
const VideogameId = () => {
    const videogameDetail = useSelector(state => state. videogameId);
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(getVideogameId(id))
    }, [dispatch , id]);

    let array = [];
    if (videogameDetail && videogameDetail.genres) {
      array = videogameDetail.genres.split(", ");
    }


    let array2 = [];
    if(videogameDetail && videogameDetail.platforms){
        array2= videogameDetail.platforms.split(", ");
    }
    return (
        <div>
             <div className={styles.divH}>
               <Link to="/videogames" className={styles.formLink} > Volver </Link>
                <h2 className={styles.h2Title}>   The Game Zone</h2>
            </div>
              <div className={styles.principalD}>
                <h1> {videogameDetail.name}</h1>
                    <div className={styles.containerId} >
                    
                        <img alt="Hola" className={styles.imageU}  src={videogameDetail.image}/>
                        <div className={styles.container3aaa}>
                        <h3>Description</h3>
                        <p >{videogameDetail.description}</p>
                        </div>
                        <div className= {styles.divRR }>
                        <p>  ✪ Rating :  {videogameDetail.rating}</p>
                        <p>  🔹Released : {videogameDetail.released}</p>
                    </div>
                   
                    <div className={styles.divGP}>
                        <div className={styles.divG}>
                        <h4>Generons : </h4>
                            {array.map((elem , index)=>{
                             return <p key={index}> 🎮 {elem}</p>
                            })}
                        </div>
                        <div className={styles.divP}>
                        <h4>Plataformas : </h4>
                             {array2.map((elem , index)=>{
                                  return <p key ={index}> 🖥 {elem}</p>
                                 })}
                        </div>
                    </div>
                    </div>
                    
              </div>
             
            
        </div>
    );
}

export default VideogameId;
