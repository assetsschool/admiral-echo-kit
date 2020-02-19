const makeMessage = (message) => { return { message: message } }

const inputBuffer = function (data/* slots ...etc */) {
    this.data = data
    this.print = function () {
        console.log(this.data)
    }
}

module.exports = {
    makeMessage: makeMessage
}