import BusAPI from "../tools/bus-api";
import { tisseo_api_key } from "../secret.json";

const busApi = new BusAPI(tisseo_api_key);

export default defineEventHandler(() => busApi.getTimes("LAAS"));
