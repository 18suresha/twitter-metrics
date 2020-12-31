const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
const axios = require('axios');
const fs = require('fs');

async function getMetrics() {
    const creds_file = fs.readFileSync('creds.json');
    const creds = JSON.parse(creds_file);

    let results = { 'NASA': 0, 'BarackObama': 0, 'Illinois_Alma': 0, 'CBS': 0 };

    const prev_hour = Math.floor(Date.now() / 1000) - 3600;

    try {
        for (let key in results) {
            await axios.get('https://api.twitter.com/1.1/search/tweets.json', {
                params: {
                    q: 'from:' + key + ' since:' + prev_hour.toString()
                },
                headers: {
                    Authorization: 'Bearer ' + creds['Bearer token'],
                    Accept: 'application/json'
                }
            }).then(res => {
                results[key] = 1;
            }).catch(error => {
                console.log(error)
            })
        }
    } catch (err) {
        console.log(err);
    }
    return results;
}

async function insertMetrics() {
    const ddb = new AWS.DynamoDB.DocumentClient();
    const tstamp = Math.floor(Date.now() / 1000);
    const results = await getMetrics();
    for (let key in results) {
        let params = {
            TableName: 'twitter_metrics',
            Item: {
                'account': key,
                'tstamp': tstamp,
                'count': results[key]
            }
        };
        ddb.put(params, function (err, data) {
            if (err) {
                console.log('Error', err)
            } else {
                console.log('Success', data)
                return false;
            }
        });
    }
    return true;
}

exports.handler = function () {
    (async () => {
        await insertMetrics();
    })()
};
