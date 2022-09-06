//Imports:
import {
  fedServiceTime,
  milServiceTime,
  totalTime,
  servicePercent,
  finalAnnuity,
  rasAnnual,
  rasMonthly,
  checkValidDate,
} from "./annuity.js";

let firstName = document.querySelector("#firstName");
let middleInit = document.querySelector("#middleInit");
let lastName = document.querySelector("#lastName");
let milBuyback = document.querySelector("#milBuyback");
let milDateElements = document.querySelector(".military-dates");
let militaryServiceTime = document.querySelector(".military__results");
let retirementAge = document.querySelector("#retirementAge");
let sickLeave = document.querySelector("#sickLeave");
let high3 = document.querySelector("#high3");
let ssa = document.querySelector("#ssa");
let enterOnDate = document.querySelector("#enterOnDate");
let retireDate = document.querySelector("#retirementDate");
let milStartDate = document.querySelector("#milStartDate");
let milEndDate = document.querySelector("#milEndDate");
const form = document.querySelector("#retirementForm");

//variable declarations:
const integerElements = [retirementAge, sickLeave, high3, ssa];
const textElements = [firstName, middleInit, lastName];
const dateElements = [enterOnDate, retireDate, milStartDate, milEndDate];

// Just-validate configuration settings:
const validation = new JustValidate("#retirementForm", {
  errorFieldCssClass: "is-invalid",
  successFieldCssClass: "is-valid",
  errorLabelCssClass: "is-label-invalid",
  focusInvalidField: "true",
  lockForm: "true",
  tooltip: {
    position: "right",
  },
});

//Event Listeners
//Create array of all the input elements, add eventlistener and style when focused:
const inputElements = document.getElementsByTagName("input");
for (let i = 0; i < inputElements.length; i++) {
  inputElements[i].addEventListener("focus", (e) => {
    e.target.style.backgroundColor = "hsla(0,5%,81%,0.6)";
  });
  //return background color to original state:
  inputElements[i].addEventListener("focusout", (e) => {
    e.target.style.backgroundColor = "white";
  });
}

//loop through array of similar element value types (ie, int, float or text):
integerElements.forEach((input) => {
  input.addEventListener("input", (event) => {
    //provides input mask with comma formatting
    event.target.value = (
      parseInt(event.target.value.replace(/[^\d]+/gi, "")) || 0
    ).toLocaleString("en-US");
  });
});

//loop through array of similar element value types (ie, int or float):
textElements.forEach((input) => {
  input.addEventListener("input", (event) => {
    //provides input mask
    event.target.value = event.target.value.replace(/[^a-zA-Z]+/gi, "") || "";
  });
});

//Show Military dates if the user selects buyback option "yes"
milBuyback.addEventListener("change", (event) => {
  milDateElements.classList.toggle("display__toggle");
  militaryServiceTime.classList.toggle("display__toggle");
});

//Check for valid dates as the user enters
dateElements.forEach((input) => {
  input.addEventListener("change", () => {
    checkValidDate(input);
  });
});

//Handle form data:
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  //Append calculated results to the formData object:
  formData.append("annuityPercent", servicePercent);
  formData.append("annuityAmount", finalAnnuity);
  formData.append("federalTime", fedServiceTime);
  formData.append("militaryTime", milServiceTime);
  formData.append("rasMonthly", rasMonthly);
  formData.append("rasAnnual", rasAnnual);

  //create instance of URLSearchParams with the form information
  const payload = new URLSearchParams(formData);
  //simulated endpoint request/response testing service
  fetch("http://httpbin.org/post", {
    method: "POST",
    body: payload,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});

//Form Validation:
validation
  .addField("#firstName", [
    {
      rule: "minLength",
      value: 1,
    },
    {
      rule: "maxLength",
      value: 30,
    },
    {
      rule: "required",
      errorMessage: "First name is required!",
    },
  ])
  .addField("#lastName", [
    {
      rule: "minLength",
      value: 1,
    },
    {
      rule: "maxLength",
      value: 30,
    },
    {
      rule: "required",
      errorMessage: "Last name is required!",
    },
  ])
  .addField("#middleInit", [
    {
      rule: "minLength",
      value: 0,
    },
    {
      rule: "maxLength",
      value: 1,
    },
  ])
  .addField("#retirementAge", [
    {
      rule: "required",
      errorMessage: "Retirement Age is required!",
    },
    {
      rule: "minNumber",
      value: 1,
    },
    {
      rule: "maxNumber",
      value: 99,
    },
  ])
  .addField("#sickLeave", [
    {
      rule: "required",
      errorMessage: "Sick Leave balance required for accurate results",
    },
    {
      rule: "minNumber",
      value: 0,
    },
    {
      rule: "maxNumber",
      value: 9999,
    },
  ])
  .addField("#high3", [
    {
      rule: "required",
      errorMessage: "High 3 salary requried for accurate results",
    },
  ])
  .addField("#enterOnDate", [
    {
      rule: "required",
      errorMessage: "Please enter your Enter on Date.",
    },
  ])
  .addField("#retirementDate", [
    {
      rule: "required",
      errorMessage: "Please enter your Retirement Date.",
    },
  ]);
