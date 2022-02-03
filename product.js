class Product {
  constructor() {
    this.title = "Fall Limited Edition Sneakers";
    this.price = 250;
    this.discount = 50;
    this.currentPrice = ((this.price * this.discount) / 100).toFixed(2);
    this.img = productImage;
  }
}
const productImage = new Image();
productImage.src = "images/image-product-1-thumbnail.jpg";

const product = new Product();

export default product;
