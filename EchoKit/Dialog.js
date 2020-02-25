const StorageBlock = require('./StorageBlock')

class Dialog {
    constructor(name, envelope) {
        this.name = name
        this.envelope = envelope
        this.storage = new StorageBlock('dialog-implementation.' + name, false)
        this.id = envelope.session.sessionId
        
        const session = this.storage.get('sessions')[this.id]
        if (session) {
            this.session = session
        } else {
            this.session = {
                stage: 0
            }
            this.storage.data[this.id] = this.session
        }
        this.dialogQueue = []
    }

    ask(message, lambda) {
        const dialogEvent = {
            message: message,
            lambda: lambda,
            stage: this.dialogQueue.length
        }
        this.dialogQueue.push(dialogEvent)
        return this
    }

    speak(message) {
        const dialogEvent = {
            message: message,
            lambda: null,
            stage: this.dialogQueue.length
        }
        this.dialogQueue.push(dialogEvent)
        return this
    }

    execute() {

        // TODO -- Set breadcrums and session status/stage in the user's session in the response

        const stage = this.session
        const event = this.dialogQueue[this.stage - 1]
        this.storage.save()
        return echokit.makeMessage(shouldEndSession = this.shouldQuit())
    }
}


// Example

const echokit = require('EchoKit')

const coroutine = (envelope) => {
    
    const dialog = echokit.dialog('ExampleCoroutine', envelope)
    const dialog = new echokit.Dialog('ExampleCoroutine')


    dialog.speak('This is my first dialog Object!')
        .ask('Whats your favorite color?', data => {

        })
        .execute()
}

module.exports = coroutine