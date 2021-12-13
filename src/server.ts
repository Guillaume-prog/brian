import * as express from "express";
import * as https from "https";
import * as fs from "fs";

interface SSLOptions {
  cert_path: string;
  key_path: string;
}

class Server {
  private app: express.Application;

  public constructor() {
    this.app = express();
  }

  public addRoute(path: string, callback: () => any) {
    this.app.get(path, async (req, res) => {
      res.json(await callback());
    });
  }

  public launch(port: number, ssl_options?: SSLOptions) {
    if (ssl_options) {
      const certificate = fs.readFileSync(ssl_options.cert_path, "utf-8");
      const privateKey = fs.readFileSync(ssl_options.key_path, "utf-8");
      const credentials = { key: privateKey, cert: certificate };

      https
        .createServer(credentials, this.app)
        .listen(port, () => console.log(`Server running HTTPS on port ${port}`));
    } else {
      this.app.listen(port, () => console.log(`Server running HTTP on port ${port}`));
    }
  }
}

export default Server;
