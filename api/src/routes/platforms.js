const {Router} = require( "express");
const {Platforms } = require ("../db");

const {Sequelize } = require ("sequelize");
const { getPlatforms } = require ("../utils/getApi");

const router = Router();

router.get("/" , async ( req, res)=>{
    try{
        const allPlatforms = await getPlatforms();
       
        allPlatforms.forEach((game) =>{
            Platforms.findOrCreate({
                where : {
                    name: game
                }
            })
        });
        const respuesta = await Platforms.findAll();
      
        res.status(200).json(respuesta);
    }catch(error){
        res.status(404).json(error);  

    }

});

module.exports = router;