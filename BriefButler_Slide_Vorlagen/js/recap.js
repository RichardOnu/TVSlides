class CsvRecord {
  constructor(year, month, electronic, physical) {
    this.year = year;
    this.month = month;
    this.electronic = electronic;
    this.physical = physical;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const records = await readSendeData();
  updateRecapText();
  updateNumbers(records);
});

async function readSendeData() {
  const csvData = localStorage.getItem("sendedata.csv");
  const records = [];
  if (!csvData) {
    console.error("CSV data not found in local storage");
    return records;
  }

  const lines = csvData.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    try {
      const record = new CsvRecord(
        parseInt(values[headers.indexOf("Jahr")], 10),
        parseInt(values[headers.indexOf("Monat")], 10),
        parseInt(values[headers.indexOf("Elektronisch")], 10),
        parseInt(values[headers.indexOf("Physisch")], 10)
      );
      records.push(record);
    } catch (error) {
      console.error(`Data format error on row ${i}: ${error.message}`);
    }
  }
  return records;
}

function updateRecapText() {
  const recapTextBlock = document.getElementById("RecapTextBlock");
  const today = new Date();
  recapTextBlock.textContent = `RECAP ${today.toLocaleString('default', { month: 'long' }).toUpperCase()} ${today.getFullYear()}`;
}

function updateNumbers(records) {
  if (records.length === 0) {
    console.error("No records available to update numbers");
    return;
  }
  const latestRecord = records[records.length - 1];

  document.getElementById("elektrSendungen").textContent = latestRecord.electronic.toString();
  document.getElementById("sendungen").textContent = latestRecord.physical.toString();
}
