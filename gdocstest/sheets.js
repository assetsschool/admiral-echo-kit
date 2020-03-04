const { GoogleSpreadsheet } = require('google-spreadsheet');

const main = async () => {

    const credentials = require('./credentials.json');

    // spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1J_0gAEN8WW2tr0TXEXzAyhsBBXvAGOdfQZG7XOf0JHQ');
    
    // await doc.useServiceAccountAuth({
    //     client_email: 'iain_moncrief@assets-school.org',
    //     private_key: 'JiIHUoLn5DC8MELdFemZnmjV',
    //   });
      
    // use service account creds
    await doc.useServiceAccountAuth(credentials);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    // await doc.updateProperties({ title: 'renamed doc' });

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    // adding / removing sheets
    // const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
    // await newSheet.delete();

    await sheet.loadCells()
    const cell = sheet.getCell(0, 0)

    setInterval( async () => {
        cell.value = Math.random() * 10
        sheet.saveUpdatedCells().catch(e => console.log(e))
    }, 500)
}
main().catch(e => console.log(e))