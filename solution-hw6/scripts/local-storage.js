let rollsInCart = new Set([
  new Roll("Original", "Sugar Milk", "1", 2.49),
  new Roll("Walnut", "Vanilla Milk", "12", 3.49),
  new Roll("Raisin", "Sugar Milk", "3", 2.99),
  new Roll("Apple", "Original", "3", 3.49),
]);

function saveToLocalStorage() {
  const rollCartArray = Array.from(rollsInCart);
  const rollCartArrayString = JSON.stringify(rollCartArray);
  console.log(rollCartArrayString);
  console.log(rollCartArray);
  localStorage.setItem("storedRolls", rollCartArrayString);
  localStorage.getItem("storedRolls");
  console.log(rollCartArray);
}

function retrieveFromLocalStorage() {
  const rollCartArrayString = localStorage.getItem("storedRolls");
  const rollCartArray = JSON.parse(rollCartArrayString);
  rollsInCart = new Set(rollCartArray);
  console.log(rollCartArray);
  console.log("retrieved from local storage! success!!!!!");
}
