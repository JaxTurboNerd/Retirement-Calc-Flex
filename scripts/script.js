//Imports:
import { checkValidDate } from "./annuity.js";

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
const dateElements = [enterOnDate, retireDate, milStartDate, milEndDate];
// const textElements = [firstName, middleInit, lastName];

// Just-validate configuration settings:
const validation = new JustValidate(form, {
  validateBeforeSubmitting: true,
  errorFieldCssClass: "is-invalid",
  successFieldCssClass: "is-valid",
  errorLabelCssClass: "is-label-invalid",
  focusInvalidField: "true",
  lockForm: "true",
  tooltip: {
    position: "bottom",
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
// textElements.forEach((input) => {
//   input.addEventListener("input", (event) => {
//     //provides input mask
//     event.target.value = event.target.value.replace(/[^a-zA-Z]+/gi, "") || "";
//   });
// });

//Show Military dates if the user selects buyback option "yes"
milBuyback.addEventListener("change", (event) => {
  milDateElements.classList.toggle("display__toggle");
  militaryServiceTime.classList.toggle("display__toggle");
  //add just-validate rule when "yes" selected:
  if (event.target.value == "true") {
    validation
      .addField("#milStartDate", [
        {
          rule: "required",
          errorMessage: "Please enter your Military Start Date",
        },
      ])
      .addField("#milEndDate", [
        {
          rule: "required",
          errorMessage: "Please enter your Military End Date",
        },
      ]);
  } else {
    validation.removeField("#milStartDate");
    validation.removeField("#milEndDate");
  }
});

//Check for valid dates as the user enters
dateElements.forEach((input) => {
  input.addEventListener("change", () => {
    checkValidDate(input);
  });
});

//Form Validation:
validation
  .addField("#retirementAge", [
    {
      rule: "required",
      errorMessage: "Retirement Age is required!",
    },
    {
      rule: "minNumber",
      value: 1,
      errorMessage: "Value should be greater than zero",
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
