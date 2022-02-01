import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import Select from 'react-select'

import './Home.scss'
import typeColors from '../../core/services/types-pokemon'
import { PokemonsCard } from '../../Components/pokemonsCard/Card'
import { getPokemons, getPokemonsData } from '../../core/services/api'
import  pokeTypeMapper  from '../../core/services/weakness-and-strong-pokemons'
import filter from '../../core/services/filter-list' 
import cacheService from '../../core/services/cache.service'


function Home () {
  const [ types, setTypes ] = useState([]);
  const [ pokemonViewState, setPokemonViewState ] = useState([]);

  const [ filterType, setFilterType ] = useState();
  const [ filterName, setFilterName ] = useState();

  const [ loading, setLoading ] = useState(true);

  const fetchPokemons = async () => {
    let results = []
    const cachedData = await cacheService.get('pokemons');
    if (!cachedData) {
      const data = await getPokemons();
      const promises = data.results.map(async pokemon => {
        return await getPokemonsData(pokemon.url);
      })
      results = await Promise.all(promises)
      await cacheService.save('pokemons', results)
    } else {
      results = cachedData
    }
    setLoading(false)
    return results;
  }

  const searchPokemons = (pokemonName) => {
    let filterNamePredicate = null
    if (!pokemonName) {
      filterNamePredicate = () => true
    } else {
      filterNamePredicate = (pokemon) => {
        return pokemon.name
        .toLowerCase()
        .includes(pokemonName.toLowerCase().trim())
      }
    }
    setFilterName(() => filterNamePredicate)
  }

  const filteredTypesHandler = (selectedTypes) => {
    let filterTypePredicate = null
    if (!selectedTypes.length || selectedTypes.includes(null)) {
      filterTypePredicate = () => true
    } else {
      filterTypePredicate = (pokemon) => {
        return _.intersection(
          _.map(selectedTypes, 'value'),
          pokemon.types.map(type => type.name)
          ).length > 0
        }
      }
      setFilterType(() => filterTypePredicate)
  }

  useEffect(async () => {
    const pokemons = await fetchPokemons();
    const allTypes = _.values(pokeTypeMapper)
    .map(type => ({
      label: _.capitalize(type.name),
      value: type.name
    }))

    pokemons.forEach(pokemon => {
      pokemon.types = pokemon.types.map(pokemon => ({
        name: pokemon?.type?.name,
        color: typeColors[pokemon?.type?.name]
      }))
    })

    setTypes(allTypes)
    setPokemonViewState(pokemons)
  }, []);

  const pokemonSearched = e => {
    const pokeName = e.target.value
    searchPokemons(pokeName)
  }

  const pokemonsGeted =
  filter(pokemonViewState, [filterType, filterName])
    .map((pokemon, index) => (
      <PokemonsCard key={index} pokemon={pokemon}/>
    )) 


  return (
    <div className="App">
      <div className="background-page">
        <div className="container-search">
          <h1>Pokemon</h1>
          <input
            type='text'
            className="input-search"
            placeholder="Pesquisar..."
            onInput={pokemonSearched}
          >
          </input>
          <h1>Tipos</h1>
          <Select
            isMulti
            onChange={filteredTypesHandler}
            options={[
              ...types
            ]}
            />
        </div>
        <div className="container-pokedex">
            {loading ? 'Carregando...' :  pokemonsGeted}
        </div>
      </div>
    </div>
  );
}

export default Home;
