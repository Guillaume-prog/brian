import axios from "axios";
import { urlJoin } from "url-join-ts";

export default abstract class WebAPI {
  private base_url: string;
  private api_key: string;

  public constructor(base_url: string, api_key: string) {
    this.base_url = base_url;
    this.api_key = api_key;
  }

  protected abstract create_request_url(base: string, path: string, key: string): string;

  protected request(path: string, args: { [key: string]: string } = {}) {
    // URL Building
    let req_str = this.create_request_url(this.base_url, path, this.api_key);
    for (const [key, value] of Object.entries(args)) {
      req_str += `&${key}=${value}`;
    }

    // Perform the request
    return new Promise((resolve, reject) => {
      axios
        .get(req_str)
        .then((res) => {
          if (res.status == 200) resolve(res.data);
          else reject(res);
        })
        .catch((err) => reject(err));
    });
  }
}
