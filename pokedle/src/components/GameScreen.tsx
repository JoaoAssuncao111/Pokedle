import * as React from "react"
import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { randomPokemonGenerator } from '../utils'
import { Pokemon } from "../Pokemon"
import GuessBar from "./GuessBar"

export function GameScreen() {
    
    //[height, weight, gen introduced, gender ratio, types, can evolve, is evolved]
    const { gameMode } = useParams()
    const [guesses, setGuesses] = useState([])
    const [mysteryPokemon, setMysteryPokemon] = useState<Pokemon|null>(null)
    const [pictureUrl, setPictureUrl] = useState()
    
    async function handleGenerateButtonClick() {
        fetchPokemon(gameMode)
        console.log(mysteryPokemon)
    }


    async function fetchPokemon(gen) {

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonGenerator(gen)}`)
            const pokemon = await response.json()
            if (pokemon) {
                setMysteryPokemon(pokemon)
                setPictureUrl(pokemon.sprites.front_default)
            }
        }
        catch (error) {
            console.log(error)
            return
        }

    }


    return (<div>
        <div>
            {mysteryPokemon ? (
                <>
                    <text>{mysteryPokemon.forms[0].name}</text>
                    <img src={pictureUrl} />
                </>
            ) : null}
        </div>
        <div>
            <button onClick={handleGenerateButtonClick}>GENERATE!</button>
        </div>
        <GuessBar mysteryPokemon={mysteryPokemon}></GuessBar>

    </div>)



}