import  axios from 'axios';
const url: string = 'your-url.example';

export async function getPokemons() {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
        console.log(response)
    } catch (exception) {
        console.log(`ERROR received from ${url}: ${exception}\n`)
    }
}
