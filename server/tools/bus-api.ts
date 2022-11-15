import WebAPI from "./web-api";
import { Dict } from "@/types";

type BusLine = {
  name: string;
  times?: Dict<string>;
  color: {
    bg: string;
    fg: string;
  };
};

class BusAPI extends WebAPI {
  public constructor(api_key: string) {
    super("https://api.tisseo.fr/v1", api_key);
  }

  protected create_request_url(
    base: string,
    path: string,
    key: string
  ): string {
    return `${base}/${path}.json?key=${key}`;
  }

  public async getTimes(stop_name: string) {
    const stops: any = await this.request("/stop_areas", { displayLines: "1" });
    const stop = stops.stopAreas.stopArea.filter((x) => x.name == stop_name)[0];

    let lines: BusLine[] = stop.line.map((line: any) => ({
      name: line.shortName,
      color: {
        bg: line.bgXmlColor,
        fg: line.fgXmlColor,
      },
    }));

    const times: any = await this.request("/stops_schedules", {
      stopAreaId: stop.id,
    });
    const dict: Dict<Dict<string>> = {};

    for (const time of times.departures.departure) {
      if (dict[time.line.shortName] == undefined)
        dict[time.line.shortName] = {};

      const cur_time = dict[time.line.shortName][time.destination[0].name];
      const next_time =
        cur_time == undefined ||
        new Date(cur_time).getTime() - new Date(time.dateTime).getTime() > 0
          ? time.dateTime
          : cur_time;

      dict[time.line.shortName][time.destination[0].name] = next_time;
    }

    lines = lines.map((line) => ({ times: dict[line.name], ...line }));
    return lines;
  }
}

export default BusAPI;
export { BusLine };
