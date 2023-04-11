const { Router } = require('express');
const platformsRouter = require("./platforms");
const videogamesRouter = require('./videogames');
const genresRouter = require("./genres");

const router = Router();

router.use('/videogames', videogamesRouter);
router.use("/genres" , genresRouter);
router.use("/platforms" , platformsRouter);

  
module.exports = router;