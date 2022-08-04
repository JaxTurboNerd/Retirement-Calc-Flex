//Retirement Dates => calculate total federal service time
let enterOnDate = document.querySelector("#enterOnDate");
let retirementDate = document.querySelector("#retirementDate");
let milStartDate = document.querySelector("#milStartDate");
let milEndDate = document.querySelector("#milEndDate");
let milService = document.querySelector("#milBuyback");
let datesButton = document.querySelector("#datesBtn");
let federalTime = document.querySelector(".federal-time");
let federalPercent = document.querySelector(".federal-percent");
let militaryTime = document.querySelector(".mil__time__results");
let totalServiceTime = document.querySelector(".total__time");
let sickLeave = document.querySelector("#sickLeave");

//Variables declarations:
let foundError = false;
let computedFedTime = "";
let federalDuration;
let militaryDuration;
let computedFedPercent = "";

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

datesButton.addEventListener("click", () => {
  //check for valid (including null values) start and end dates:
  checkValidDate(enterOnDate);
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
      federalTime.innerHTML = calculateTime(enterOnDate, retirementDate, false);
      militaryTime.innerHTML = calculateTime(milStartDate, milEndDate, true);
      totalServiceTime.innerHTML = combinedTime();
    }
  } else {
    //check proper dates order and calculate total service time
    if (!foundError) {
      computedFedTime = calculateTime(enterOnDate, retirementDate, false);
      federalTime.innerHTML = computedFedTime;
      totalServiceTime.innerHTML = computedFedTime;
    }
  }
});
