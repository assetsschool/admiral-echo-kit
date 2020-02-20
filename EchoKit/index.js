const makeMessage = (message) => { return { message: message } }

class Dialog {
    constructor(envelope) {
        this.envelope = null
    }
}

const makeInputBuffer = function (envelope) {
    return {
        type: envelope.type,
        time: envelope.timestamp,
        ...envelope.intent
    }
}

module.exports = {
    makeMessage: makeMessage,
    makeInputBuffer: makeInputBuffer
}