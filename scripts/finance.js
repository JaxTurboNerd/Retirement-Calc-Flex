import { googleAPIKey, yahooAPIKey } from "../config.js";

// Just-validate configuration settings:
// const validation = new JustValidate("#futureValue-form", {
//   errorFieldCssClass: "is-invalid",
//   successFieldCssClass: "is-valid",
//   errorLabelCssClass: "is-label-invalid",
//   focusInvalidField: "true",
//   lockForm: "true",
//   tooltip: {
//     position: "right",
//   },
// });

//connect to user input
let tspBalance = document.querySelector("#tspBalance");
let ppContributions = document.querySelector("#ppContributions");
let returnRate = document.querySelector("#returnRate");
let futureYears = document.querySelector("#futureYears");
let calculateButton = document.querySelector(".calculate__btn");
let savingsBalance = document.querySelector("#savingsBalance");
let withdrawlAmount = document.querySelector("#withdrawl");
let frequency = document.querySelector("#frequency");
let investmentReturn = document.querySelector("#investmentReturn");
let inflation = document.querySelector("#inflation");
let taxRate = document.querySelector("#taxRate");

//Variable declarations:
let foundError = false;

//Number(Currency) formatting:
let usCurrency = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//Input validation functions:
function checkValidNumber(input) {
  //remove the commas from the input string
  let newValue = parseFloat(input.value.replace(/,/g, ""));
  if (isNaN(newValue) || newValue < 0) {
    foundError = true;
    showError(input);
  } else {
    resetClass(input);
    foundError = false;
  }
}

function showError(input) {
  const dollarFlex = input.parentElement;
  const formControl = dollarFlex.parentElement;
  formControl.className = "form-control error";
}

function resetClass(input) {
  const dollarFlex = input.parentElement;
  const formControl = dollarFlex.parentElement;
  formControl.className = "form-control";
}

//Calculate the future value of the user's TSP balance:
function calculateTSPValue() {
  const tspValue = parseFloat(tspBalance.value.replace(/,/g, ""));
  const contributionValue = parseFloat(ppContributions.value.replace(/,/g, ""));
  const yearlyContribution = contributionValue * 26;
  const annualizedRate = 1 + parseFloat(returnRate.value) * 0.01;
  const years = parseInt(futureYears.value);

  //year 1:
  let futureBalance = (tspValue + yearlyContribution) * annualizedRate;
  //subsequent years:
  for (let i = 1; i < years; i++) {
    // let updatedBalance = futureBalance;
    futureBalance = (futureBalance + yearlyContribution) * annualizedRate;
  }
  // console.log(usCurrency.format(futureBalance));
  document.querySelector(
    ".tsp__results"
  ).innerHTML = `The estimated value of your TSP account in ${years} years will be ${usCurrency.format(
    futureBalance
  )}`;
}

//Event Listeners:
tspBalance.addEventListener("input", (event) => {
  //provides input mask with comma formatting
  event.target.value = (
    parseInt(event.target.value.replace(/[^\d]+/gi, "")) || 0
  ).toLocaleString("en-US");
});

ppContributions.addEventListener("input", (event) => {
  //provides input mask with comma formatting
  event.target.value = (
    parseInt(event.target.value.replace(/[^\d]+/gi, "")) || 0
  ).toLocaleString("en-US");
});

savingsBalance.addEventListener("input", (event) => {
  //provides input mask with comma formatting
  event.target.value = (
    parseInt(event.target.value.replace(/[^\d]+/gi, "")) || 0
  ).toLocaleString("en-US");
});

withdrawlAmount.addEventListener("input", (event) => {
  //provides input mask with comma formatting
  event.target.value = (
    parseInt(event.target.value.replace(/[^\d]+/gi, "")) || 0
  ).toLocaleString("en-US");
});

calculateButton.addEventListener("click", () => {
  //run through numerical validations for each input field
  checkValidNumber(tspBalance);
  if (!foundError) {
    checkValidNumber(ppContributions);
  }
  if (!foundError) {
    checkValidNumber(returnRate);
  }
  if (!foundError) {
    checkValidNumber(futureYears);
  }
  if (!foundError) {
    //finally calculate the total result if no errors
    calculateTSPValue();
  }
});

//Yahoo finance API via RAPIDAPI
const encodedParams = new URLSearchParams();
encodedParams.append("symbol", "COST");
encodedParams.append("period", "1d");

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "X-RapidAPI-Key": yahooAPIKey,
//     "X-RapidAPI-Host": "yahoo-finance97.p.rapidapi.com",
//   },
//   body: encodedParams,
// };

// fetch("https://yahoo-finance97.p.rapidapi.com/price", options)
//   .then((response) => response.json())
//   .then((response) => {
//     console.log(response.data);
//     document.querySelector("#marketData").innerHTML =
//       "COSTCO: " + response.data[0].Close;
//   })
//   .catch((err) => console.error(err));

// Google Finance API (indexes):
const indexOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": googleAPIKey,
    "X-RapidAPI-Host": "google-finance4.p.rapidapi.com",
  },
};

// fetch(
//   "https://google-finance4.p.rapidapi.com/market-trends/?t=indexes&s=americas&hl=en&gl=US",
//   indexOptions
// )
//   .then((response) => response.json())
//   .then((response) => {
//     let SP500Title = response.items[0].info.title;
//     let sp500Value = usCurrency.format(response.items[0].price.last.value);
//     let DJIAtitle = response.items[1].info.title;
//     let DJIAvalue = usCurrency.format(response.items[1].price.last.value);
//     let nasdaqTitle = response.items[2].info.title;
//     let nasdaqValue = usCurrency.format(response.items[2].price.last.value);
//     let russellTitle = response.items[3].info.title;
//     let russellValue = usCurrency.format(response.items[3].price.last.value);

//     //Set HTML content:
//     document.querySelector("#sp500").innerHTML = `${SP500Title}: ${sp500Value}`;
//     document.querySelector("#djia").innerHTML = `${DJIAtitle}: ${DJIAvalue}`;
//     document.querySelector(
//       "#nasdaq"
//     ).innerHTML = `${nasdaqTitle}: ${nasdaqValue}`;
//     document.querySelector(
//       "#russell"
//     ).innerHTML = `${russellTitle}: ${russellValue}`;
//     // console.log(response);
//   })
//   .catch((err) => console.error(err));
