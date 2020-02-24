const fs = require('fs')

class StorageBlock {
    constructor(name) {
        this.name = name

        const directory = process.cwd() + '/.storage_blocks/'
        if (!fs.existsSync(directory)) fs.mkdirSync(directory)

        this.filename = directory + this.name + '.json'
        if (fs.existsSync(this.filename)) {
            this.data = require(this.filename)
        } else {
            this.data = { }
        }
        this.saveThread = null
    }
    
    set(key, value) {
        this.data[key] = value
        if (this.saveThread) clearTimeout(this.saveThread)
        this.saveThread = setTimeout( () => {
            this.save()
            this.saveThread = null
        }, 0);
    }

    get(key) {
        const data = this.data[key]
        if (!data) return null
        return data
    }

    save() {
        const data = JSON.stringify(this.data)
        fs.writeFileSync(this.filename, data)
    }

}

module.exports = StorageBlock