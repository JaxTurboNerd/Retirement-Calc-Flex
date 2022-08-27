//This script file calculates the service times from the dates supplied by the user
//This also calculates the annuity and RAS amounts
//Retirement Dates => calculate total federal service time
let enterOnDate = document.querySelector("#enterOnDate");
let retirementDate = document.querySelector("#retirementDate");
let milStartDate = document.querySelector("#milStartDate");
let milEndDate = document.querySelector("#milEndDate");
let milService = document.querySelector("#milBuyback");
let datesButton = document.querySelector("#datesBtn");
let federalTime = document.querySelector(".federal-time");
let annuityPercent = document.querySelector(".total-percent");
let annuityAmount = document.querySelector(".annuity-amount");
let militaryTime = document.querySelector(".mil__time__results");
let totalServiceTime = document.querySelector(".total__time");
let retirementAge = document.querySelector("#retirementAge");
let sickLeave = document.querySelector("#sickLeave");
let survivorBenefit = document.querySelector("#survivor-benefit");
let highThree = document.querySelector("#high3");
let ssa = document.querySelector("#ssa");
let postRetirmentIncome = document.querySelector("#otherIncome");
let monthlyRAS = document.querySelector(".rasMonthly");
let annualRAS = document.querySelector(".rasAnnual");

//Variables declarations:
let foundError = false;
let fedServiceTime;
let milServiceTime;
let federalDuration;
let militaryDuration;
let servicePercent;
let finalAnnuity;
let rasMonthly;
let rasAnnual;

//Number formatting:
let usCurrency = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let percentFormat = Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2,
  roundingIncrement: 1,
});

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

