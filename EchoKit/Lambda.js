class Lambda {
    constructor(lambda) {
        this.lambda = lambda
    }
    schedule(ms = 0) {
        this.thread = setTimeout(this.lambda, ms)
    }
    retire() {
        clearTimeout(this.thread)
    }
}

module.exports = Lambda