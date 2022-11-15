import LaundryAPI, { LaundrySummary } from "../tools/laundry-api";
import { laundry_room_id } from "../secret.json";

const laundryAPI = new LaundryAPI(laundry_room_id);

export default defineEventHandler(async () => {
  const res: LaundrySummary = {
    detailed: await laundryAPI.getData(),
    washers: laundryAPI.getNumAvailableWashers(),
    dryers: laundryAPI.getNumAvailableDryers(),
  };

  return res;
});
