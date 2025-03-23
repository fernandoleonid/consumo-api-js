'use strict'

let dadosHeroi1 = null
let dadosHeroi2 = null

async function buscarSugestoes (nomeHeroi) {
    const API_TOKEN = '5fd262ca8bb870b8f1a6c8b5ab89b84a'
    const API_URL = `https://superheroapi.com/api.php/${API_TOKEN}`

    const response = await fetch(`${API_URL}/search/${nomeHeroi}`)
    const data = await response.json()

    return data.results.slice(0,5)

}

function selecionarHeroi(heroi, target) {
    if (target.id == 'hero1-input') {
        dadosHeroi1 = heroi
    }else {
        dadosHeroi2 = heroi
    }
    target.value = heroi.name
    target.parentNode.querySelector('.suggestions').remove()
}

async function mostrarSugestoes({target}) {
    
    const nomeHeroi = target.value.trim()
    const listaSugestoes = await buscarSugestoes(nomeHeroi)

    let divSugestoes = target.parentNode.querySelector('.suggestions')
    if (!divSugestoes) {
        divSugestoes = document.createElement('div')
        divSugestoes.classList.add('suggestions')
        target.parentNode.appendChild(divSugestoes)
    }
    divSugestoes.replaceChildren()
    listaSugestoes.forEach ( heroi => {
        const itemSugestao = document.createElement('div')
        itemSugestao.classList.add('suggestions-item')
        itemSugestao.textContent = heroi.name
        itemSugestao.onclick = () => selecionarHeroi(heroi, target)
        divSugestoes.appendChild(itemSugestao)
    })
    
    console.log(listaSugestoes);
    
}

document.getElementById('hero1-input')
        .addEventListener('input', mostrarSugestoes)
document.getElementById('hero2-input')
        .addEventListener('input', mostrarSugestoes)