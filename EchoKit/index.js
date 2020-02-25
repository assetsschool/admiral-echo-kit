const StorageBlock = require('./StorageBlock')

const makeMessage = (message) => { return { message: message } }

const makeMessageFromQueue = (messages) => {
    let message = ''
    for (const item of messages) {
        message += `${item}. `
    }
    return makeMessage(message)
}

const makeInputBuffer = function (envelope) {
    return {
        session: envelope.session,
        type: envelope.request.type,
        time: envelope.request.timestamp,
        ...envelope.request.intent, // This function is pretty badass
        slot: function (name) {
            return this.slots[name].value
        }
    }
}

const storageBlock = function (name) {
    return new StorageBlock(name)
}

module.exports = {
    makeMessage: makeMessage,
    makeInputBuffer: makeInputBuffer,
    makeMessageFromQueue: makeMessageFromQueue,
    storageBlock: storageBlock
}