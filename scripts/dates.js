

//Retirement Dates => calculate total federal service time
let enterOnDate = document.querySelector("#enterOnDate");
let retirementDate = document.querySelector("#retirementDate");
let milStartDate = document.querySelector("#milStartDate");
let milEndDate = document.querySelector("#milEndDate");

let startDate;
let retireDate;
let retirementDays;
let luxonStartDate;
let luxonEndDate;

enterOnDate.addEventListener("change", () => {
  startDate = formatDate(enterOnDate.value);
  luxonStartDate = luxon.DateTime.fromISO(enterOnDate.value);
});

retirementDate.addEventListener("change", () => {
  retireDate = formatDate(retirementDate.value);
  luxonEndDate = luxon.DateTime.fromISO(retirementDate.value);
  retirementDays = serviceTime(startDate, retireDate);
  // console.log(retirementDays);
  console.log(luxServiceTime(luxonStartDate, luxonEndDate));
});

milStartDate.addEventListener("change", () => {
  let milStart = formatDate(milStartDate.value);
  console.log(milStart);
  //Add other code:
});

milEndDate.addEventListener("change", () => {
  let milEnd = formatDate(milEndDate.value);
  console.log(milEnd);
  //add other code:
});

//Calculate the difference in DAYS between two dates: (vanilla js)
const serviceTime = (date1, date2) => {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const timeDifference = endDate.getTime() - startDate.getTime();
  const totalServiceDays = timeDifference / (1000 * 60 * 60 * 24) + 1;
  // console.log(totalServiceDays);
  let years = Math.floor(totalServiceDays / 365);
  let daysRemainder = totalServiceDays % 365;
  // console.log("remaining days: " + daysRemainder);
  let serviceComputation = "years: " + years + " days:" + daysRemainder;
  return serviceComputation;
};

//Date formatter - vanilla js
function formatDate(inputDate) {
  //Must use UTC values to fix being off by one day:
  const workingDate = new Date(inputDate);
  const day = workingDate.getUTCDate();
  const month = workingDate.getUTCMonth() + 1;
  const year = workingDate.getUTCFullYear();
  return month + "/" + day + "/" + year;
}

//Luxon Library functions:
const luxServiceTime = (start, end) => {
  const time = luxon.Interval.fromDateTimes(start, end);
  const objTime = time.toDuration(["years", "months", "days"]).toObject();
  const stringTime =
    objTime.years +
    " years, " +
    objTime.months +
    " months, " +
    (objTime.days + 1) +
    " days";
  return stringTime;
};
