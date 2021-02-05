const axios = require("axios").default

class PokedexController {
    static readCard(req, res, next) {
        axios.get("https://api.pokemontcg.io/v2/cards")
        .then(response => {
            let output = []
            for (let i = 0; i < response.data.data.length; i++) {
                output.push(response.data.data[i].images.small)
            }
            res.status(200).json({output})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static async readPokemon(req, res, next) {
       try {
       let response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0")
       
            let pokemonData = response.data.results
            let output = []

            for (let i = 0; i < pokemonData.length; i++) {
                let pokemonImage = await axios.get(pokemonData[i].url)
                console.log(pokemonImage.data.sprites.front_default)
                let tempObj = {
                    name : pokemonData[i].name,
                    image : pokemonImage.data.sprites.front_default
                }
                output.push(tempObj)
             }
        
        res.status(200).json({output})
       } catch (err) {
            res.status(500).json(err)
       }
        
    }

    static readCurrency(req, res, next) {
        let rupiah
        let dollar
        axios.get("http://data.fixer.io/api/latest?access_key=1e516c8c4cbbaca64b2b979cd5fa7da6")
        .then(response => {
            rupiah = response.data.rates.IDR
            dollar = response.data.rates.USD
            return axios.get("https://api.pokemontcg.io/v2/cards")
        })
        .then(response => {
            let output = []
            let dataPokemon = response.data.data

            output = dataPokemon.map(el => {

                let prices = el.tcgplayer.prices.holofoil ? el.tcgplayer.prices.holofoil : el.tcgplayer.prices.normal ?  el.tcgplayer.prices.normal : el.tcgplayer.prices.reverseHolofoil ? el.tcgplayer.prices.reverseHolofoil : el.tcgplayer.prices["1stEditionHolofoil"] ? el.tcgplayer.prices["1stEditionHolofoil"] : 0 
                return ({
                    name: el.name,
                    image:el.images.small,
                    price: Math.round((prices.mid / dollar) * rupiah)
                })
            })
            
            res.status(200).json(output)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}

module.exports = PokedexController