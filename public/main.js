// const { response } = require("express")

// const { response } = require("express")

const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _=> {
fetch('quotes', {
    method: 'put',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify({
        name: 'Android',
        quote: 'I am a senior Android developer.'
    })
})
.then(res => {
    if(res.ok) return res.json()
})
.then(response => {
    window.location.reload(true)
})
})

deleteButton.addEventListener('click', _ => {
fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    name: 'Android'
    })
})
    .then(res => {
    if (res.ok) return res.json()
    })
    .then(response => {
    if (response === 'No quote to delete') {
        messageDiv.textContent = "No quote to delete"
    } else {
        window.location.reload()
    }
})
})