//Retirement Dates => calculate total federal service time
let enterOnDate = document.querySelector("#enterOnDate");
let retirementDate = document.querySelector("#retirementDate");
let milStartDate = document.querySelector("#milStartDate");
let milEndDate = document.querySelector("#milEndDate");

let startDate;
let retireDate;
let retirementDays;

enterOnDate.addEventListener("change", () => {
  startDate = formatDate(enterOnDate.value);
});

retirementDate.addEventListener("change", () => {
  retireDate = formatDate(retirementDate.value);
  retirementDays = serviceTime(startDate, retireDate);
  console.log(retirementDays);
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

//Calculate the difference between two dates:
const serviceTime = (date1, date2) => {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24) + 1;
  return daysDifference;
};

function formatDate(inputDate) {
  //Must use UTC values to fix being off by one day:
  const workingDate = new Date(inputDate);
  const day = workingDate.getUTCDate();
  const month = workingDate.getUTCMonth() + 1;
  const year = workingDate.getUTCFullYear();
  return month + "/" + day + "/" + year;
}
