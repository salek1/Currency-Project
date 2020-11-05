document.addEventListener('DOMContentLoaded', () => {
    let text = document.querySelector('#txt')
    let button = document.querySelectorAll('button')
    let response = document.querySelector('#response')
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')
    let currencyType;

    button.forEach(x => x.onclick = () => {
        text.value = x.innerHTML
    })

    document.querySelector('form').onsubmit = () => {
        // Transforms input text to UpperCase
        let input = text.value
        input = input.toUpperCase()
        currencyType = input

        //get connection from API
        let request = new XMLHttpRequest()
        request.open('GET', 'https://api.exchangeratesapi.io/latest', true)

        request.onreadystatechange = () => {
            try {
                if (request.readyState == 4 && request.status == 200) {
                    let data = JSON.parse(request.responseText)
                    let rates = new Set(Object.keys(data.rates))

                    if (input === '' || !rates.has(input)) {
                        throw new InputError('Empty input or wrong currency')
                    }
                    response.style.visibility = "visible";
                    response.style.background = '#92f88d';
                    response.appendChild(p1).innerHTML = `Date: ${data.date}`
                    response.appendChild(p2).innerHTML = `Currency: ${Number.parseFloat(data.rates[`${input}`]).toFixed(3)} ${currencyType}`
                } else {
                    throw new RequestError("Request Error")
                }
            }
            catch (error) {
                if (error instanceof InputError) {
                    response.style.visibility = "visible"
                    response.style.background = '#FF3232'
                    response.appendChild(p1)
                    response.appendChild(p2)
                    response.firstElementChild.innerHTML = ''
                    response.lastElementChild.innerHTML = error.message

                } else if (error instanceof RequestError) {
                    response.style.visibility = "visible"
                    response.style.background = '#FF3232'
                    response.appendChild(p1)
                    response.firstElementChild.innerHTML = error.message
                }
            }
        }

        request.send()
        return false

    }
})
