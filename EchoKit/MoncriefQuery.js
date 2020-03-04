const { GoogleSpreadsheet } = require('google-spreadsheet');

class MoncriefQuery {
    constructor(credentialsPath) {
        this.tableId = null
        this.credentials = require(process.cwd() + '/./' + credentialsPath)
        
    }

    async connect(tableId) {
        this.tableId = tableId
        const document = new GoogleSpreadsheet(this.tableId)
        
        await document.useServiceAccountAuth(this.credentials)
        await document.loadInfo()

        if (document.sheetCount < 1) {
            await document.addSheet({ title: 'Sheet1' })
        } 

        this.document = document
        return this.document
    }

    sheet(id = 0) {
        if (!this.mainSheet) {
            this.mainSheet = true
            this.mainSheet = this.sheet(0)
        }
        const sheet = this.document.sheetsByIndex[id]
        sheet.load = sheet.loadCells
        sheet.save = sheet.saveUpdatedCells
        return sheet
    }

    async makeSheet(name = null) {
        await this.document.addSheet({ title: 'Sheet' + (this.document.sheetCount + 1) })
    }


}


class MoncriefTable {
    constructor(credentialsPath, structurePath) {
        this.tableId = null
        this.credentials = require(process.cwd() + '/./' + credentialsPath)
        this.structure = require(process.cwd() + '/./' + structurePath)
        this.workingSheetId = sha64.encode(JSON.stringify(this.structure))
    }

    async connect(tableId) {
        this.tableId = tableId
        const document = new GoogleSpreadsheet(this.tableId)
        
        await document.useServiceAccountAuth(this.credentials)
        await document.loadInfo()

        if (document.sheetCount < 1) {
            await document.addSheet({ title: 'Sheet1' }) // USE this.workingSheetId. dont touch other sheets. create if does not already exist.
        } 

        this.document = document
        return this.document
    }

    sheet(id = 0) {
        if (!this.mainSheet) {
            this.mainSheet = true
            this.mainSheet = this.sheet(0)
        }
        const sheet = this.document.sheetsByIndex[id]
        sheet.load = sheet.loadCells
        sheet.save = sheet.saveUpdatedCells
        return sheet
    }

    async makeSheet(name = null) {
        await this.document.addSheet({ title: 'Sheet' + (this.document.sheetCount + 1) })
    }
}



// const echokit = require('../EchoKit')


// const host = echokit.MoncriefQuery('credentials.json')

// const coroutine = async () => {
    
//     const connection = await host.connect('1J_0gAEN8WW2tr0TXEXzAyhsBBXvAGOdfQZG7XOf0JHQ')

//     const table = await connection.sheet().load()
//     table.rows().each( row => {

//     })
//     table.save().then( () => console.log('Saved!') )

//     return echokit.makeMessage('Changes will be saved!')

// }

// module.exports = coroutine