const basePrice = 2.49;

// creates array of objects for both glazing and pack size
let allGlazes = [
  {
    glazing: "Keep original",
    glazingPrice: 0,
  },
  {
    glazing: "Sugar milk",
    glazingPrice: 0,
  },
  {
    glazing: "Vanilla milk",
    glazingPrice: 0.5,
  },
  {
    glazing: "Double chocolate",
    glazingPrice: 1.5,
  },
];

let allPackSizes = [
  {
    packSize: "1",
    packSizePrice: 1,
  },
  {
    packSize: "3",
    packSizePrice: 3,
  },
  {
    packSize: "6",
    packSizePrice: 5,
  },
  {
    packSize: "12",
    packSizePrice: 10,
  },
];

// getting selected glazing option and pack size option
const selectGlazingTag = document.querySelector("#glazing");
const selectPackSizeTag = document.querySelector("#pack-size");

// for loop populates glazing dropdown menu, for each glazing in allGlazes object, it creates an option in the select tag and gives it the value and text from each object
function populateDropdownGlazing() {
  for (let glazing in allGlazes) {
    let glazingOption = document.createElement("option");
    glazingOption.value = allGlazes[glazing].glazing;
    glazingOption.text = allGlazes[glazing].glazing;
    selectGlazingTag.appendChild(glazingOption);
  }
}

// for loop populates pack size dropdown menu, for each packsize in allPackSizes object, it creates an option in the select tag and gives it the value and text from each object
function populateDropdownPackSize() {
  for (let packSize in allPackSizes) {
    let packSizeOption = document.createElement("option");
    packSizeOption.value = allPackSizes[packSize].packSize;
    packSizeOption.text = allPackSizes[packSize].packSize;
    selectPackSizeTag.appendChild(packSizeOption);
  }
}

// updates the total price depending on change of glazing and packsize
// updates UI by changing innerHTML of total price
// citing: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// citing: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
function updatePrice() {
  const selectedGlaze = document.querySelector("#glazing").value;
  const selectedPackSize = document.querySelector("#pack-size").value;

  let priceChangeGlazing = allGlazes.find(
    (glazing) => glazing.glazing === selectedGlaze
  ).glazingPrice;

  let priceChangePackSize = allPackSizes.find(
    (packSize) => packSize.packSize === selectedPackSize
  ).packSizePrice;

  const totalPrice = (
    (basePrice + priceChangeGlazing) *
    priceChangePackSize
  ).toFixed(2);

  document.querySelector("#total-price").innerText = `$${totalPrice}`;
}

window.onload = function () {
  populateDropdownGlazing();
  populateDropdownPackSize();

  updatePrice();
};
