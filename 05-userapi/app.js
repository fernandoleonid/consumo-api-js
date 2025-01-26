'user strict'

async function getUsers () {
    const url = 'https://randomuser.me/api/?results=8&nat=br'
    const response = await fetch(url)
    const data = await response.json()
    return data.results
}

async function loadUsers () {
    const users = await getUsers()
    const userContainer = document.getElementById('user-container')
    users.forEach( user => {
        const card = document.createElement('article')
        card.className = 'user-card'
        card.innerHTML = `
            <img 
                src="${user.picture.large}"
                alt="Foto de ${user.name.first}"
                class="user-image"
            >
            <h2 class="user-name">${user.name.first} ${user.name.last}</h2>
            <p>${user.email}</p>
            <p>${user.cell}</p>
        `
        userContainer.appendChild(card)
        console.log (user)
    })
}

loadUsers()