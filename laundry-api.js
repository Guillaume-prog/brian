const puppeteer = require('puppeteer');

class LaundryAPI {

    HOSTNAME = "https://www.proxiwash.com/weblaverie/ma-laverie-2?s=63d411"

    constructor() {
        this.data = [];
    }

    getNumAvailableWashers() {
        return this.data.filter(x => x.status != "EN COURS" && x.type == 'LAVE LINGE 6 KG').length;
    }

    getNumAvailableDryers() {
        return this.data.filter(x => x.status != "EN COURS" && x.type == 'SECHE LINGE 14 KG').length;
    }

    async update() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(this.HOSTNAME);
        this.data = await page.$$eval("#liste-machines table tbody tr", this.parseTable);
        console.table(this.data);

        await browser.close();
    }

    parseTable(rows) {
        const getTime = x => (x == "") ? null : x;
        const getStatus = x => (x == "") ? "EN COURS" : x;

        return rows.map(r => Array.from(r.children).map(x => x.textContent))
        .slice(1)
        .filter(r => r.length > 2)
        .map(row => ({
            id: parseInt(row[1].split(' ').pop()),
            type: row[0].trim().replace('LL 6kg2', 'LAVE LINGE 6 KG'),
            status: getStatus(row[2].trim()),
            endTime: getTime(row[5].trim())
        }));
    }

}

module.exports = LaundryAPI;