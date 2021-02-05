const express = require("express")
const router = express.Router()
const auth = require('../middlewares/auth')

const poke = require("./pokedexRouter")
const user = require("./userRouter")

router.use('/users', user)
router.use(auth)
router.use('/pokedex', poke)

module.exports = router;
