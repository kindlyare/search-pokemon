export const searchPokemon = async (pokemon) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const res = await fetch(url);
    const data = await res.json()
    return data;
}

export const getPokemons = async (limit=1900, offset=0) => {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    const res = await fetch(url);
    const data = await res.json()
    return data;
}

export const getPokemonsData = async (url) => {
    const res = await fetch(url);
    const data = await res.json()
    return data;
}