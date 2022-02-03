import product from "./product.js";

const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");
const numberOfItems = document.querySelector(".numberOfItems");
const modal = document.querySelector(".cart-modal");
const modalList = document.querySelector(".cart-list");
const emptyCart = document.querySelector(".empty-cart");
const addToCartBtn = document.querySelector(".addToCart-btn");
const notificationNr = document.querySelector(".notification-nr");
const cart = document.querySelector(".cart");
const notificationPop = document.querySelector(".notification");
const backdrop = document.querySelector(".backdrop");
const lightBoxModal = document.querySelector(".lightbox-modal");
const closeBtn = document.querySelector(".close-img-modal");
const previousBtn = document.querySelector(".previous-btn");
const nextBtn = document.querySelector(".next-btn");
const checkoutBtn = document.querySelector(".checkout");
const checkoutPopup = document.querySelector(".checkout-popup");
const popupCloseBtn = document.querySelector(".close-checkout-popup");
const navList = document.querySelector(".nav-ul");
const mobPreviousBtn = document.querySelector(".mobile-previous-btn");
const mobNextBtn = document.querySelector(".mobile-next-btn");

let modalIsClosed = true;

function openModal() {
  if (modalIsClosed) {
    modal.style.display = "block";
    modalIsClosed = false;
  } else {
    modal.style.display = "none";
    modalIsClosed = true;
  }
}

cart.addEventListener("click", openModal);

document.addEventListener("click", (event) => {
  if (
    !modalIsClosed &&
    !event.target.closest(".cart-modal") &&
    !event.target.closest(".cart") &&
    !event.target.closest(".cart-delete-btn")
  ) {
    modal.style.display = "none";
    modalIsClosed = true;
  } else {
    return;
  }
});

let number = 0;
let cartNumber = 0;
updateItems();
function updateItems() {
  numberOfItems.innerText = number;
  if (cartNumber == 0) {
    emptyCart.style.display = "block";
  } else {
    emptyCart.style.display = "none";
  }
}
plusBtn.addEventListener("click", () => {
  number++;
  updateItems();
});

minusBtn.addEventListener("click", () => {
  if (number > 0) number--;
  updateItems();
});

// Creating a new list-item for modal

function createListItem() {
  let li = document.createElement("li");
  li.classList.add("product-list-item");

  let img = document.createElement("img");
  img.classList.add("cart-product-thumbnail");
  img.src = "images/image-product-1-thumbnail.jpg";

  let divText = document.createElement("div");
  divText.classList.add("cart-product-text");

  let pTitle = document.createElement("p");
  pTitle.classList.add("cart-product-title");
  let nodeTitle = document.createTextNode(product.title);
  pTitle.appendChild(nodeTitle);

  let divPrice = document.createElement("div");
  divPrice.classList.add("cart-product-price");

  let spanCurrent = document.createElement("span");
  spanCurrent.appendChild(
    document.createTextNode("$" + product.currentPrice + " x ")
  );
  spanCurrent.classList.add("current-price");

  let spanNrProducts = document.createElement("span");
  spanNrProducts.appendChild(document.createTextNode(cartNumber + " "));
  spanNrProducts.classList.add("number-of-products");

  let spanTotalPrice = document.createElement("span");
  spanTotalPrice.appendChild(
    document.createTextNode(
      " $" + (cartNumber * product.currentPrice).toFixed(2)
    )
  );
  spanTotalPrice.classList.add("total-price");

  divPrice.appendChild(spanCurrent);
  divPrice.appendChild(spanNrProducts);
  divPrice.appendChild(spanTotalPrice);

  divText.appendChild(pTitle);
  divText.appendChild(divPrice);

  let btnDel = document.createElement("button");

  btnDel.classList.add("cart-delete-btn");

  let imgDel = document.createElement("img");
  imgDel.src = "images/icon-delete.svg";

  btnDel.appendChild(imgDel);
  btnDel.addEventListener("click", () => {
    li.remove();
    cartIsEmpty = true;
    cartNumber = 0;
    notificationNr.innerText = cartNumber;
    updateItems();
    if (cartNumber == 0) {
      notificationPop.style.display = "none";
      checkoutBtn.style.display = "none";
    }
  });
  checkoutBtn.addEventListener("click", () => {
    li.remove();
    cartIsEmpty = true;
    cartNumber = 0;
    notificationNr.innerText = cartNumber;
    updateItems();
    if (cartNumber == 0) {
      notificationPop.style.display = "none";
      checkoutBtn.style.display = "none";
      checkoutPopup.style.display = "block";
      backdrop.style.display = "block";
    }
  });

  li.appendChild(img);
  li.appendChild(divText);
  li.appendChild(btnDel);
  li.style.marginBottom = "0.3rem";

  modalList.appendChild(li);
  cartIsEmpty = false;
  notificationNr.innerText = cartNumber;
}

