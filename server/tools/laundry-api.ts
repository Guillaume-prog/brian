import * as puppeteer from "puppeteer";
import {} from "@/types";

type LaundrySummary = {
  detailed: LaundryInfo[];
  washers: LaundryOccupancy;
  dryers: LaundryOccupancy;
};

type LaundryOccupancy = {
  available: number;
  total: number;
};

interface LaundryInfo {
  id: number;
  type: LaundryType;
  status: LaundryStatus;
  endTime: string | null;
}

type LaundryType = "LAVE LINGE 6 KG" | "SECHE LINGE 14 KG";
type LaundryStatus = "DISPONIBLE" | "DEMARRAGE" | "EN COURS" | "TERMINE";

class LaundryAPI {
  private hostname: string =
    "https://www.proxiwash.com/weblaverie/ma-laverie-2?s=";
  private data: Array<LaundryInfo>;
  private page: puppeteer.Page;
  private started: boolean;

  public constructor(id: string) {
    this.data = [];
    this.hostname += id;
    this.started = false;
  }

  public async start() {
    const browser = await puppeteer.launch();
    this.page = await browser.newPage();
    this.started = true;
  }

  // Get data
  private getAvailable(type: LaundryType): LaundryOccupancy {
    const total = this.data.filter((x) => x.type == type);
    const available = total.filter(
      (x) => x.status != "DEMARRAGE" && x.status != "EN COURS"
    );

    return {
      available: available.length,
      total: total.length,
    };
  }

  public getNumAvailableWashers() {
    return this.getAvailable("LAVE LINGE 6 KG");
  }

  public getNumAvailableDryers() {
    return this.getAvailable("SECHE LINGE 14 KG");
  }

  public async getData() {
    if (!this.started) await this.start();
    await this.update();
    return this.data;
  }

  // Update data
  public async update() {
    await this.page.goto(this.hostname);
    this.data = await this.page.$$eval(
      "#liste-machines table tbody tr",
      this.parseTable
    );
  }

  private parseTable(rows: Element[]) {
    const getTime = (x: string) => (x == "" ? null : x);
    const getStatus = (x: string) => (x == "" ? "EN COURS" : x);

    return rows
      .map((r) => Array.from(r.children).map((x) => x.textContent))
      .slice(1)
      .filter((r) => r.length > 2)
      .map((row) => ({
        id: parseInt(row[1].split(" ").pop()),
        type: <LaundryType>(
          row[0]
            .trim()
            .replace("LL 6kg2", "LAVE LINGE 6 KG")
            .replace("LAVE LINGE 8 KG", "LAVE LINGE 6 KG")
        ),
        status: <LaundryStatus>getStatus(row[2].trim()),
        endTime: getTime(row[5].trim()),
      }));
  }
}

export default LaundryAPI;
export {
  LaundryInfo,
  LaundryStatus,
  LaundryType,
  LaundryOccupancy,
  LaundrySummary,
};
