const express = require("express")
const router = express.Router()

const poke = require("./pokeRouter")
const user = require("./userRouter")

router.use('/pokedex', poke)
router.use('/users', user)

module.exports = router;
