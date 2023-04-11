import React    from 'react';
import { useState , useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';
import styles from "./FormVideogame.module.css";
import { createVideogame , getGenres , getPlatforms} from "./../../Redux/actions";
import Swal from 'sweetalert2';

    const FormVideogame = () => {
         const allGenres= useSelector(state=>state.genres);   
         const allPlatforms = useSelector(state=>state.platforms);
         console.log("todos los generes son " , allGenres);
         console.log("todas las plataformas son ", allPlatforms);
         const [error , setError] = useState({});
         const [selectedOptions, setSelectedOptions] = useState([]);
         const [selectedPlatforms, setSelectedPlatforms] = useState([]);
        const dispatch = useDispatch();
         const [dataForm , setDataForm] = useState({
                name: "",
                description: "",
                released : "",
                rating : 0,
                fecha: "",
                genero : "",
                plataforma : ""
              
         });

      

          const setDataHandler = (e)=>{
           e.preventDefault();
                setDataForm({
                    ...dataForm,
                    [e.target.name]: e.target.value,
                });

                setError({
                    ...error,
                    [e.target.name] : ""
                })
             }

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
                  
          const handleFecha= (e)=>{
              e.preventDefault();
                    
            const fecha1 = document.getElementById("fecha").value;
            const fecha2= new Date(fecha1);
            const fecha3 = fecha2.toISOString().split('T')[0];
                setDataForm({
                  ...dataForm,
                   released : fecha3
                 });
                 setError({
                  ...error,
                  [e.target.name] : ""
              })
          }   
                

          const submitForm = (e)=>{
            e.preventDefault();
            let estadoForm = false;
            if(dataForm.name.length === 0){
              setError({
                ...error,
                name: "Campo requerido"
              })
              estadoForm= false
            } else if(dataForm.description.length === 0){
              setError({
                ...error,
               description: "Campo requerido d"
              })
            }
            
            else if(dataForm.released.length === 0 ){
              setError({
                ...error,
                released: "Campo requerido"
              })
              estadoForm= false
            } else if ((dataForm.rating.length === 0) || (dataForm.rating > 5 )){
              setError({
                ...error,
                rating: "Campo requerido y debe ser manor a 5"
              })
              estadoForm = false
            } else if(dataForm.genero.length === 0){
              setError({
                ...error,
                genero: "Debe seleccionar almemos opcion"
              })
              estadoForm = false
            } else if (dataForm.plataforma.length === 0){
              setError({
                ...error,
                plataforma: "Debe seleccionar almemos opcion"
              })
              estadoForm = false
            } 
            
            else {
              estadoForm = true
            }

            
            
             if(estadoForm){
              console.log("Los genros desde el FORMULARION SON" , dataForm.genero);
              dispatch(createVideogame(dataForm));
              setDataForm({
                name: "",
                description: "",
                released : "",
                rating :  "",
                genero : "",
               
                plataforma : "",
                
              });
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
             
          <form action="" onSubmit={(e) => submitForm(e)}  className={styles.form} >
                 <div className={styles.containerImagen}> 
                   <h2> Formulario  </h2>
                 </div>
            <div className={styles.containerForm}>
                <div className={styles.divInput1}>
                  <input  onChange={setDataHandler} placeholder="Name"  name="name" value={dataForm.name} className={styles.inputForm} type="text" />
                  {error.name &&  (<p className={styles.error}>{error.name}</p>)}
                
                </div>
                   
                <div className={styles.divInput1}>
                 
                  <textarea onChange={setDataHandler}  placeholder="descripcion"  name="description" value={dataForm.description} className={styles.inputForm}></textarea>
                  {error.description &&  (<p className={styles.error}>{error.description}</p>)}
                </div>
                 
                  <div className={styles.divInput1}>
                    <input     onChange={handleFecha}  placeholder="Released" name="released"  id="fecha" value={dataForm.released} className={styles.inputForm} type="date" /> 
                    {error.released && (<p  className={styles.error} >{error.released}</p>)}
                  </div>
                 
                 <div className={styles.divInput1}>
                    <input    type="number" onChange={setDataHandler} step="0.01" placeholder="Rating" name="rating"   value={dataForm.rating} className={styles.inputForm} />
                   {error.rating && (<p  className={styles.error} >{error.rating}</p>)}
                 </div>

                


                  
                   <label> Generos</label>
                 
                   <select id="my-select1"  onChange={handleSelectChange1} value = {dataForm.genero} className={styles.select} >
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
                      <div className={styles.temperaments} key={option.name}  name="genero" value = {dataForm.genero} >
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
                   

                    <label> Plataformas</label>
                      
                   <select id="my-select2"  onChange={handleSelectChange2} value = {dataForm.plataforma} className={styles.select} >
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
                      <div className={styles.temperaments} key={option.name}  name="plataforma" value = {dataForm.plataforma} >
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
                   
                     
             <button onClick={handleSaveClick} className={styles.botonF}>Enviar</button>
                      
                 </div>
          </form>
            
           </div>
        );
    }

export default FormVideogame;
