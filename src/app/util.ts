import  axios from 'axios';
const url: string = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

export async function getPokemons() {
    try {
        const response = await axios.get(url)
        let data = response.data
        let nextPage = data.next
        let results = data.results
        while(nextPage && nextPage.length > 0) {
          const nextResponse = await axios.get(nextPage)
          data = nextResponse.data
          nextPage = data.next 
          results =   results.concat(data.results)
        }
        return results
    } catch (exception) {
        console.log(`ERROR received from ${url}: ${exception}\n`)
    }
}
	