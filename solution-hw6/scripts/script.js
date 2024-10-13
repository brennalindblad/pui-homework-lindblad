let cart = [];
let newRoll;
let rollType;

class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
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
    return (this.basePrice + glazePrice) * packSizePrice;
  }
}

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
