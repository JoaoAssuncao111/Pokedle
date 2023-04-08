import * as React from "react"
import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import {randomPokemonGenerator} from '../utils'

export function GameScreen() {
    const {gameMode} = useParams()
    const [guesses,setGuesses] = useState([])
    const [currentPokemon, setCurrentPokemon] = useState()
    const [textBoxGuess, setTextBoxGuess] = useState()
    const [pictureUrl,setPictureUrl] = useState()    

    async function handleGenerateButtonClick(){
        fetchPokemon(gameMode)
        console.log(currentPokemon)
    }
    async function fetchPokemon(gen){

        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonGenerator(gen)}`)
            const pokemon = await response.json()
            if(pokemon)
            setCurrentPokemon(pokemon.forms[0].name)
            setPictureUrl(pokemon.sprites.front_default)
        }
        catch (error){
            console.log(error)
            return
        }
    
    }

    return(<div>
        <text>{currentPokemon}</text>
        <img src={pictureUrl}></img>
        <button onClick={handleGenerateButtonClick}>GENERATE!</button>
    </div>)


    
}