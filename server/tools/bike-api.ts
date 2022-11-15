import WebAPI from "./web-api";

interface BikeInfo {
  name: string;
  available: number;
  total: number;
}

class BikeAPI extends WebAPI {
  constructor(api_key: string) {
    super("https://api.jcdecaux.com/vls/v3/", api_key);
  }

  protected create_request_url(
    base: string,
    path: string,
    key: string
  ): string {
    return `${base}/${path}?apiKey=${key}`;
  }

  getBikeInfo(city: string, station_id: number) {
    return this.request(`/stations/${station_id}`, { contract: city }).then(
      (bikeRawData: any) =>
        <BikeInfo>{
          name: bikeRawData.name.split(" - ").slice(1).join(" - "),
          available: bikeRawData.totalStands.availabilities.bikes,
          total: bikeRawData.totalStands.capacity,
        }
    );
  }
}

export default BikeAPI;
export { BikeInfo };
