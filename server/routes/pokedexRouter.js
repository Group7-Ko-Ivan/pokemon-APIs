const express = require("express")
const router = express.Router()
const PokedexController = require("../controllers/pokedexcontroller")

router.get("/tcg", PokedexController.readCard)
router.get("/currency", PokedexController.readCurrency)
router.get("/pokemon", PokedexController.readPokemon)

module.exports = router