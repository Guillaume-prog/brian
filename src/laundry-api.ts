import * as puppeteer from "puppeteer";

interface LaundryInfo {
  id: number;
  type: LaundryType;
  status: LaundryStatus;
  endTime: string;
}

type LaundryType = "LAVE LINGE 6 KG" | "SECHE LINGE 14 KG";
type LaundryStatus = "DISPONIBLE" | "DEMARRAGE" | "EN COURS" | "TERMINE";

class LaundryAPI {
  private hostname: string = "https://www.proxiwash.com/weblaverie/ma-laverie-2?s=63d411";
  private data: Array<LaundryInfo>;

  public constructor() {
    this.data = [];
  }

  // Get data
  private getAvailable(type: LaundryType) {
    return this.data.filter(
      (x: LaundryInfo) => x.status != "DEMARRAGE" && x.status != "EN COURS" && x.type == type
    ).length;
  }

  public getNumAvailableWashers() {
    return this.getAvailable("LAVE LINGE 6 KG");
  }

  public getNumAvailableDryers() {
    return this.getAvailable("SECHE LINGE 14 KG");
  }

  // Update data
  public async update() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(this.hostname);
    this.data = await page.$$eval("#liste-machines table tbody tr", this.parseTable);
    console.table(this.data);

    await browser.close();
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
        type: <LaundryType>row[0].trim().replace("LL 6kg2", "LAVE LINGE 6 KG"),
        status: <LaundryStatus>getStatus(row[2].trim()),
        endTime: getTime(row[5].trim())
      }));
  }
}

export default LaundryAPI;
