console.log('JS loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#BDMSG1')
const messageTwo = document.querySelector('#BDMSG2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
        
    if(location) {
        messageTwo.textContent = ""
        messageOne.textContent = "Searching for " + location
        fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if (data.error){
                    return messageOne.textContent = data.error
                }
                messageOne.textContent = ""
                return messageTwo.textContent = data.forecastdata
            })
        })
        
    }

})