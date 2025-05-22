'use strict';



/**
 * add event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toogle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);



/**
 * active header & back top btn when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElemOnScroll);



/**
 * filter functionality
 */

const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedBtn = filterBtn[0];

const filter = function () {
  lastClickedBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (filterItems[i].dataset.filter === this.dataset.filterBtn) {
      filterItems[i].style.display = "block";
    } else {
      filterItems[i].style.display = "none";
    }
  }
}

addEventOnElem(filterBtn, "click", filter);

/**
 * quick view functionality
 */

const quickViewBtns = document.querySelectorAll('.action-btn[aria-label="quick view"]');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');

// Create toast notification container
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

// Function to show toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  }, 3000);
}

// Add event listeners to wishlist buttons
const wishlistBtns = document.querySelectorAll('.action-btn[aria-label="add to wishlist"]');
wishlistBtns.forEach(btn => {
  btn.addEventListener('click', function(event) {
    const productCard = event.currentTarget.closest('.product-card');
    const bookTitle = productCard.querySelector('.card-title').textContent;
    showToast(`${bookTitle} added to Favorites successfully`);
  });
});

const openQuickView = function(event) {
  const productCard = event.currentTarget.closest('.product-card');
  const bookImage = productCard.querySelector('.img-cover').src;
  const bookTitle = productCard.querySelector('.card-title').textContent;
  const bookPrice = productCard.querySelector('.card-price').textContent;
  
  document.querySelector('.modal-img').src = bookImage;
  document.querySelector('.modal-book-title').textContent = bookTitle;
  document.querySelector('.modal-book-price').textContent = bookPrice;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

const closeQuickView = function() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

addEventOnElem(quickViewBtns, 'click', openQuickView);
addEventOnElem(closeModal, 'click', closeQuickView);

window.onclick = function(event) {
  if (event.target === modal) {
    closeQuickView();
  }
}
