// Created by Iain Moncrief at 2020/02/12 12:53.
// 
// Email - iainmoncrief@gmail.com


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
app.use(bodyParser.json())




const makeMessage = (message) => { return { message: message } }

const coroutines = { }

coroutines['HackIntent'] = () => makeMessage('Okie Dokie Artichokie!')

coroutines['ArbitraryIntent'] = () => makeMessage([...Array(100).keys()].map( n => n + 1 ).toString().replace(/,/g, ' '))
coroutines['WhereIsIntent'] = () => makeMessage('Not sure where to find that...')

const handle = function (request) {
    const intent = request.data
    const coroutine = coroutines[intent]
    if (coroutine) return coroutine()
    return makeMessage(`No coroutine found for ${intent}`)
}





app.get('/', (request, response) => response.json({ message: 'Hello World!!!' }))

app.post('/speach', (request, response) => response.json(handle(request.body)))

app.listen(port, () => console.log(`Listening on port ${port}!`))