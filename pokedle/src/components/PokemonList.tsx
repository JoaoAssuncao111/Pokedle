import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import '../styles.css';
import { getPokemonDetails, compareGuess } from '../utils';

const genDexNumbers = {
  1: 151,
  2: 251,
  3: 386,
  4: 493,
  5: 649,
  6: 721,
  7: 809,
  8: 898, // Updated to the latest generation
};

export function PokemonList({ generation, mysteryPokemon, onComparisonResult }) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function fetchAllPokemon() {
      try {
        const allPokemon = await getAllPokemon();
        const mappedPokemon = allPokemon.map((pokemon) => ({
          value: pokemon.name,
          label: getPokemonLabel(pokemon),
          sprite: pokemon.sprites.front_default,
        }));
        setPokemonList(mappedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    }

    fetchAllPokemon();
  }, []);

  async function getAllPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${genDexNumbers[generation]}`);
    const data = await response.json();

    const pokemonDetailsPromises = data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return await response.json();
    });

    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    return pokemonDetails;
  }

  function getPokemonLabel(pokemon) {
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }

  async function fetchAndCompare(selectedPokemonName) {
    const mysteryPokemonInfo = [];
    const mysteryPokemonDetails = await getPokemonDetails(mysteryPokemon.name);
    mysteryPokemonInfo.push(
      mysteryPokemon.weight,
      mysteryPokemon.height,
      mysteryPokemon.types.map(({ type }) => type.name)
    );
    mysteryPokemonDetails.forEach((detail) => {
      mysteryPokemonInfo.push(detail);
    });

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`);
    const guessedPokemon = await response.json();

    if (guessedPokemon) {
      const pokemonInfo = [];
      const pokemonDetails = await getPokemonDetails(guessedPokemon.name);
      pokemonInfo.push(guessedPokemon.weight, guessedPokemon.height, guessedPokemon.types.map(({ type }) => type.name));
      pokemonDetails.forEach((detail) => {
        pokemonInfo.push(detail);
      });

      const result = compareGuess(mysteryPokemonInfo, pokemonInfo);
      onComparisonResult(result); // Update the comparison result in the parent component
    }
  }

  return (
    <Select
      options={pokemonList}
      placeholder="Select a Pokémon"
      isClearable={true}
      isSearchable={true}
      components={{ Option: customOptionRenderer }}
      onChange={(selectedOption) => {
        if (selectedOption) {
          fetchAndCompare(selectedOption.value);
        } else {
          onComparisonResult([]); // Clear the comparison result when no Pokemon is selected
        }
      }}
    />
  );
}

const customOptionRenderer = ({ data, innerProps, label }) => (
  <div {...innerProps} className="pokemon-option">
    <div className="pokemon-info">
      <div className="pokemon-image">
        <img src={data.sprite} alt={label} />
      </div>
      <div className="pokemon-name">
        {label}
      </div>
    </div>
  </div>
);
