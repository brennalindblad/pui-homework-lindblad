let rollsInCart = [
  new Roll("Original", "Sugar Milk", "1", 2.49),
  new Roll("Walnut", "Vanilla Milk", "12", 3.49),
  new Roll("Raisin", "Sugar Milk", "3", 2.99),
  new Roll("Apple", "Original", "3", 3.49),
];

function createRoll() {}
function deleteRoll() {}
function displayElement() {}

// function populateCart() {
//   const template = document.querySelector(".cart-item-container");
//   const cartList = document.querySelector(".cart-list");

//   for (let i = 0; i < rollsInCart.length; i++) {
//     const roll = rollsInCart[i];

//     let clone = document.importNode(template.content, true);
//     clone.querySelector(".product-image-shopping-cart").src =
//       "../assets/products/" + rolls[roll.type].imageFile;

//     clone.querySelector(".product-details-shopping-cart").innerHTML =
//       roll.type +
//       " Cinnamon Roll<br>" +
//       "Glazing: " +
//       roll.glazing +
//       "<br>" +
//       "Pack Size: " +
//       roll.size;

//     clone.querySelector(".price-detail-shopping-cart").innerText =
//       "$ " + roll.totalPrice;

//     cartList.appendChild(clone);
//   }
// }

window.onload = function () {
  // populateCart();
  // function removeRoll(roll) {
  //   console.log("removing a roll!");
  //   rollsInCart.pop(roll);
  // }
  // document
  //   .querySelector(".remove-button")
  //   .addEventListener("click", removeRoll);
};
