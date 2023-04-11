import React from 'react';
import styles  from "./LadingPage.module.css";
import { Link } from "react-router-dom";
const LadingPage = () => {
    return (
<div className= {styles.containerLadding}>
                <div className={styles.h1Ladding}>
                    <h1> The Game Zone</h1>
                </div>
                <div  className={styles.pLadding}>
                     <p className={styles.p}>
                    Encuentra mas 300 videojuegos en nuestra Web!
                     </p>
                </div>
           
            <Link to="/videogames"> <button className={styles.btnLadding}>Vamoos</button> </Link>
        </div>
    );
}

export default LadingPage;
