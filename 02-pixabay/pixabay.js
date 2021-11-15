'use strict';

const searchImages = async (text)=> {
    const key = '12180485-63058e50c2824559402449f76';
    const url = `https://pixabay.com/api/?key=${key}&q=${text}`;
    const response = await fetch(url)
    return response.json();
}

const loadGallery = async (text) => {
    const imagesInfo = await searchImages (text); 
    console.log (imagesInfo);
}

const handleKeypress = ({key, target}) => {
    if (key === 'Enter') {
        loadGallery(target.value);
    }
};

document.querySelector('#search-input')
        .addEventListener('keypress', handleKeypress);