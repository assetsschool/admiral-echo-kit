const fs = require('fs')

class StorageBlock {
    constructor(name, autosave = true) {
        this.name = name
        this.autosave = autosave

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
        if (this.autosave) this.save()
    }

    get(key) {
        const data = this.data[key]
        if (!data) return null
        return data
    }

    save() {
        if (this.saveThread) clearTimeout(this.saveThread)
        this.saveThread = setTimeout( () => {
            this.burn()
            this.saveThread = null
        }, 0);
    }

    burn() {
        const data = JSON.stringify(this.data)
        fs.writeFileSync(this.filename, data)
    }

}

module.exports = StorageBlock