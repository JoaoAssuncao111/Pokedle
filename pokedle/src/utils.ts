
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
export function compareGuess(actual, guess) {
    const result = [];

    for (let i = 0; i < actual.length; i++) {
        const el1 = actual[i];
        const el2 = guess[i];

        if (typeof el1 === 'number' && typeof el2 === 'number') {
            if (el1 > el2) {
                result.push(1);
            } else if (el1 < el2) {
                result.push(-1);
            }
            else { result.push(0) }
        } else if (typeof el1 === 'string' && typeof el2 === 'string') {
            const str1 = el1.toLowerCase();
            const str2 = el2.toLowerCase();

            if (str1 === str2) {
                result.push('equal');
            } else if (str1.includes(str2) || str2.includes(str1)) {
                result.push('partial');
            } else {
                result.push('different');
            }
        } else if (typeof el1 === 'boolean' && typeof el2 === 'boolean') {
            result.push(el1 === el2);
        }
        else if (Array.isArray(el1) && Array.isArray(el2)) {
            let count = 0
            if (el1.includes(el2[0])) {
                count++;
            }
            if (el2.length > 1) {
                if (el1.includes(el2[1])) {
                    count++;
                }
            }
            switch (count) {
                case 0:
                    result.push('different');
                    break;
                case 1:
                    result.push('partial');
                    break;
                case 2:
                    result.push('equal');
                    break;
            }


        }
    }
    console.log(result)
    return result;
}

export async function getPokemonDetails(pokemon) {
    console.log(pokemon)
    const pokeresp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const pokedata = await pokeresp.json()
    const weight = await pokedata.weight
    const height = await pokedata.height

    const species_resp = await fetch(pokedata.species.url)
    const species = await species_resp.json()
    const genderRatio = await species.gender_rate

    const hasEvolved: boolean = species.evolves_from_species != null ? true : false
    console.log(`Has Evolved: ${hasEvolved}`)
    let canEvolve = false

    const evolutionChainResponse = await fetch(species.evolution_chain.url)

    const evolutionChainData = await evolutionChainResponse.json()
    const evolutionChain = await evolutionChainData.chain
    const possibleEvolutions = await evolutionChain.evolves_to
    console.log(evolutionChainData)

    let currentSpecies = await evolutionChain.species.name
    if (currentSpecies == pokemon && evolutionChain.evolves_to.length > 0) canEvolve = true
    else {

        for (let idx = 0; idx < evolutionChain.evolves_to.length; idx++) {
            if (possibleEvolutions[idx].species.name == pokemon) {
                if (possibleEvolutions[idx].evolves_to.length != 0) {
                    canEvolve = true
                    break
                }
            }
        }
    }

    console.log(`Can Evolve: ${canEvolve}`)

    const genResp = await fetch(species.generation.url)
    const generation = genResp.url.split("/")[6]


    const result = [weight, height, genderRatio, canEvolve, hasEvolved, parseInt(generation)];
    console.log(result)
    return result

}






