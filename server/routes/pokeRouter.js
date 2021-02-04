const express = require("express")
const router = express.Router()
const PokedexController = require("../controller/pokedexcontroller")

router.get('/card', PokedexController.readCard)
router.get('/pokemon', PokedexController.readPokemon)
router.get('/currency', PokedexController.readCurrency)

module.exports = router;