//check for valid input
function checkValidInput(input, message) {
  if (input.value === "" || input.value <= 0) {
    foundError = true;
    input.style = "border: 1px solid red";
    alert(message);
    // showError(input, message);
    return;
  } else {
    foundError = false;
    input.style = "border: 0";
    // resetClass(input);
  }
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
//also checks the start/end dates are in correct order
const calculateTime = (start, end, isMilitaryTime) => {
  //sick leave balance conversion:
  let additionalDays = 0;
  if (sickLeave.value < 6) {
    additionalDays = 0;
  } else {
    additionalDays = Math.round(sickLeave.value / 5.8);
  }
  //create DateTime instances from ISO values:
  const startDate = luxon.DateTime.fromISO(start.value);
  const endDate = luxon.DateTime.fromISO(end.value);
  //create Interval instance from the DateTime instances:
  const serviceTime = luxon.Interval.fromDateTimes(startDate, endDate);

  // Check for proper date order using invalid method:
  if (!serviceTime.isValid) {
    // const reason = serviceTime.invalidReason;
    showError(
      end,
      "Please check your dates.  The end date cannot be before your start date"
    );
    // console.log("invalid reason: " + reason);
    return;
  } else {
    resetClass(end);
  }

  const timeObj = serviceTime
    .toDuration(["years", "months", "days"])
    .toObject();
  // Cast to duration:
  let totalDuration;
  //Add one day to the duration to make the dates inclusive
  const duration = luxon.Duration.fromObject(timeObj).plus({ days: 1 });
  const leaveDuration = luxon.Duration.fromObject({ days: additionalDays });

  if (isMilitaryTime) {
    totalDuration = duration;
    militaryDuration = duration;
  } else {
    totalDuration = duration.plus(leaveDuration);
    federalDuration = totalDuration;
  }

  //Normalize the durations:
  const normalizedObject =
    luxon.Duration.fromDurationLike(totalDuration).toObject();
  const normalizedTime = luxon.Duration.fromObject(normalizedObject)
    .normalize()
    .toObject();
  //return the final output:
  return luxon.Duration.fromObject(normalizedTime).toHuman();
};

//function that calculates the total service time when both Federal and
//military dates have been supplied.
const combinedTime = () => {
  //add the duration objects to get a total service time:
  const totalDuration = federalDuration.plus(militaryDuration);

  //Normalize the duration so there are no values of days > 30, months > 12, etc:
  const normalizedObject =
    luxon.Duration.fromDurationLike(totalDuration).toObject();
  const normalizedTime = luxon.Duration.fromObject(normalizedObject)
    .normalize()
    .toObject();
  //String Output:
  return luxon.Duration.fromObject(normalizedTime).toHuman();
};

const servicePercentage = () => {
  const fedTimeObj =
    luxon.Duration.fromDurationLike(federalDuration).toObject();
  const fedNormalizedTime = luxon.Duration.fromObject(fedTimeObj)
    .normalize()
    .toObject();
  const federalYears = fedNormalizedTime.years;
  const federalMonths = fedNormalizedTime.months;
  let milYears = 0;
  let milMonths = 0;
  let fedPercent = 0;
  let milPercent = 0;
  let totalPercent = 0;

  if (milService.value === "true") {
    const milTimeObj =
      luxon.Duration.fromDurationLike(militaryDuration).toObject();
    const milNormalizedTime = luxon.Duration.fromObject(milTimeObj)
      .normalize()
      .toObject();
    milYears = milNormalizedTime.years;
    milMonths = milNormalizedTime.months;
  }
  //1.7% for the first 20 years(unless served less than 20 years). 1% for every year over 20
  //Check SCE employee has MORE than 20 years service, ie, 1.7% category
  if (federalYears < 20) {
    fedPercent = federalYears * 1.0 + (federalMonths / 12) * 1.0;
  } else {
    //need to set values so any time over 20 years is now calculated at 1% and not 1.7%
    const excessYears = federalYears - 20;
    fedPercent = 34.0 + excessYears + federalMonths / 12;
  }

  //Add any military time @ 1% per year
  milPercent = milYears + milMonths / 12;
  totalPercent = fedPercent + milPercent;
  servicePercent = totalPercent.toFixed(2);
  return percentFormat.format(servicePercent * 0.01);
};

const totalAnnuity = (salary, survivorBenefit) => {
  finalAnnuity = salary.value * (servicePercent * 0.01);
  finalAnnuity = finalAnnuity - finalAnnuity * survivorBenefit.value;
  return usCurrency.format(finalAnnuity);
};

const calculateRAS = () => {
  const fedTimeObj =
    luxon.Duration.fromDurationLike(federalDuration).toObject();
  const fedNormalizedTime = luxon.Duration.fromObject(fedTimeObj)
    .normalize()
    .toObject();
  const federalYears = fedNormalizedTime.years;
  const federalMonths = fedNormalizedTime.months;

  let rasFactor = Math.round(federalYears + federalMonths / 12) / 40;
  rasMonthly = usCurrency.format(ssa.value * rasFactor);
  rasAnnual = usCurrency.format(ssa.value * rasFactor * 12);
};

datesButton.addEventListener("click", () => {
  //check for valid retirement age & high-3 salary:
  checkValidInput(retirementAge, "Please enter a valid age");
  if (!foundError) {
    checkValidInput(highThree, "Please enter a valid High 3 salary");
  }
  if (!foundError) {
    //check for valid (including null values) start and end dates:
    checkValidDate(enterOnDate);
  }
  if (!foundError) {
    checkValidDate(retirementDate);
  }

  //Check for null military dates only if the user selected buyback = 'yes'
  if (milService.value === "true") {
    checkValidDate(milStartDate);
    if (!foundError) {
      checkValidDate(milEndDate);
    }
    if (!foundError) {
      //check proper dates order and calculates total service time
      fedServiceTime = calculateTime(enterOnDate, retirementDate, false);
      milServiceTime = calculateTime(milStartDate, milEndDate, true);
      federalTime.innerHTML = fedServiceTime;
      militaryTime.innerHTML = milServiceTime;
      totalServiceTime.innerHTML = combinedTime();
    }
  } else {
    //check proper dates order and calculate total service time
    if (!foundError) {
      fedServiceTime = calculateTime(enterOnDate, retirementDate, false);
      federalTime.innerHTML = fedServiceTime;
      totalServiceTime.innerHTML = fedServiceTime;
    }
  }

  annuityPercent.innerHTML = servicePercentage();
  annuityAmount.innerHTML = totalAnnuity(highThree, survivorBenefit);
  calculateRAS();
  monthlyRAS.innerHTML = rasMonthly;
  annualRAS.innerHTML = rasAnnual;
});
