const ToulouseAPI = require('./bike-api');
const LaundryAPI = require('./laundry-api');

const API_KEY = "023030b5f6c19e42322958981c0db9bdab05b1d9";

async function main() {
    const toulouseApi = new ToulouseAPI(API_KEY);
    const bikeRawData = await toulouseApi.getBikeInfo('toulouse', 222);

    const bikeData = [{
        name: bikeRawData.name.split(' - ').slice(1).join(' - '),
        availableBikes: bikeRawData.totalStands.availabilities.bikes, 
        totalBikes: bikeRawData.totalStands.capacity
    }];

    console.table(bikeData);
}

async function main_laundry() {
    const laundryAPI = new LaundryAPI();
    await laundryAPI.update();

    console.log(laundryAPI.getNumAvailableWashers() + " lave linges disponibles")
}

// main()
main_laundry()