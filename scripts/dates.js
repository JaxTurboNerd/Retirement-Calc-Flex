//Retirement Dates => calculate total federal service time
let enterOnDate = document.querySelector("#enterOnDate");
let retirementDate = document.querySelector("#retirementDate");
let milStartDate = document.querySelector("#milStartDate");
let milEndDate = document.querySelector("#milEndDate");
let milService = document.querySelector("#milBuyback");
let datesButton = document.querySelector("#datesBtn");

//Variables declarations:
let foundError = false;

enterOnDate.addEventListener("change", () => {
  //check for null and valid date values:
  checkValidDate(enterOnDate);
});

retirementDate.addEventListener("change", () => {
  //check for null and valid date values:
  checkValidDate(retirementDate);
});

milStartDate.addEventListener("change", () => {
  // check for null and valid date values
  checkValidDate(milStartDate);
});

milEndDate.addEventListener("change", () => {
  //Check for null and valid date values:
  checkValidDate(milEndDate);
});

//Date formatter - vanilla js
function formatDate(inputDate) {
  //Must use UTC values to fix being off by one day:
  const workingDate = new Date(inputDate);
  const day = workingDate.getUTCDate();
  const month = workingDate.getUTCMonth() + 1;
  const year = workingDate.getUTCFullYear();
  return month + "/" + day + "/" + year;
}

//vanilla js
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  input.nextElementSibling.innerText = message;
}

//vanill js
function resetClass(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control";
}

//LUXON-Library functions:

//Check for a valid date:
function checkValidDate(date) {
  const workingDate = luxon.DateTime.fromISO(date.value);
  if (!workingDate.isValid) {
    foundError = true;
    showError(date, "Please enter a valid date!");
    return;
  } else {
    foundError = false;
    resetClass(date);
  }
}

//function to calculate total service time in years/months/days
//also checks the start/end dates are in correct order as input by
//the user
const calculateTime = (start, end) => {
  //create DateTime instances from ISO values:
  const startDate = luxon.DateTime.fromISO(start.value);
  const endDate = luxon.DateTime.fromISO(end.value);
  //create Interval instance from the DateTime instances:
  const serviceTime = luxon.Interval.fromDateTimes(startDate, endDate);

  // Check for proper date order using invalid method:
  if (!serviceTime.isValid) {
    const reason = serviceTime.invalidReason;
    showError(
      end,
      "Please check your dates.  The end date cannot be before your start date"
    );
    // console.log("invalid reason: " + reason);
    return;
  } else {
    resetClass(end);
  }
  const objTime = serviceTime
    .toDuration(["years", "months", "days"])
    .toObject();
  const stringTime =
    objTime.years +
    " years, " +
    objTime.months +
    " months, " +
    (objTime.days + 1) +
    " days";
  console.log(stringTime);
  return stringTime;
};

datesButton.addEventListener("click", () => {
  //check for valid (including null values) start and end dates:
  checkValidDate(enterOnDate);
  if (!foundError) {
    checkValidDate(retirementDate);
  }

  //Check for nul military dates only if the user selected buyback = 'yes'
  if (milService.value === "true") {
    checkValidDate(milStartDate);
    if (!foundError) {
      checkValidDate(milEndDate);
    }
    if (!foundError) {
      //check proper dates order and calculates total service time
      calculateTime(milStartDate, milEndDate);
    }
  }

  //check proper dates order and calculates total service time
  if (!foundError) {
    calculateTime(enterOnDate, retirementDate);
  }
});
