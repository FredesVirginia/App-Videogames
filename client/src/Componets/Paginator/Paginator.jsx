import React , {useEffect} from 'react'
import styles from "./Paginator.module.css";
import { useDispatch , useSelector } from "react-redux";
import { changePage } from '../../Redux/actions';

export default function Paginator({videogamesLength}) {
  const pagina = useSelector(state => state.actualPage);
  const dispatch = useDispatch();
  const paginas = [];
  
  for(let i = 1; i<=Math.ceil((videogamesLength+1)/15);i++){
                 paginas.push(i);
  }   

  const paginaAnterior = () => {
       if(pagina !== 1){
            dispatch(changePage(pagina-1));
       }
       window.scroll({top: 0, behavior: 'smooth'});
  }

  const primerPagina = () => {
       if(pagina !== 1){
            dispatch(changePage(1));
       }
       window.scroll({top: 0, behavior: 'smooth'});
  }

  const paginaSiguiente = () => {
       if(pagina !== paginas.length){
            dispatch(changePage(pagina+1));
       }
       window.scroll({top: 0, behavior: 'smooth'});
  }

  const ultimaPagina = () => {
       if(pagina !== paginas.length){
            dispatch(changePage(paginas.length));
       }
       window.scroll({top: 0, behavior: 'smooth'});
  }


  return(
       <div className={styles.divPaginator}>
            <button className={styles.botonP} onClick={primerPagina} >   «  </button>
            <button className={styles.botonP} onClick={paginaAnterior} > ◀ </button>
            {    // Crea un boton por cada pagina                    
                 paginas.map(pagina => (
                      <button key={pagina} 
                      className={styles.botonP}
                       value={pagina} 
                       onClick={() => {window.scroll({top: 0, behavior: 'smooth'}); dispatch(changePage(pagina))}}>
                           {pagina}
                      </button>
                 ))
            }
            <button className={styles.botonP} onClick={paginaSiguiente}  > ▶ </button>
            <button className={styles.botonP} onClick={ultimaPagina}     > »  </button>
       </div>
  )
   
}
