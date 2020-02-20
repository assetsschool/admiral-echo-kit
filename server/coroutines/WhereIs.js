const echokit = require('../../EchoKit')

const coroutine = (envelope) => {
    
    const item = envelope.slot('item')

    return echokit.makeMessage(`Not sure where to find ${item}. Try asking Mr. Pennington.`)
}

module.exports = coroutine