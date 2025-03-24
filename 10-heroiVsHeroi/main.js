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

function atualizarCard({number, name, image}){
    const card = document.getElementById(`card${number}`)
    const titulo = document.createElement('h2')
    titulo.textContent = name
    const imagem = document.createElement('img')
    imagem.src = image.url
    card.replaceChildren(titulo, imagem)
}

function selecionarHeroi(heroi, target) {
    if (target.id == 'hero1-input') {
        heroi.number = 1
        dadosHeroi1 = heroi
    }else {
        heroi.number = 2
        dadosHeroi2 = heroi
    }
    target.value = heroi.name
    atualizarCard(heroi)
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
    
}

document.getElementById('hero1-input')
        .addEventListener('input', mostrarSugestoes)
document.getElementById('hero2-input')
        .addEventListener('input', mostrarSugestoes)