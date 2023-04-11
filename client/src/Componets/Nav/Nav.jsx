import React  , {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getNameVideogames , getAllVideogames , getGenres, getPlatforms , getVideogameForGenres
        , getVideogameForPlatform , ordeAscendent ,
         ordeDescendent , orderRatingMin , orderRatingMax , getAllVideogamesAPI , getAllVideogamesBBDD} from '../../Redux/actions';
import styles from "./Nav.module.css";
import {Link} from "react-router-dom";

const Nav = () => {

  const [nameVideogame , setNameVideogame] = useState(" ");
  const [genero , setGenero] = useState(" ");
  const [platform , setPlatform] = useState(" ");
  const [order, setOrder] = useState(" ");
  const allGenres = useSelector(state =>state.genres);
  const allPlatforms = useSelector(state=>state. platforms);
  console.log("Las plataforma son ", allPlatforms.length);
  console.log("Los genros desde el front son " , allGenres.length);
  const dispatch= useDispatch();
     const [name , setName] = useState("");
        useEffect(() => {
          if(genero!== " "){
                dispatch(getVideogameForGenres(genero))
          }
          if (genero === " "){
            dispatch(getAllVideogames);
            dispatch(getGenres());
          } 
          if (genero ==="inicio"){
            dispatch(getAllVideogames());
            dispatch(getGenres());
          }
          
        
        }, [dispatch, genero ]);

       useEffect(() => {
         if(platform !== ""){
            dispatch(getVideogameForPlatform(platform))
         }

         if(platform===" "){
           dispatch(getPlatforms());
           dispatch(getAllVideogames());
         }

         if(platform === "inicio"){
          dispatch(getPlatforms());
          dispatch(getAllVideogames());
         }
       }, [dispatch , platform]);


       useEffect(() => {
          if(order ==="asc"){
              dispatch(ordeAscendent())
          }
          if(order==="desc"){
            dispatch(ordeDescendent())
          }

          if(order === " "){
            dispatch(getAllVideogames())
          }

          if(order === "inicio"){
            dispatch(getAllVideogames())
          }

          if(order ===  "ratingMin"){
              dispatch(orderRatingMin())
          }

          if(order ===  "ratingMax"){
              dispatch(orderRatingMax())
          }

          if(order === "gameApi"){
            dispatch(getAllVideogamesAPI())
          }

          if(order === "gameBBDD"){
            dispatch(getAllVideogamesBBDD());
          }
       }, [dispatch , order]);


      

      function handleChange(e){
        
        e.preventDefault();
          setName(e.target.value);
          dispatch(getNameVideogames(e.target.value));
          setName ("");
      }

    return (
        <div className={styles.divSearch}>
        
            <div className={styles.divTemperaments}>
            <label> Filtrar por </label>
            <div className={styles.select} >
                <label>Plataforma</label>
                  <select className={styles.divTemperamentsSelect}  onChange={(e) => setPlatform(e.target.value) }>
                    
                    <option className={styles.divTemperamentsSelectOption} value="inicio">--Seleccione--</option>
                    {allPlatforms.length > 0 ? allPlatforms.map((t) => {
                            return <option  className={styles.divTemperamentsSelectOption} key ={t.id}value={t.name}> {t.name} </option>
                            })
                            : 
                    <option>---</option>
                    }
                  </select>

                
                <label className={styles.labelOrigen}>Genero</label>
                  <select className={styles.divTemperamentsSelect2}  onChange={(e) => setGenero(e.target.value) }>
                    
                    <option className={styles.divTemperamentsSelectOption} value="inicio">--Seleccione--</option>
                    {allGenres.length > 0 ? allGenres.map((t) => {
                            return <option  className={styles.divTemperamentsSelectOption} key ={t.id}value={t.name}> {t.name} </option>
                            })
                            : 
                    <option>---</option>
                    }
                  </select>
            </div>
            
            </div>
            
            <div className={styles.divBreed}>
            
            <Link to="/" className={styles.formLink} > The Game Zone </Link>
            <input className={styles.buscar}  type="text" onChange={ handleChange}  placeholder="Look For Game 🐶" /> 
            
            </div>

            <div className={styles.divCreate}>
            <Link  className={styles.breed}  to="/createVideogame"> Create Videogames </Link>
            <label> Ordenar por </label>
            <select  className={styles.order} onChange={ (e) => setOrder(e.target.value) } >
              <option value="inicio">--Seleccione--</option>
              <option value = "asc"  >A-Z</option>
              <option value = "dess" >Z-A</option>
              <option value = "gameApi" >Videogames Api</option>
              <option value = "gameBBDD" >Videogames BBDD</option>
              <option value = "ratingMin">  Rating Min</option>
              <option value = "ratingMax">  Rating Max</option>
             
            </select>
            </div>
          
         </div>
    );
}

export default Nav;
