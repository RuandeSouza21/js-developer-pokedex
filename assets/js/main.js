const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 1000;
const limit = 10;
let offset = 0;

const Modal = {
    open(number){
        // Abrir modal
        // Adicionar a class active ao modal
        document
            .getElementById(`n${number}`)
            .classList
            .add('active')
    },
    close(number){
        // fechar o modal
        // remover a class active do modal
        document
            .getElementById(`n${number}`)
            .classList
            .remove('active')
    }
}


function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="Modal.open(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
            
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>

            <div class="modal-overlay" id="n${pokemon.number}">
                <div class="modal ${pokemon.type}">
                    <h2 class="name"> ${pokemon.name} </h2>  
                    <h3>Pokedex: ${pokemon.number}</h3>
                    
                    <img src="${pokemon.photo}" alt="${pokemon.name}">

                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
            
                    <h3>Abilities: </h3>
                        <ol class="abilities">
                            ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}
                        </ol>

                    <button class="closeModalButtton" onclick="Modal.close(${pokemon.number})">Fechar</button>
                </div>
            </div>

            `).join('')  
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})




