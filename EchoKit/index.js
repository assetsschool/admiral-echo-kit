const makeMessage = (message) => { return { message: message } }

const inputBuffer = function (data/* slots ...etc */) {
    this.data = data
}

module.exports = {
    makeMessage: makeMessage
}