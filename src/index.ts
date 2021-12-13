import ToulouseAPI from "./bike-api";
import LaundryAPI from "./laundry-api";

const API_KEY: string = "023030b5f6c19e42322958981c0db9bdab05b1d9";

async function main() {
  const toulouseApi = new ToulouseAPI(API_KEY);
  const bikeData = await toulouseApi.getBikeInfo("toulouse", 222);

  console.table([bikeData]);
}

async function main_laundry() {
  const laundryAPI = new LaundryAPI();

  await laundryAPI.update();

  console.log(laundryAPI.getNumAvailableWashers() + " lave linges disponibles");
}

console.log("Starting app");
main();
main_laundry();
