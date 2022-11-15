import BikeApi from "../tools/bike-api";
import { jcdecaux_api_key } from "../secret.json";

const bikeApi = new BikeApi(jcdecaux_api_key);

export default defineEventHandler(() => bikeApi.getBikeInfo("toulouse", 222));
