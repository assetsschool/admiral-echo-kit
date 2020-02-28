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
            this.mainSheet = this.document.sheetsByIndex[0]
        }
        return this.mainSheet
    }

    async makeSheet(name = null) {
        await this.document.addSheet({ title: 'Sheet' + (this.document.sheetCount + 1) })
    }


}



const echokit = require('../EchoKit')


const host = echokit.MoncriefQuery('credentials.json')

const coroutine = async () => {
    
    const connection = await host.connect('1J_0gAEN8WW2tr0TXEXzAyhsBBXvAGOdfQZG7XOf0JHQ')

    const table = await connection.sheet().load()
    table.rows().each( row => {

    })
    table.save().then( () => console.log('Saved!') )

    return echokit.makeMessage('Changes will be saved!')

}

module.exports = coroutine