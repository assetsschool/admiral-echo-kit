const echokit = require('../../EchoKit')

const coroutine = () => echokit.makeMessage('Hey! This is an example coroutine.')

module.exports = coroutine