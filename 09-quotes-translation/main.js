'user strict'

async function carregaCitacao () {
    const urlProxy = 'https://api.codetabs.com/v1/proxy?quest='
    const url = 'https://stoic.tekloon.net/stoic-quote'
    const response = await fetch (`${urlProxy}${url}`)
    const data = await response.json()
    return data.data
}

async function traduzirCitacao (citacao) {
    
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(citacao)}&langpair=en|pt`
    const response = await fetch(url)
    const data = await response.json()
    return data.responseData.translatedText
}

async function mostrarCitacao () {
    const citacaoDiv =  document.getElementById('quote')
    const citacao = await carregaCitacao()
    const citacaoBr = await traduzirCitacao(citacao.quote)
    citacaoDiv.textContent = `${citacaoBr} - ${citacao.author}`
}

document.getElementById('new-quote')
        .addEventListener('click', mostrarCitacao)
        
mostrarCitacao()