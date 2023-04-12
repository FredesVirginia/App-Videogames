import React from 'react';
import "./App.css";
import { BrowserRouter, Route} from 'react-router-dom';
import LadingPage from "./Componets/LadingPage/LadingPage"
import Home from "./Componets/Home/Home";
import FormVideogame from "./Componets/FormVideogame/FormVideogame";
import VideogameId from './Componets/VideogameId/VideogameId';
import UpdateVideogame from './Componets/UpdateVideogame/UpdateVideogame';
import axios from "axios";
axios.defaults.baseURL = "app-videogames-production.up.railway.app" ;


const App = () => {
  return (
    <div className='containerApp'>
      <BrowserRouter>
      <Route exact path='/' component={LadingPage}/>
      <Route exact path='/videogames' component={Home}/>
      <Route exact path='/videogames/game/:id' component={VideogameId}/>
      <Route exact path='/videogames/:id' component={UpdateVideogame}/>
      <Route exact path='/createVideogame' component={FormVideogame}/>
   
      </BrowserRouter>
    </div>
  );
}

export default App;
