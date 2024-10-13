// //dictionary
// //objects (glaze and pack)
// //class - initialize, calculate price
// //create new set
// //add roll to set
// //create objects
// //create elements (template nodes) + update elements
// //remove elements
// //update total price

// const rollsInCart = new Set([
//   new Roll("Original", "Sugar Milk", "1", 2.49),
//   new Roll("Walnut", "Vanilla Milk", "12", 3.49),
//   new Roll("Raisin", "Sugar Milk", "3", 2.99),
//   new Roll("Apple", "Original", "3", 3.49),
// ]);

// function updateElement(roll) {
//   const rollImageElement = roll.element.querySelector(
//     ".product-image-shopping-cart"
//   );
//   const rollDescriptionElement = roll.element.querySelector(
//     ".product-details-shopping-cart"
//   );
//   const rollPriceElement = roll.element.querySelector(
//     ".price-detail-shopping-cart"
//   );

//   rollImageElement.src = "../assets/products/" + rolls[roll.type].imageFile;
//   rollDescriptionElement.innerHTML =
//     roll.type +
//     " Cinnamon Roll<br>" +
//     "Glazing: " +
//     roll.glazing +
//     "<br>" +
//     "Pack Size: " +
//     roll.size;
//   rollPriceElement.innerText = "$ " + roll.totalPrice;
// }

// function createElement(roll) {
//   const template = document.querySelector(".cart-item-container");
//   const clone = template.content.cloneNode(true);
//   roll.element = clone.querySelector(".cart-list");

//   const rollsInCartElement = document.querySelector(".shopping-cart");
//   rollsInCartElement.app(roll.element);

//   updateElement(roll);
// }

// for (const roll of rollsInCart) {
//   console.log(roll);
//   createElement(roll);
// }

// // function populateCart() {
// //   const template = document.querySelector(".cart-item-container");
// //   const cartList = document.querySelector(".cart-list");

// //   for (let i = 0; i < rollsInCart.length; i++) {
// //     const roll = rollsInCart[i];

// //     let clone = document.importNode(template.content, true);
// //     clone.querySelector(".product-image-shopping-cart").src =
// //       "../assets/products/" + rolls[roll.type].imageFile;

// //     clone.querySelector(".product-details-shopping-cart").innerHTML =
// //       roll.type +
// //       " Cinnamon Roll<br>" +
// //       "Glazing: " +
// //       roll.glazing +
// //       "<br>" +
// //       "Pack Size: " +
// //       roll.size;

// //     clone.querySelector(".price-detail-shopping-cart").innerText =
// //       "$ " + roll.totalPrice;

// //     cartList.appendChild(clone);
// //   }
// // }

// window.onload = function () {
//   // populateCart();

//   function removeRoll(Roll) {
//     // console.log("removing a roll!");
//     // // Roll.element.remove();
//     // rollsInCart.pop(rollsInCart.Roll);
//   }

//   document
//     .querySelector(".remove-button")
//     .addEventListener("click", removeRoll);
// };