let cartIsEmpty = true;
addToCartBtn.addEventListener("click", function updateCart() {
  if (cartIsEmpty && number != 0) {
    cartNumber = number;
    createListItem();
    number = 0;
    updateItems();
    if (cartNumber != 0) notificationPop.style.display = "block";
    checkoutBtn.style.display = "block";
  } else {
    let numberOfProducts = document.querySelector(".number-of-products");
    let totalPrice = document.querySelector(".total-price");

    cartNumber += number;
    if (number != 0) {
      numberOfProducts.innerText = cartNumber;
      totalPrice.innerText =
        " $" + (cartNumber * product.currentPrice).toFixed(2);
      notificationNr.innerText = cartNumber;
    }
    number = 0;
    updateItems();
  }
});

//LIGHTBOX

const thumbnails = [...document.querySelectorAll(".product-thumbnail")];
const mainImg = document.querySelector(".product-main");

const srcURLs = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("click", () => {
    mainImg.src = srcURLs[i];
    thumbnails.forEach((object) => (object.style.opacity = "1"));
    thumbnails[i].style.opacity = "0.5";
    index = i;
  });
}

const lightboxThumbnails = [
  ...document.querySelectorAll(".lightbox-thumbnail"),
];

const lightboxImg = document.querySelector(".lightbox-img");

for (let i = 0; i < lightboxThumbnails.length; i++) {
  lightboxThumbnails[i].addEventListener("click", () => {
    lightboxImg.src = srcURLs[i];
    index = i;
  });
}

const openImageModal = () => {
  if (window.innerWidth > 650) {
    lightboxImg.src = mainImg.src;
    lightBoxModal.style.display = "block";
    backdrop.style.display = "block";
  }
};

const closeImageModal = () => {
  lightBoxModal.style.display = "none";
  backdrop.style.display = "none";
};

mainImg.addEventListener("click", openImageModal);
backdrop.addEventListener("click", closeImageModal);
closeBtn.addEventListener("click", closeImageModal);
backdrop.addEventListener("click", () => {
  checkoutPopup.style.display = "none";
  backdrop.style.display = "none";
});
popupCloseBtn.addEventListener("click", () => {
  checkoutPopup.style.display = "none";
  backdrop.style.display = "none";
});

let index = 0;

previousBtn.addEventListener("click", () => {
  if (index > 0 && index < 4) {
    index--;
    lightboxImg.src = srcURLs[index];
  }
});

nextBtn.addEventListener("click", () => {
  if (index >= 0 && index < 3) {
    index++;
    lightboxImg.src = srcURLs[index];
  }
});

mobPreviousBtn.addEventListener("click", () => {
  if (index > 0 && index < 4) {
    index--;
    mainImg.src = srcURLs[index];
  }
});

mobNextBtn.addEventListener("click", () => {
  if (index >= 0 && index < 3) {
    index++;
    mainImg.src = srcURLs[index];
  }
});

// Hamburger Menu

const menuBtn = document.querySelector(".menuBtn");
const closeNavBtn = document.querySelector(".nav-close-btn");
const modalNavList = document.querySelector(".modal-nav-ul");

menuBtn.addEventListener("click", () => {
  modalNavList.style.display = "flex";
});

closeNavBtn.addEventListener("click", () => {
  modalNavList.style.display = "none";
});

document.addEventListener("onload", () => {
  mainImg.src = srcURLs[0];
});
