const express = require("express")
const router = express.Router()
const pokedexRouter = require("./pokedexRouter")

router.get("/" ,(req, res) => {
    res.send("haloo")
})

router.use("/pokedex", pokedexRouter)


module.exports = router