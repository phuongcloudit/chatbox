const request = require('request');

module.exports.queryIntent = (text) => {
    return new Promise((resolve, reject) => {
        let options = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + "64108e64367f4fb8835fbbd546577311"
            },
            url: "https://api.dialogflow.com/v1/query?v=20170712",
            body: JSON.stringify({
                "lang": "en",
                "query": text,
                "sessionId": "12345",
                "timezone": "America/New_York"
            })
        }
        request.post(options, (err, res, body) => {
            if (err) {
                resolve({ success: false })
                console.log('err', err);
            } else {
                resolve(getIntentFromResponse(JSON.parse(res.body)))
            }
        })
    })
}

function getIntentFromResponse(body) {
    if (body && body.status && body.status.code == '200') {
        return { success: true, intentName: body.result.metadata.intentName };
    } else {
        return { success: false };
    }
}