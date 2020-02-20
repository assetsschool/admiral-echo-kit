const makeMessage = (message) => { return { message: message } }

const makeMessageFromQueue = (messages) => {
    let message = ''
    for (const item of messages) {
        message += `${item}. `
    }
    return makeMessage(message)
}

class Dialog {
    constructor(envelope) {
        this.envelope = null
    }
}

const makeInputBuffer = function (envelope) {
    return {
        type: envelope.type,
        time: envelope.timestamp,
        ...envelope.intent,
        slot: function (name) {
            return this.slots[name].value
        }
    }
}

module.exports = {
    makeMessage: makeMessage,
    makeInputBuffer: makeInputBuffer,
    makeMessageFromQueue: makeMessageFromQueue
}