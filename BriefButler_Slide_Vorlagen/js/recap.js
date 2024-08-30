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

  // Get the values from localStorage, or use 0 if not present
  const storedElectronic = parseInt(localStorage.getItem("electronicBeforeRefresh")) || 0;
  const storedPhysical = parseInt(localStorage.getItem("physicalBeforeRefresh")) || 0;

  // Compare the stored values with the latest record values
  const electronicToDisplay = Math.max(latestRecord.electronic, storedElectronic);
  const physicalToDisplay = Math.max(latestRecord.physical, storedPhysical);

  // Update the DOM with the correct values
  document.getElementById("elektrSendungen").textContent = electronicToDisplay.toString();
  document.getElementById("sendungen").textContent = physicalToDisplay.toString();

  // Store the latest values for the next refresh
  localStorage.setItem("electronicBeforeRefresh", electronicToDisplay.toString());
  localStorage.setItem("physicalBeforeRefresh", physicalToDisplay.toString());
}

