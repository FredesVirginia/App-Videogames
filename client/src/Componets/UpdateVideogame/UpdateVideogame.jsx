import React , {useRef}   from 'react';
import { useState , useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  Link , useParams } from 'react-router-dom';
import styles from "./UpdateVideogame.module.css";
import { createVideogame , getGenres , getPlatforms , getVideogameId , updateVideogame} from "./../../Redux/actions";
import Swal from 'sweetalert2';

const UpdateVideogame = ()=>{
    const allGenres= useSelector(state=>state.genres);   
    const allPlatforms = useSelector(state=>state.platforms);
    const detailVideogame = useSelector(state => state.videogameId);
    console.log("EL detailen update compones es ", detailVideogame);
   
    const {id} = useParams();
    console.log("todos los generes son " , allGenres);
    console.log("todas las plataformas son ", allPlatforms);
    const [error , setError] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const dispatch = useDispatch();


     useEffect(() => {
               dispatch(getVideogameId(id))
            }, [dispatch , id]);

    let nameR = useRef();
    let descriptionR = useRef ();
    let releasedR = useRef();
    let ratingR = useRef ();
    let generoR= useRef();
    let plataformaR = useRef();
            let nameD="";
            if(detailVideogame && detailVideogame.name){
                nameD = detailVideogame.name;
                console.log("EL nombre es ", nameD)
            }
            console.log("EL nombre es ", nameD);

            let imageD="";
            if(detailVideogame && detailVideogame.image){
                imageD= detailVideogame.image;
            }

           let descriptionD = "";
           if(detailVideogame && detailVideogame.description){
                descriptionD = detailVideogame.description;
           }
           
           let ratingD = "";
           if(detailVideogame && detailVideogame.rating){
                ratingD = detailVideogame.rating;
           }

           let releasedD= "";
           if(detailVideogame && detailVideogame.released){
                releasedD = detailVideogame.released;
           }
            let array = [];
            if (detailVideogame && detailVideogame.genres) {
              array = detailVideogame.genres.split(", ");
            }


            let array2 = [];
            if(detailVideogame && detailVideogame.platforms){
                array2= detailVideogame.platforms.split(", ");
            }
            let des = "";
            if(detailVideogame && detailVideogame.description){
                des = detailVideogame.description;
            }

            
                const [dataForm , setDataForm] = useState({
                    name: "",
                    description: "",
                    released : "",
                    rating : "",
                    genero : "",
                    plataforma :  "",
                    
                });

           

            const handleSelectChange1 = (event) => {
            const options = Array.from(event.target.selectedOptions).map((option) => option.value);
            options.forEach((option) => {
                if (!selectedOptions.find((o) => o.name === option)) {
                setSelectedOptions([...selectedOptions, { name: option, isChecked: true }]);
                    }
                });

            setError({
                ...error,
                genero: ""
            });
                };

            const handleCheckboxChange1 = (event, option) => {
            const isChecked = event.target.checked;
            setSelectedOptions(
                selectedOptions.map((o) => (o.name === option ? { ...o, isChecked } : o))
                );
                };

            const handleSelectChange2 = (event) => {
                const options = Array.from(event.target.options).map((option) => option.value);
                options.forEach((option) => {
                    if (!selectedPlatforms.find((o) => o.name === option)) {
                    setSelectedPlatforms([...selectedPlatforms, { name: option, isChecked: true }]);
                        }
                    });

                    setError({
                        ...error,
                        plataforma: ""
                    });
                };
            const handleCheckboxChange2 = (event, option) => {
                    const isChecked = event.target.checked;
                    setSelectedPlatforms(
                    selectedPlatforms.map((o) => (o.name === option ? { ...o, isChecked } : o))
                        );
                };

            
            const handleSaveClick = (e) => {
                const selectedGenres = selectedOptions
                .filter((option) => option.isChecked)
                .map((option) => option.name);
                const genresString = selectedGenres.join(", ");

                const selectPlatfoorms = selectedPlatforms
                .filter((option) => option.isChecked)
                .map((option) => option.name);
                const platformString = selectPlatfoorms.join(", ");
            
                setDataForm({
                    ...dataForm,
                    genero: genresString,
                    plataforma : platformString,
                    });

                    setError({
                    ...error,
                    [e.target.name] : ""
                })
                };
                    
           
            
            const submitForm = (e)=>{
                e.preventDefault();
               let estadoForm= true;
               let nameRD =""; let descriptionRD=""; let ratingRD=""; let releasedRD="";
               let generoRD=""; let plataformaRD="";
              if(nameR.current.value.length === 0){
                nameRD = detailVideogame.name
              } else{ nameRD = nameR.current.value}
              if(descriptionR.current.value.length === 0){
                descriptionRD = detailVideogame.description
              } else{ descriptionRD = descriptionR.current.value}
              if(ratingR.current.value.length === 0){
                ratingRD = detailVideogame.rating
              } else{ ratingRD = ratingR.current.value}
              if(releasedR.current.value.length === 0){
                releasedRD = detailVideogame.released
              } else{ releasedRD = new Date(document.getElementById("fecha").value).toISOString().split('T')[0]}
              if(generoR.current.value){
                generoRD= detailVideogame.genres;
              }else{
                const selectedGenres = selectedOptions
                .filter((option) => option.isChecked)
                .map((option) => option.name);
                const genresString = selectedGenres.join(", ");
                generoRD = genresString;
              }
              if(plataformaR.current.value){
                    plataformaRD = detailVideogame.platforms;
              }else{
                const selectPlatfoorms = selectedPlatforms
                .filter((option) => option.isChecked)
                .map((option) => option.name);
                const platformString = selectPlatfoorms.join(", ");
                plataformaRD = platformString;
              }

            const updatedVideogamee = {
                name: nameRD,
                description: descriptionRD,
                rating:ratingRD,
                released: releasedRD,
                genero: generoRD,
                plataforma : plataformaRD
              };

              if(estadoForm){
               
                dispatch(updateVideogame( detailVideogame.id, updatedVideogamee));
               
                    nameR= "";
                    descriptionR="";
                    releasedR = "";
                    ratingR =  "";
                    generoR = "";
                
                    plataformaR = "";
                    
              
                setSelectedOptions([]);
                setSelectedPlatforms([]);
                Swal.fire({
                    title: 'Se creo exitosamente',
                    confirmButtonColor: "#34a57f"}
                ) 
                }else{
                Swal.fire({
                    title: 'Error, datos incorrectos',
                    confirmButtonColor: "#ff5733"}) 
                }
            
            }
          

            useEffect(() => {
                dispatch(getGenres());
            
            }, [dispatch]);

            useEffect(() => {
            
                dispatch(getPlatforms());
            }, [dispatch]);

            return (
                <div>
                <div className={styles.divH}>
            
                <Link to="/videogames" className={styles.formLink} > Volver </Link>
                <h2 className={styles.h2Title}>   The Game Zone</h2>
                </div>
                <div className = {styles.secundario}>
                  <div className={styles.container1}>
                    <div className = {styles.container2}>
                    <h2 className={styles.name}>{detailVideogame.name}</h2>
                    <img alt="Hola" className={styles.imageU}  src={imageD}/>
                    <div className={styles.divD}>
                        <h3>Descripcion</h3>
                        <p>{descriptionD}</p>
                    </div>
                    <div className= {styles.divRR }>
                        <p>  ✪ Rating :  {ratingD}</p>
                        <p>  🔹Released : {releasedD}</p>
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
                    
                    <form action="" onSubmit={submitForm}  className={styles.form} >
                
                 <div className={styles.containerForm}>
                  <h2>Actualizar datos</h2>
                    <div className={styles.divInput1}>
                        <input ref={nameR} placeholder="Name"    name="name"  className={styles.inputForm} type="text" />
                        {error.name &&  (<p className={styles.error}>{error.name}</p>)}
                    </div>
                        
                    <div className={styles.divInput1}>
                    <textarea ref={descriptionR}  placeholder="descripcion"    name="description" className={styles.inputForm}></textarea>
                        {error.description &&  (<p className={styles.error}>{error.description}</p>)}
                    </div>
                        
                    <div className={styles.divInput1}>
                    <input  ref={releasedR}     placeholder="Released"   name="released"  id="fecha"  className={styles.inputForm} type="date" /> 
                    {error.released && (<p  className={styles.error} >{error.released}</p>)}
                    </div>  
                    
                    <div className={styles.divInput1}>
                    <input   ref={ratingR}  type="number"    step="0.01" placeholder="Rating" name="rating"   className={styles.inputForm} />
                    {error.rating && (<p  className={styles.error} >{error.rating}</p>)}
                    </div> 
                    <div className={styles.genero}>
                    <label> Generos</label>
                        <select id="my-select1"  onChange={handleSelectChange1} ref={generoR} className={styles.select} >
                        <option> Selecciona una Opcion</option>
                            {allGenres.length > 0 ? (
                            allGenres.map((t) => {
                        return <option key={t.id} value={t.name}> {t.name}  </option> 
                                })
                            ) : (
                                <option> No hay Temperamentos</option>
                            )}
                        </select>
                        {error.genero && (<p  className={styles.error1} >{error.genero}</p>)}
                            <div className={styles.temperamentscontainer} >
                            
                        {selectedOptions.map((option) => (
                            <div className={styles.temperaments} key={option.name}  name="genero" ref={generoR} >
                            <label  value={selectedOptions}>
                                <input
                                type="checkbox"
                                value={option.name}
                                checked={option.isChecked}
                                onChange={(e) => handleCheckboxChange1(e, option.name)}
                                
                                />
                                {option.name}
                            </label>
                            
                            </div>
                        ))}
                        
                     </div>
                     </div>
                    <div className={styles.genero} >
                        <label> Plataformas</label>
                            
                        <select id="my-select2"  onChange={handleSelectChange2} ref={plataformaR} className={styles.select} >
                                <option> Selecciona una Opcion</option>
                                    {allPlatforms.length > 0 ? (
                                    allPlatforms.map((t) => {
                                return <option key={t.id} value={t.name}> {t.name}  </option> 
                                })
                            ) : (
                                <option> No hay Plataformas</option>
                            )}
                        </select>
                        {error.plataforma && (<p  className={styles.error1} >{error.plataforma}</p>)}   
                            <div className={styles.temperamentscontainer} >
                        {selectedPlatforms.map((option) => (
                            <div className={styles.temperaments} key={option.name}  name="plataforma" ref={plataformaR} >
                            <label  value={selectedPlatforms}>
                                <input
                                type="checkbox"
                                value={option.name}
                                checked={option.isChecked}
                                onChange={(e) => handleCheckboxChange2(e, option.name)}
                                
                                />
                                {option.name}
                            </label>
                            </div>
                        ))}
                        
                            </div>
                    </div>
                            
                    <button onClick={handleSaveClick} className={styles.botonF}>Enviar</button>
                            
                        </div>
                    </form>
                </div>

                 
        
       </div>
    );

}

export default UpdateVideogame;