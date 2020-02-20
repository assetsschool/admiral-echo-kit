const coroutines = { }

coroutines['ExampleIntent'] = require('./Example')
coroutines['WhereIsIntent'] = require('./WhereIs')

const memoryCoroutines = require('./Elephant')
coroutines['RememberIntent'] = memoryCoroutines.remember
coroutines['RecallIntent'] = memoryCoroutines.recall

module.exports = coroutines