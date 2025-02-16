'user strict'

function alterarCorFundo (temperatura) {
    let corFundo =  ''

    if (temperatura <= 0) {
        corFundo = '#4A90E2'
    }else if (temperatura <= 20){
        corFundo = '#7BB3FF'
    }else if (temperatura <= 30) {
        corFundo = '#FFD166'
    }else {
        corFundo = '#FF6B6B'
    }

    document.documentElement
            .style.setProperty('--bg-color', corFundo)
    document.documentElement
            .style.setProperty('--text-color', '#000')
    document.documentElement
            .style.setProperty('--body-color', `${corFundo}44`) 
}

async function pesquisarClima (cidade) {
    const key  =  '6529d94be4584b0ca5d125906252601'
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${cidade}&aqi=no`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function prencherFormulario (evento) {
    
    if (evento.key === "Enter"){
        const cidade = evento.target.value
        const info  = await pesquisarClima(cidade)
        console.log (info)

        document.getElementById('weather-image')
                .src = info.current.condition.icon.replaceAll(64,128)
        document.getElementById('weather-temperature')
                .textContent =  `${Math.floor(info.current.temp_c)}° C`
        document.getElementById('weather-city')
                .textContent = info.location.name
        document.getElementById('humidity')
                .textContent = `${info.current.humidity}%`
        document.getElementById('wind')
                .textContent = `${info.current.wind_kph} KM/h`
        alterarCorFundo(info.current.temp_c)
    }
}

document.getElementById('weather-search')
        .addEventListener('keydown', prencherFormulario)