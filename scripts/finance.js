import { googleAPIKey, yahooAPIKey } from "../config.js";

//connect to user input
let tspBalance = document.querySelector("#tspBalance");
let ppContributions = document.querySelector("#ppContributions");
let returnRate = document.querySelector("#returnRate");
let futureYears = document.querySelector("#futureYears");
let tspButton = document.querySelector(".tsp__btn");
let savingsBalance = document.querySelector("#savingsBalance");
let withdrawlAmount = document.querySelector("#withdrawl");
let frequency = document.querySelector("#frequency");
let investmentReturn = document.querySelector("#investmentReturn");
let inflation = document.querySelector("#inflation");
let taxRate = document.querySelector("#taxRate");
let savingsButton = document.querySelector(".savings__btn");

//Variable declarations:
let foundError = false;

//Currency formatting:
let usCurrency = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//Input validation functions:
function isValidNumber(input) {
  //remove the commas from the input string
  let newValue = parseFloat(input.value.replace(/,/g, ""));
  if (isNaN(newValue) || newValue < 0) {
    foundError = true;
    showError(input);
    return false;
  } else {
    resetClass(input);
    foundError = false;
    return true;
  }
}

//displayss a <small> error tag </small> if a validation error exists:
function showError(input) {
  const dollarFlex = input.parentElement;
  const formControl = dollarFlex.parentElement;
  formControl.className = "form-control error";
}

//resets/hides the error small tag
function resetClass(input) {
  const dollarFlex = input.parentElement;
  const formControl = dollarFlex.parentElement;
  formControl.className = "form-control";
}

//Calculate the future value of the user's TSP balance:
function calculateTSPValue() {
  //the replace function removes the commas from the user input
  const tspValue = parseFloat(tspBalance.value.replace(/,/g, ""));
  const contributionValue = parseFloat(ppContributions.value.replace(/,/g, ""));
  const yearlyContribution = contributionValue * 26; //26 pay periods per year
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

//This calculates how long the user's money will last
function calculateInvestmentDuration() {
  // m = interest rate
  // p = principal
  // w = withdrawl amount
  // n = periods

  // n = -(Log[1 - (m p)/w]/Log[1 + m])
  const balance = parseFloat(savingsBalance.value.replace(/,/g, ""));
  const withdrawlSum = parseFloat(withdrawlAmount.value.replace(/,/g, ""));
  const interestRate = parseFloat(investmentReturn.value) * 0.01;
  const numerator = Math.log(1 - (interestRate * balance) / withdrawlSum);
  const denominator = Math.log(1 + interestRate);

  //Need to check for zeros entered by user...will result in NaN
  //code here:

  const periods = -(numerator / denominator);
  console.log(
    `balance: ${balance} withdrawl: ${withdrawlSum} rate: ${interestRate}`
  );
  console.log(periods);
  return periods;
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

returnRate.addEventListener("input", (event) => {
  //validates only numbers and decimals
  event.target.value = event.target.value.replace(/[^\d.]/gi, "");
});

futureYears.addEventListener("input", (event) => {
  //make sure there will always be a value in the input field:
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

investmentReturn.addEventListener("input", (event) => {
  //validates only numbers and decimals
  event.target.value = event.target.value.replace(/[^\d.]/gi, "");
});

inflation.addEventListener("input", (event) => {
  //validates only numbers and decimals
  event.target.value = event.target.value.replace(/[^\d.]/gi, "");
});

taxRate.addEventListener("input", (event) => {
  //validates only numbers and decimals
  event.target.value = event.target.value.replace(/[^\d.]/gi, "");
});

tspButton.addEventListener("click", () => {
  //run through numerical validations for each input field
  const inputFields = [tspBalance, ppContributions, returnRate, futureYears];
  //loop through the input element array.  this loop breaks out with a falsy value
  let foundNoErrors = inputFields.every((input) => {
    if (!isValidNumber(input)) {
      return false;
    }
    return true;
  });

  if (foundNoErrors) {
    calculateTSPValue();
  }
});

savingsButton.addEventListener("click", () => {
  //Validations for input fields:
  const inputFields = [
    savingsBalance,
    withdrawlAmount,
    investmentReturn,
    inflation,
    taxRate,
  ];

  //loop through input fields and validate user input:
  let foundNoErrors = inputFields.every((input) => {
    if (!isValidNumber(input)) {
      return false;
    }
    return true;
  });

  if (foundNoErrors) {
    calculateInvestmentDuration();
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
