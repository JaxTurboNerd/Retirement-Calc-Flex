// get Military Buyback value:
let milBuyback = document.querySelector("#milBuyback");
let milDateElements = document.getElementsByClassName("military-dates");

let milAnswer = milBuyback.value;
console.log(milAnswer);

// if user selects Miltary Buyback option => yes then display the military dates div
if (milAnswer) {
  // not working!!
  milDateElements.style.display = "block";
}
