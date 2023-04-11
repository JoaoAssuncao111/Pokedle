import React, { useState, useEffect, useRef } from "react";
import "../GuessBar.css";
import { compareGuess, getPokemonDetails } from '../utils'

const GuessBar = ({ mysteryPokemon }) => { // updated the function parameter to correctly destructure currentPokemon from props
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [comparisonResult, setComparisonResult] = useState([])
  const [error, setError] = useState("")


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  async function fetchAndCompare() {
    const mysteryPokemonInfo = []
    const mysteryPokemonDetails = getPokemonDetails(mysteryPokemon.name)
    mysteryPokemonInfo.push(mysteryPokemon.weight, mysteryPokemon.height, mysteryPokemon.types.map(({ type }) => type.name));
      (await mysteryPokemonDetails).forEach((detail) => { mysteryPokemonInfo.push(detail) })

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
    const guessedPokemon = await response.json()
    //if a valid pokemon was searched
    if (guessedPokemon) {
      const pokemonInfo = []
      const pokemonDetails = getPokemonDetails(guessedPokemon.name)
      pokemonInfo.push(guessedPokemon.weight, guessedPokemon.height, guessedPokemon.types.map(({ type }) => type.name));
      (await pokemonDetails).forEach((detail) => { pokemonInfo.push(detail) })

      const result = compareGuess(mysteryPokemonInfo, pokemonInfo)
      setComparisonResult(result)
      console.log(result)
    }
    else {
      setError("Pokemon doesn't exist")
    }
  }


  return (
    <div>
      <div className="pokemon-search">
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        <button onClick={fetchAndCompare}>Submit</button>
      </div>

      <div>
        <ul>
          {comparisonResult.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GuessBar;
