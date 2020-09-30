const axios = require('axios')

const url: string = 'your-url.example';

function getPokemons() {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
        console.log(response)
    } catch (exception) {
        process.stderr.write(`ERROR received from ${url}: ${exception}\n`)
    }
}

module.exports = { getPokemons }