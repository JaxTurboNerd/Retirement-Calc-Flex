// Just-validate configuration settings:
const validation = new JustValidate("#retirement-form", {
  errorFieldCssClass: "is-invalid",
  successFieldCssClass: "is-valid",
  errorLabelCssClass: "is-label-invalid",
  focusInvalidField: "true",
  lockForm: "true",
  tooltip: {
    position: "right",
  },
});

// Military Buyback value to display/hide Military buyback dates:
let milBuyback = document.querySelector("#milBuyback");
let milDateElements = document.querySelector(".military-dates");
let militaryServiceTime = document.querySelector(".military__results");

//Show Military dates if the user selects buyback option "yes"
milBuyback.addEventListener("change", (event) => {
  milDateElements.classList.toggle("display__toggle");
  militaryServiceTime.classList.toggle("display__toggle");
});

//Create array of all the input elements, add evetlistener and style when focused:
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
    {
      rule: "minNumber",
      value: 0,
    },
    {
      rule: "maxNumber",
      value: 500000,
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

const form = document.querySelector("#retirement-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
