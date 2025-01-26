function exibirDadosPais (infoPais) {
    console.log (infoPais)
    document.getElementById('country-flag').src = infoPais.flags.png
    document.getElementById('country-name').textContent = infoPais.name.common
    document.getElementById('country-capital').textContent = infoPais.capital[0]
}

async function obterPais (pais) {
    const url = `https://restcountries.com/v3.1/name/${pais}`
    const response = await fetch(url)
    const data = await response.json()
    return  data[0]
}

document
    .getElementById('country-input')
    .addEventListener('keydown', async (evento) => {
        if (evento.key == 'Enter') {
             const infoPais = await obterPais(evento.target.value)
             exibirDadosPais (infoPais)
        }
})