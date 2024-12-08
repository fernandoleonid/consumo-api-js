'use strict'

async function loadGallery () {
    const gallery = document.getElementById('gallery')
    const url = 'https://api.thecatapi.com/v1/images/search?limit=10'

    const response = await fetch(url)
    const cats = await response.json()

    cats.forEach ( cat => {
        const img = document.createElement('img')
        img.src = cat.url
        gallery.appendChild(img)
    })
    console.log (data)
}

loadGallery()