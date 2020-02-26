const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')

const SCOPES = ['https://www.googleapis.com/auth/documents.readonly']

const TOKEN_PATH = process.cwd() + '/.google.api.token.json'


function authorize(credentials, callback) {

    const { client_secret, client_id, redirect_uris } = credentials.installed

    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (error, token) => {
        if (error) return getNewToken(oAuth2Client, callback)
        oAuth2Client.setCredentials(JSON.parse(token))
        callback(oAuth2Client)
    })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    })
    console.log('Authorize this app by visiting this url:', authUrl)
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close()
        oAuth2Client.getToken(code, (error, token) => {
            if (error) return console.error('Error retrieving access token', error)
            oAuth2Client.setCredentials(token)
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (error) => {
                if (error) console.error(error)
                console.log('Token stored to', TOKEN_PATH)
            })
            callback(oAuth2Client)
        })
    })
}

function printDocTitle(auth) {
    const sesh = new Promise( function (resolve, reject) {

        const docs = google.docs({ version: 'v1', auth })

        const options = { documentId: '10XwbY5qJQ7wZJc566rSDf6o7XeBDX2U3UO_lzy1EnzQ' }
        docs.documents.get(options, function (error, response) {
            if (error) return reject(error)
            resolve(response)
        })
    })
    .then( response => {
        console.log(response.data.title)
    })
    .catch( error => console.log(error))
}

const main = async () => {
    const credentials = fs.readFileSync('credentials.json')
    authorize(JSON.parse(credentials), printDocTitle)
}
main()