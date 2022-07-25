// Military Buyback value to display/hide Military buyback dates:
let milBuyback = document.querySelector("#milBuyback");
let milDateElements = document.querySelector(".military-dates");

//Show Military dates if the user selects buyback option "yes"
milBuyback.addEventListener("change", (event) => {
  let boughtBack = event.target.value;
  console.log(boughtBack);
  if (boughtBack) {
    milDateElements.style.display = "block";
  } else {
    milDateElements.style.display = "none";
  }
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

