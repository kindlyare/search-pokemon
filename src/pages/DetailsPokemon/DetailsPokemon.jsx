import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import _ from 'lodash'
import { BsStars } from "react-icons/bs"
import { AiOutlineClose } from 'react-icons/ai'

import { searchPokemon } from '../../core/services/api'
import typeColors from '../../core/services/types-pokemon'
import pokeTypeMapper from '../../core/services/weakness-and-strong-pokemons'
import './DetailsPokemon.scss'

export default function DetailsPokemon() {

  const navigate = useNavigate();

  const callback = () => {
    navigate('/')
  }

  const { pokemonName } = useParams();
  const [ pokemon, setPokemon ] = useState([]);
  const [ currentSprite, setCurrentSprite] = useState('front_default');
  const [ shake, setShake ] = useState(0);

  const [ loading, setLoading ] = useState(true);

  const shinyHandler = () => {
    setShake(1)
    setCurrentSprite(currentSprite === "front_default" ? "front_shiny" : "front_default") 
  }

  const pokemonImgFront = pokemon?.sprites?.[currentSprite]

  const pokemonImgFrontLoading =
  loading
  ? 'Pokemon...'
  : <img src={pokemonImgFront} alt="imagem do pokemon" />

  const getWeaknessAndResistance = (types) => {
    const mergedElements = types.reduce((previous, current) => {
      if (previous?.weakness?.length) {
        previous.weakness = previous.weakness.concat(current.weakness) 
      } else {
        previous.weakness = []
      }
      if (previous?.resistance?.length) {
        previous.resistance = previous.resistance.concat(current.resistance)
      } else {
        previous.resistance = []
      }
      if (previous?.immune?.length) {
        previous.immune = previous.immune.concat(current.immune)
      } else {
        previous.immune = []
      }
      return previous
    })

    return {
      weakness:_.uniq(_.difference(mergedElements.weakness, mergedElements.resistance)),
      resistance:_.uniq(_.difference(mergedElements.resistance, mergedElements.weakness)),
      immune: mergedElements.immune
    }
  }

 useEffect( async () => {
  const data = await searchPokemon(pokemonName);
  data.types = data.types.map(item => ({
    name: item.type.name,
    color: typeColors[item.type.name],
    weakness: pokeTypeMapper[item.type.name].weakness,
    resistance: pokeTypeMapper[item.type.name].resistance,
    immune: pokeTypeMapper[item.type.name].immune,
  }))

  data.stats = data.stats.map(stat => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }))

  const { weakness, resistance, immune } = getWeaknessAndResistance(data.types)
  data.weakness = weakness
  data.resistance = resistance
  data.immune = immune
  setPokemon(data)
  setLoading(false)
 }, [])

 const statsPokemon =
 pokemon?.stats?.map((stat, index) => 
  <p key={index}>{stat.name}: {stat.value}</p>
 )

 const typePokemon =
  pokemon?.types?.map((type, index) => (
   <p key={index} style={{ backgroundColor: type.color }}>{_.capitalize(type.name)}</p>
  ))

 const weaknessTypesPokemon =
  pokemon?.weakness?.map((type, index) => (
    <p key={index} style={{ backgroundColor: typeColors[type] }}>{_.capitalize(type)}</p>
  ));

 const resistanceTypesPokemon =
  pokemon?.resistance?.map((type, index) => (
    <p key={index} style={{ backgroundColor: typeColors[type] }}>{_.capitalize(type)}</p>
  ))

  const immuneTypesPokemon =
    pokemon?.immune?.map((type, index) => (
    <p key={index} style={{ backgroundColor: typeColors[type] }}>{_.capitalize(type)}</p>
  )) 

  return(
    <div className="details__container">
      <div className="details__card">
        <div className="details__top">
          <div>
            <BsStars
              className="toShiny"
              onClick={shinyHandler}
              shake={shake}
              onAnimationEnd={() => setShake(0)}
            />
          </div>
          <div>
            <AiOutlineClose
              className="details__close"
              onClick={callback}
            />
          </div>
        </div>
        <h1>{pokemon.name}</h1>
        <div className="pokemon__sprite">
          {pokemonImgFrontLoading}
        </div>
        <div className="pokemon__types">
          {typePokemon}
        </div>
          <div className="divider"/>
        <div className="pokemon__types-weak-resistance-immune">
          <div className="types__weakness">
          {resistanceTypesPokemon?.length > 0 && 'Resistance:'}
          {resistanceTypesPokemon}
          </div>
          <div className="types__resistance">
          {weaknessTypesPokemon?.length > 0 && 'Weakness:'}
          {weaknessTypesPokemon}
          </div>
          <div className="types__immune">
          {immuneTypesPokemon?.length > 0 && 'Immune:'}
          {immuneTypesPokemon}
          </div>
        </div>
          <div className="divider" />
        <div className="pokemon__stats">
          {statsPokemon}
        </div>
      </div>
    </div>
  )
}