import { googleAPIKey, yahooAPIKey } from "../config.js";

//Number(Currency) formatting:
let usCurrency = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//Yahoo finance API via RAPIDAPI
const encodedParams = new URLSearchParams();
encodedParams.append("symbol", "COST");
encodedParams.append("period", "1d");

const options = {
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": yahooAPIKey,
    "X-RapidAPI-Host": "yahoo-finance97.p.rapidapi.com",
  },
  body: encodedParams,
};

fetch("https://yahoo-finance97.p.rapidapi.com/price", options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response.data);
    document.querySelector("#marketData").innerHTML =
      "COSTCO: " + response.data[0].Close;
  })
  .catch((err) => console.error(err));

// Google Finance API (indexes):
const indexOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": googleAPIKey,
    "X-RapidAPI-Host": "google-finance4.p.rapidapi.com",
  },
};

fetch(
  "https://google-finance4.p.rapidapi.com/market-trends/?t=indexes&s=americas&hl=en&gl=US",
  indexOptions
)
  .then((response) => response.json())
  .then((response) => {
    let SP500Title = response.items[0].info.title;
    let sp500Value = usCurrency.format(response.items[0].price.last.value);
    let DJIAtitle = response.items[1].info.title;
    let DJIAvalue = usCurrency.format(response.items[1].price.last.value);
    let nasdaqTitle = response.items[2].info.title;
    let nasdaqValue = usCurrency.format(response.items[2].price.last.value);
    let russellTitle = response.items[3].info.title;
    let russellValue = usCurrency.format(response.items[3].price.last.value);

    //Set HTML content:
    document.querySelector("#sp500").innerHTML = `${SP500Title}: ${sp500Value}`;
    document.querySelector("#djia").innerHTML = `${DJIAtitle}: ${DJIAvalue}`;
    document.querySelector(
      "#nasdaq"
    ).innerHTML = `${nasdaqTitle}: ${nasdaqValue}`;
    document.querySelector(
      "#russell"
    ).innerHTML = `${russellTitle}: ${russellValue}`;
    // console.log(response);
  })
  .catch((err) => console.error(err));
