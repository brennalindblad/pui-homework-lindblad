const basePrice = 2.49;

// creating array of objects for both glazing and pack size
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

// populate dropdown menu
const selectGlazingTag = document.querySelector("#glazing");
const selectPackSizeTag = document.querySelector("#pack-size");

function populateDropdownGlazing() {
  for (let glazing in allGlazes) {
    let glazingOption = document.createElement("option");
    glazingOption.value = allGlazes[glazing].glazing;
    glazingOption.text = allGlazes[glazing].glazing;
    selectGlazingTag.appendChild(glazingOption);
  }
}

function populateDropdownPackSize() {
  for (let packSize in allPackSizes) {
    let packSizeOption = document.createElement("option");
    packSizeOption.value = allPackSizes[packSize].packSize;
    packSizeOption.text = allPackSizes[packSize].packSize;
    selectPackSizeTag.appendChild(packSizeOption);
  }
}

// updating the total price depending on change of glazing and packsize
// updating UI by changing innerHTML of total price
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

// Populate glazing and pack size dropdowns
// should change the UI
// calculates the initial price
window.onload = function () {
  populateDropdownGlazing();
  populateDropdownPackSize();

  updatePrice();
};
