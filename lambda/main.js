const Alexa = require('ask-sdk-core');
const https = require('https');

const endpoint = 'developer.grape-juice.org';

const parseIntent = stri => stri.replace(/Intent/g, '');

const retrieveResponse = input => {
    const data = JSON.stringify({
        data: input
    });

    const options = {
        hostname: endpoint,
        port: 443,
        path: '/speach',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };
    return new Promise(((resolve, reject) => {
        const request = https.request(options, (response) => {
            response.setEncoding('utf8');
            let returnData = '';

            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new Error(`${response.statusCode}: ${response.req.getHeader('host')} ${response.req.path}`));
            }

            response.on('data', (chunk) => {
                returnData += chunk;
            });

            response.on('end', () => {
                const coded = JSON.parse(returnData);
                const responseData = coded.message;
                resolve(JSON.stringify(responseData));
            });

            response.on('error', (error) => {
                reject(error);
            });
        });
        request.write(data);
        request.end();
    }));
}

const HackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
            // && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HackIntent';
    },
    async handle(handlerInput) {
        
        const presenPackageDebug = await retrieveResponse(handlerInput.requestEnvelope);
        
        const speakOutput = await retrieveResponse(Alexa.getIntentName(handlerInput.requestEnvelope));
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
}