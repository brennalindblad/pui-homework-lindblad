let basePrice;
let cart = [];
let newRoll;
let rollType;

// creates array of objects for both glazing and pack size
let allGlazes = [
  {
    glazing: "Original",
    glazingPrice: 0,
  },
  {
    glazing: "Sugar Milk",
    glazingPrice: 0,
  },
  {
    glazing: "Vanilla Milk",
    glazingPrice: 0.5,
  },
  {
    glazing: "Double Chocolate",
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

function updatePrice() {
  let selectedGlaze = document.querySelector("#glazing").value;
  let selectedPackSize = document.querySelector("#pack-size").value;

  newRoll = new Roll(
    rollType,
    selectedGlaze,
    selectedPackSize,
    basePrice,
    totalPrice
  );

  let totalPrice = newRoll.calculatePrice();

  let displayedPrice = (document.querySelector(
    "#total-price"
  ).innerText = `$${totalPrice}`);
}

// updates the total price depending on change of glazing and packsize
// updates UI by changing innerHTML of total price
// citing: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// citing: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value

class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice, totalPrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
    this.totalPrice = this.calculatePrice();
    this.element = null;
  }

  calculatePrice() {
    let glazePrice = allGlazes.find(
      (glaze) => glaze.glazing === this.glazing
    ).glazingPrice;
    let packSizePrice = allPackSizes.find(
      (pack) => pack.packSize === this.size
    ).packSizePrice;
    return ((this.basePrice + glazePrice) * packSizePrice).toFixed(2);
  }
}

window.onload = function () {
  // getting selected glazing option and pack size option
  let selectGlazingTag = document.querySelector("#glazing");
  let selectPackSizeTag = document.querySelector("#pack-size");

  // for loop populates glazing dropdown menu, for each glazing in allGlazes object, it creates an option in the select tag and gives it the value and text from each object
  function populateDropdownGlazing() {
    for (let glazing in allGlazes) {
      var glazingOption = document.createElement("option");
      glazingOption.value = allGlazes[glazing].glazing;
      glazingOption.text = allGlazes[glazing].glazing;
      selectGlazingTag.add(glazingOption);
    }
  }

  // for loop populates pack size dropdown menu, for each packsize in allPackSizes object, it creates an option in the select tag and gives it the value and text from each object
  function populateDropdownPackSize() {
    for (let packSize in allPackSizes) {
      let packSizeOption = document.createElement("option");
      packSizeOption.value = allPackSizes[packSize].packSize;
      packSizeOption.text = allPackSizes[packSize].packSize;
      selectPackSizeTag.add(packSizeOption);
    }
  }

  populateDropdownGlazing();
  populateDropdownPackSize();

  updatePrice();
  const queryString = window.location.search; // gets text after ?
  const params = new URLSearchParams(queryString); // getting roll value
  rollType = params.get("roll");

  // updating header text product detail page
  const headerElement = document.querySelector("#roll-header");
  headerElement.innerText = rollType + " Cinnamon Roll";

  // updates image product detail page
  const rollImage = document.querySelector("#product-image-product-detail");
  rollImage.src = "../assets/products/" + rolls[rollType].imageFile;
  console.log(rollImage.src);
  basePrice = rolls[rollType].basePrice;
  updatePrice();

  document
    .querySelector(".add-to-cart-button")
    .addEventListener("click", function () {
      cart.push(newRoll);
      console.log(cart);
    });
};
