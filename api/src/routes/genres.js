const { Router } = require("express");
const {Sequelize } = require ("sequelize");
const { getGenres } =  require("../utils/getApi");
const { Genres} = require("../db");

const router = Router();

router.get("/" , async (req, res)=>{
    try{
        const allGenres = await getGenres();
        console.log("Los datos de generos son " , allGenres)
        allGenres.forEach((game) =>{
            Genres.findOrCreate({
                where : {
                    name: game
                }
            })
        });

        const response = await Genres.findAll();
       
        res.status(200).json(response);

    }catch(error){
        res.status(404).json(error);
    }
});

module.exports= router;