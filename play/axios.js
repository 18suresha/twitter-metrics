const axios = require('axios')
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
                results[key] = res.data.statuses.length;
            }).catch(error => {
                console.log(error)
            })
        }
    } catch (err) {
        console.log(err);
    }
    return results;
}

(async() => {
    let results = await getMetrics();
    console.log(results);
})()
