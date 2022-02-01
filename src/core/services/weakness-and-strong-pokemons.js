const pokeTypeMapper = {
  grass: {
    name: "grass",
    weakness: ['flying', 'poison', 'bug', 'fire', 'ice'],
    resistance: ['grass', 'water', 'electric', 'ground'],
    immune: []
  },
  fire: {
    name: "fire",
    weakness: ['ground', 'rock', 'water'],
    resistance: ['bug', 'steel', 'fire', 'ice', 'grass', 'fairy'],
    immune: []
  },
  bug: { 
    name: "bug",
    weakness: ['flying', 'rock', 'fire'],
    resistance: ['fighting', 'ground', 'grass'],
    immune: []
  },
  dragon: { 
    name: "dragon",
    weakness: ['ice', 'dragon', 'fairy'],
    resistance: ['fire', 'water', 'grass', 'electric'],
    immune: []
  },
  fairy: { 
    name: "fairy",
    weakness: ['poison', 'steel'],
    resistance: ['fighting', 'bug', 'dark'],
    immune: ['dragon']
  },
  ghost: { 
    name: "ghost",
    weakness: ['ghost', 'dark'],
    resistance: ['poison', 'bug'],
    immune: ['normal', 'fighting']
  },
  ground: { 
    name: "ground",
    weakness: ['water', 'grass', 'ice'],
    resistance: ['poison', 'rock'],
    immune: ['electric']
  },
  normal: { 
    name: "normal",
    weakness: ['fighting'],
    resistance: [],
    immune: ['ghost']
  },
  psychic: { 
    name: "psychic",
    weakness: ['bug', 'ghost', 'dark'],
    resistance: ['fighting', 'psychic'],
    immune: []
  },
  steel: { 
    name: "steel",
    weakness: ['fighting', 'steel', 'ground', 'fire'],
    resistance: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
    immune: ['poison']
  },
  dark: { 
    name: "dark",
    weakness: ['fighting', 'bug', 'fairy'],
    resistance: ['ghost', 'dark'],
    immune: ['psychic']
  },
  electric: { 
    name: "electric",
    weakness: ['ground'],
    resistance: ['flying', 'steel', 'electric'],
    immune: []
  },
  fighting: { 
    name: "fighting",
    weakness: ['flying', 'psychic', 'fairy'],
    resistance: ['rock', 'bug', 'dark'],
    immune: []
  },
  flying: { 
    name: "flying",
    weakness: ['rock', 'electric', 'ice'],
    resistance: ['fighting', 'bug', 'grass'],
    immune: ['ground']
  },
  ice: { 
    name: "ice",
    weakness: ['fighting', 'rock', 'steel', 'fire'],
    resistance: ['ice'],
    immune: []
  },
  poison: { 
    name: "poison",
    weakness: ['ground', 'psychic'],
    resistance: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
    immune: []
  },
  rock: { 
    name: "rock",
    weakness: ['fighting', 'ground', 'steel', 'water', 'grass'],
    resistance: ['normal', 'flying', 'poison', 'fire'],
    immune: []
  },
  water: { 
    name: "water",
    weakness: ['grass', 'electric'],
    resistance: ['steel', 'fire', 'water', 'ice'],
    immune: []
  }
}

export default pokeTypeMapper
