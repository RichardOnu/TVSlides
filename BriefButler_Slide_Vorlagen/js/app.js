class CsvRecord {
  constructor(year, month, electronic, physical) {
    this.year = year;
    this.month = month;
    this.electronic = electronic;
    this.physical = physical;
  }
}

document.addEventListener("DOMContentLoaded", parseNumbersToChart)

/*
document.addEventListener("DOMContentLoaded", async () => {
  await fetchAndSaveData();
  const records = await readSendeData();
  updateRecapText();
  updateNumbers(records);
});
*/

function parseNumbersToChart(){
  // parse number to the chart them here:
  /*
    postalischevalue = physical sendings
    elektronischevalue = electronic sendings
    regmailvalue = regmail sending (partial number of electronic)
    gesamtvalue = total sendings
    percentagestyle = increase in total sendings compared to last month
  */

  //call visual stuff after:
  getPercentAndColor()
}

function getPercentAndColor() {
  let postalischperc = Number((document.getElementById("postalischevalue").innerText) / Number(document.getElementById("gesamtvalue").innerText)) * 100;
  let elektronischeperc = Number((document.getElementById("elektronischevalue").innerText) / Number(document.getElementById("gesamtvalue").innerText)) * 100;
  let regmailSendungenperc = Number((document.getElementById("regamilvalue").innerText) / Number(document.getElementById("gesamtvalue").innerText)) * 100;
  let gesamtperc = Number((document.getElementById("gesamtvalue").innerText) / Number(document.getElementById("gesamtvalue").innerText)) * 100;

  var ctx = document.getElementById('pie').getContext("2d");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Postalisch', 'Elektronisch', 'Regmail'],
      datasets: [{
        data: [postalischperc, elektronischeperc, regmailSendungenperc],
        backgroundColor: [
          "rgba(20, 184, 166)",
          "rgba(250, 204, 21)",
          "rgba(245, 158, 11)"
        ],
        borderColor: [
          "rgba(20, 184, 166)",
          "rgba(250, 204, 21)",
          "rgba(245, 158, 11)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          enabled: false,
        }
      }
    }
  });

  let pstyle = document.getElementById("percentagestyle");

  // Extract only the numeric value from the text content
  let percentageText = pstyle.innerText.replace(/[^0-9.-]+/g, '');
  let percentageValue = Number(percentageText);

  if (percentageValue < 0) {
    pstyle.style.backgroundColor = "#f5ecec";
    pstyle.style.color = "red";
  } else if (percentageValue > 0) {
    pstyle.style.backgroundColor = "#ecfdf5";
    pstyle.style.color = "#18b9a7";
  } else {
    pstyle.style.backgroundColor = "grey";
    pstyle.style.color = "black";
  }
}




async function fetchAndSaveData() {

  // provisional fetching system (does not work in js (file restrictions))

  /*
    gesamtSendungen = total sendings
    elektrSendungen = electronic sendings
    senungen = physical sendings
   */

  const url = "http://statistiken.int.hpcdual.at/auswertungen/csv/MonthsOE.csv";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const content = await response.text();
    localStorage.setItem("sendedata.csv", content);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

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
  document.getElementById("gesamtSendungen").textContent = (latestRecord.electronic + latestRecord.physical).toString();
  document.getElementById("elektrSendungen").textContent = latestRecord.electronic.toString();
  document.getElementById("sendungen").textContent = latestRecord.physical.toString();
}

function getNeukunden() {
  // Implementiere die Neukunden-Logik hier, falls erforderlich
}
