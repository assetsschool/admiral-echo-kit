const echokit = require('../../EchoKit')

const memories = []

const remember = (envelope) => {
    const rememberance = envelope.slot('memory')
    memories.push(remember)
    return echokit.makeMessage('Putting it in the ol cranium.')
}

const recall = () => {
    if (memories.length < 1) return echokit.makeMessage('No memories recorded.')
    let message = ''
    for (const memory of memories) {
        message += `${memory}. `
    }
    return echokit.makeMessage(message)
}

module.exports = {
    remember: remember,
    recall: recall
}