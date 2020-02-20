const echokit = require('../../EchoKit')

const memories = []

const remember = (envelope) => {
    const rememberance = envelope.slot('memory')
    memories.push(rememberance)
    return echokit.makeMessage('Putting it in the ol cranium.')
}

const recall = () => {
    if (memories.length < 1) return echokit.makeMessage('No memories recorded.')
    return echokit.makeMessageFromQueue(memories)
}

const forget = () => {
    while (memories.length > 0) {
        memories.pop()
    }
    return echokit.makeMessage('I have forgotten everything.')
}

module.exports = {
    remember: remember,
    recall: recall,
    forget: forget
}