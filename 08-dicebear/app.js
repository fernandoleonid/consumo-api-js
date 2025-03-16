'use strict'

async function extrairEstilosDiceBear() {
    const urlProxy = 'https://api.codetabs.com/v1/proxy?quest='
    const url = 'https://www.dicebear.com/styles/'
    const response = await fetch(`${urlProxy}${url}`)
    const html =  await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const elementos = doc.querySelectorAll('p[data-v-10acf738]')
    const estilos = [...elementos].map(elemento => elemento.textContent)

    return estilos
}

async function carregarEstilos () {
    const estilos = await extrairEstilosDiceBear()
    const select = document.getElementById('estilo-select')
    estilos.forEach ( estilo => {
        const option = document.createElement('option')
        option.value = estilo.toLowerCase().replace(' ','-')
        option.textContent = estilo
        select.appendChild(option)
    })
}

async function carregarSvg (url)  {
    const response = await fetch(url)
    const svgText = await response.text()
    const parser = new DOMParser
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
    const svgElement = svgDoc.querySelector('svg')
    return svgElement
}

function extrairCor (svg) {
    const fill = document.querySelectorAll('[fill]')
    const coresIgnoradas = ['#fff','#ffffff','#000','#000000','none']
    
    for (const elemento of fill){
        const cor = elemento.getAttribute('fill')
        if (!coresIgnoradas.includes(cor)){
            return cor
        }
    }
    
}

async function gerarAvatar () {
    const nome = document.getElementById('nome-input').value.trim()
    const estilo = document.getElementById('estilo-select').value
    const avatarContainer = document.getElementById('avatar-container')

    if (!nome || estilo == 'Selecione um estilo'){  
        avatarContainer.textContent  = 'Preencha o nome e estilo'
    }else{
        const url = `https://api.dicebear.com/9.x/${estilo}/svg?seed=${nome}`

        const avatarSvg = await carregarSvg(url)
        avatarContainer.replaceChildren(avatarSvg)

        const cor = extrairCor(avatarSvg)
        document.body.style.setProperty('--bg-color', `${cor}55`)

        console.log('Gerando Avatar:', url)
    }
}


carregarEstilos()

document.getElementById('nome-input')
        .addEventListener('input', gerarAvatar)
document.getElementById('estilo-select')
        .addEventListener('change', gerarAvatar)

