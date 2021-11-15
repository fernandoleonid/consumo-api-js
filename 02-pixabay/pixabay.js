'use strict';

const searchImages = async (text) => {
    const key = '12180485-63058e50c2824559402449f76';
    const url = `https://pixabay.com/api/?key=${key}&q=${text}`;
    const response = await fetch(url);
    return response.json();
};

const createLink = (tag) => `
    <a href="#" onClick="loadGallery('${tag}')">
        ${tag}
    </a>
`;

const createCard = ({webformatURL, pageURL, tags, likes, comments}) => {
    const card = document.createElement('div');
    card.classList.add('card-container');
    card.innerHTML = `
        <a href="${pageURL}" class="card-image">
            <img src=${webformatURL} >
        </a>
        <div class="card-info">
            <div class="card-tags">
               ${tags.split(',').map(createLink).join('')}
            </div>
            <div class="card-action">  
                <div class="card-like">
                    <i class="far fa-thumbs-up"></i>
                    <span>${likes}</span>
                </div>
                <div class="card-comment">
                    <i class="far fa-comment"></i>
                    <span>${comments}</span>
                </div>
                <div class="card-save">
                    <i class="far fa-bookmark"></i>
                </div>
            </div>

        </div>
    `;
    return card;
};

const loadGallery = async (text) => {
    const container = document.querySelector('.container-gallery');
    const {hits} = await searchImages(text);
    const cards = hits.map(createCard);
    container.replaceChildren(...cards);
    document.querySelector('#search-input').value = text;
};

const handleKeypress = ({key, target}) => {
    if (key === 'Enter') {
        loadGallery(target.value);
    }
};

document.querySelector('#search-input').addEventListener('keypress', handleKeypress);
