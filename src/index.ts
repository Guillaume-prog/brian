import ToulouseAPI from "./apis/bike-api";
import LaundryAPI from "./apis/laundry-api";
import Server from "./server";

const API_KEY: string = "023030b5f6c19e42322958981c0db9bdab05b1d9";

async function main() {
  console.log("Starting app");

  const server = new Server();
  const toulouseAPI = new ToulouseAPI(API_KEY);
  const laundryAPI = new LaundryAPI();

  await laundryAPI.start();

  server.addRoute("/", () => ["Welcome to Brian's lair !"]);

  server.addRoute("/bikes", () => toulouseAPI.getBikeInfo("toulouse", 222));

  server.addRoute("/laundry", () => laundryAPI.getData());

  server.launch(8000);
}

main();
