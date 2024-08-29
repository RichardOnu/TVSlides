document.addEventListener("DOMContentLoaded", parseNumbersToChart);

function parseNumbersToChart() {
  getPercentAndColor();
}

function getPercentAndColor() {
  let postalischperc = Number((document.getElementById("postalischevalue").innerText.replace('.', '').replace(',', '')) / Number(document.getElementById("gesamtvalue").innerText.replace('.', '').replace(',', ''))) * 100;
  let elektronischeperc = Number((document.getElementById("elektronischevalue").innerText.replace('.', '').replace(',', '')) / Number(document.getElementById("gesamtvalue").innerText.replace('.', '').replace(',', ''))) * 100;
  let regmailSendungenperc = Number((document.getElementById("regamilvalue").innerText.replace('.', '').replace(',', '')) / Number(document.getElementById("gesamtvalue").innerText.replace('.', '').replace(',', ''))) * 100;

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
