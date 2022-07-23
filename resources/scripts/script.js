// get Military Buyback value:
let milBuyback = document.querySelector("#milBuyback");
let milDateElements = document.querySelector(".military-dates");
let firstName = document.querySelector("#firstName");
let buybackAnswer = milBuyback.value;

console.log(buybackAnswer);

//Show Military dates if the user selects buyback option "yes"
milBuyback.addEventListener("change", function (event) {
  let selected = event.target.value;
  console.log(selected);
  if (selected) {
    milDateElements.style.display = "block";
  } else {
    milDateElements.style.display = "none";
  }
});

firstName.addEventListener("input", () => {
  console.log(firstName.value);
});

//Create array of all the input elements, add evetlistener and style when focused:
const inputElements = document.getElementsByTagName("input");
for (let i = 0; i < inputElements.length; i++) {
  inputElements[i].addEventListener("focus", (e) => {
    e.target.style.backgroundColor = "lightgray";
  });
  //return background color to original state:
  inputElements[i].addEventListener("focusout", (e) => {
    e.target.style.backgroundColor = "white";
  });
}
