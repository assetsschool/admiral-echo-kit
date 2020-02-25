const echokit = require('../../EchoKit')

const storage = echokit.storageBlock('elephant')

const memories = storage.get('memories') || []

const save = function () {
    storage.set('memories', memories)
}

const remember = (envelope) => {
    const rememberance = envelope.slot('memory')
    memories.push(rememberance)
    save()
    return echokit.makeMessage('Putting it in the ol cranium.')
}

const recall = () => {
    if (memories.length < 1) return echokit.makeMessage('No memories recorded.')
    return echokit.makeMessageFromQueue(memories)
}

const forget = () => {
    if (memories.length < 1) return echokit.makeMessage('Nothing to forget! :)')
    while (memories.length > 0) {
        memories.pop()
    }
    save()
    return echokit.makeMessage('I have forgotten everything.')
}

module.exports = {
    remember: remember,
    recall: recall,
    forget: forget
}