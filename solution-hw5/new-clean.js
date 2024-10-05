//dictionary
//objects (glaze and pack)
//class - initialize, calculate price
//create new set
//add roll to set
//create objects
//create elements (template nodes) + update elements
//remove elements
//update total price

const rollsInCart = new Set([
  new Roll("Original", "Sugar Milk", "1", 2.49),
  new Roll("Walnut", "Vanilla Milk", "12", 3.49),
  new Roll("Raisin", "Sugar Milk", "3", 2.99),
  new Roll("Apple", "Original", "3", 3.49),
]);

function loadCart(roll) {
  // cloning the template
  const template = document.querySelector("#cart-item-container");
  const clone = template.content.cloneNode(true);

  clone.querySelector(".product-image-shopping-cart").src =
    "../assets/products/" + rolls[roll.type].imageFile;

  clone.querySelector(".product-details-shopping-cart").innerHTML =
    roll.type +
    " Cinnamon Roll<br>" +
    "Glazing: " +
    roll.glazing +
    "<br>" +
    "Pack Size: " +
    roll.size;

  clone.querySelector(".price-detail-shopping-cart").innerText =
    "$ " + roll.totalPrice.toFixed(2);

  roll.element = clone.querySelector(".cart-item");
  const removeButton = clone.querySelector(".remove-button");
  removeButton.addEventListener("click", () => {
    return removeRoll(roll);
  });

  const cartList = document.querySelector(".cart-list");
  cartList.appendChild(clone);
}

function removeRoll(roll) {
  roll.element.remove();
  rollsInCart.delete(roll);
  updateTotal();
}

function updateTotal() {
  const cartTotal = document.querySelector(".cart-total");
  let price = 0;
  for (const roll of rollsInCart) {
    price = price + roll.totalPrice;
  }
  cartTotal.innerText = "$ " + price.toFixed(2);
}

window.onload = function () {
  for (const roll of rollsInCart) {
    loadCart(roll);
  }
  updateTotal();
};
