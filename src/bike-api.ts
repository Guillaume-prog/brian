import axios from "axios";
import { urlJoin } from "url-join-ts";

interface BikeInfo {
  name: string;
  available: number;
  total: number;
}

class ToulouseAPI {
  private baseUrl = "https://api.jcdecaux.com/vls/v3/";
  private apiKey: string;

  constructor(api_key: string) {
    this.apiKey = api_key;
  }

  request(endpoint, options = {}) {
    let requestURL = urlJoin(this.baseUrl, endpoint) + "?apiKey=" + this.apiKey;

    for (const [key, value] of Object.entries(options)) {
      requestURL += `&${key}=${value}`;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(requestURL)
        .then((res) => {
          if (res.status == 200) resolve(res.data);
          else reject(res);
        })
        .catch((err) => reject(err));
    });
  }

  getBikeInfo(city, station_id) {
    return this.request(`/stations/${station_id}`, { contract: city }).then(
      (bikeRawData: any) =>
        <BikeInfo>{
          name: bikeRawData.name.split(" - ").slice(1).join(" - "),
          available: bikeRawData.totalStands.availabilities.bikes,
          total: bikeRawData.totalStands.capacity
        }
    );
  }
}

export default ToulouseAPI;
