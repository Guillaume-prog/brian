const axios = require('axios').default;
const urljoin = require('urljoin');
class ToulouseAPI {

    BASE_URL = "https://api.jcdecaux.com/vls/v3/"

    constructor(api_key) {
        this.apiKey = api_key;
    }

    request(endpoint, options = {}) {
        let requestURL = urljoin(this.BASE_URL, endpoint) + "?apiKey=" + this.apiKey;
        
        for(const [key, value] of Object.entries(options)) {
            requestURL += `&${key}=${value}`;
        }
        
        return new Promise((resolve, reject) => {
            axios.get(requestURL)
            .then(res => {
                if(res.status == 200)
                    resolve(res.data);
                else
                    reject(res);
            })
            .catch(err => reject(err));
        })
    }

    getBikeInfo(city, station_id) {
        return this.request(`/stations/${station_id}`, {contract: city});
    }

}

module.exports = ToulouseAPI;