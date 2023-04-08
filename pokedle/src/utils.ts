
export function randomPokemonGenerator(generation) {
    let genDexNumbers = {
        1: 151,
        2: 251,
        3: 386,
        4: 493, 
        5: 649, 
        6: 721, 
        7: 809, 
        8: 908
    }
    return Math.floor(Math.random() * genDexNumbers[generation]) + 1;

}

export function compareGuess(actual,guess){
    const correct: [number, number,number,] = [actual.weight,actual.height,]
}