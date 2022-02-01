import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsStars } from 'react-icons/bs'

import './Card.scss'

export const PokemonsCard = (props) => {

  const { pokemon } = props;

  const [ loading, setLoading ] = useState(true);

  const [ currentSprite, setCurrentSprite ] = useState('front_default');
  const [ poke, setPoke ] = useState();
  const [ shake, setShake ] = useState(0);


  const shinyHandler = () => {
    setShake(1);
    setCurrentSprite(currentSprite === "front_default" ? "front_shiny" : "front_default") 
  }

  const pokemonSprite = poke?.sprites[currentSprite]

  useEffect(() => {
    setPoke(pokemon)
    setLoading(false)
  }, [pokemon])

  const navigate = useNavigate();

  function handlePagePokemon (pokemonName) {
    navigate(`details/${pokemonName}`)
  }

  const pokemonDetails = poke?.types.map((type, index) => {
    return <div
    key={index}
    style={{ backgroundColor: type.color }}
    className="pokemon__types">{type.name}
    </div>
  })


  return(
    <div className="container">
      <div className="card">
        <div className="card__top">
          <BsStars 
          onAnimationEnd={() => setShake(0)}
          shake={shake}
          onClick={shinyHandler}/>
          #{poke?.id}
        </div>
        {
        loading
        ? 'Pokemon...'
        : <div className="pokemon" onClick={() => handlePagePokemon(pokemon.name)}>
            <div className="pokemon__img">
              <img src={pokemonSprite} alt={poke?.name} />
            </div>
            {poke?.name}
            <div className="pokemon__details">
              {pokemonDetails}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
