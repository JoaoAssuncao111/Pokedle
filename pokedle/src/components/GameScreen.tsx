import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { randomPokemonGenerator,getPokemonDetails, compareGuess} from '../utils';
import { Pokemon } from '../Pokemon';
import GuessBar from './GuessBar';
import { PokemonList } from './PokemonList';

export function GameScreen() {
  const { gameMode } = useParams();
  const [guesses, setGuesses] = useState([]);
  const [mysteryPokemon, setMysteryPokemon] = useState(null);
  const [mysteryPokemonInfo, setMysteryPokemonInfo] = useState([])
  const [pictureUrl, setPictureUrl] = useState(null);
  const [comparisonResult, setComparisonResult] = useState([]);

  useEffect(() => {
    async function setMysteryDetails() {
      try {
        const mysteryPokemonDetails = await getPokemonDetails(mysteryPokemon.name);
  
        const newMysteryPokemonInfo = [
          mysteryPokemon.weight,
          mysteryPokemon.height,
          mysteryPokemon.types.map(({ type }) => type.name),
          ...mysteryPokemonDetails,
        ];
  
        setMysteryPokemonInfo(newMysteryPokemonInfo);
        console.log(newMysteryPokemonInfo);
      } catch (error) {
        console.error("Error fetching mystery Pokemon details:", error);
      }
    }
  
    setMysteryDetails();
  }, [mysteryPokemon]);
  

  

  async  function handleGenerateButtonClick() {
    fetchPokemon(gameMode);
    
    setComparisonResult([]);
  }

  async function fetchPokemon(gen) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonGenerator(gen)}`);
      const pokemon = await response.json();
      if (pokemon) {
        setMysteryPokemon(pokemon);
        setPictureUrl(pokemon.sprites.front_default);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleComparisonResult(result) {
    setComparisonResult(result);
  }

  return (
    <div>
      <div>
        {mysteryPokemon ? (
          <>
            <div>{mysteryPokemon.forms[0].name}</div>
            <img src={pictureUrl} alt={mysteryPokemon.forms[0].name} />
          </>
        ) : null}
      </div>

      <div>
        <button onClick={handleGenerateButtonClick}>GENERATE!</button>
      </div>
      <PokemonList
        mysteryPokemonInfo={mysteryPokemonInfo}
        generation={gameMode}
        onComparisonResult={handleComparisonResult}
      />

      {comparisonResult.length > 0 && (
        <div>
          <h2>Comparison Result:</h2>
          <ul>
            {comparisonResult.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
