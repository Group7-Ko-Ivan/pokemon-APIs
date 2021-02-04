const express = require("express")
const router = express.Router()

const user = require("./pokeRouter")
const poke = require("./userRouter")

router.use('/pokedex', poke)
router.use('/', user)

module.exports = router;
