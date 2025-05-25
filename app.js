import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Get all products from Firestore
async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const productList = document.getElementById('productList');

async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function renderProducts(products) {
  productList.innerHTML = ''; // Clear previous

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const carousel = document.createElement('div');
    carousel.classList.add('product-carousel');

    const imageUrls = product.images ? product.images.split(',') : [];

    imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url.trim();
      img.alt = product.name;
      carousel.appendChild(img);
    });

    const name = document.createElement('h3');
    name.textContent = product.name;

    const btnTakeOut = document.createElement('button');
    btnTakeOut.textContent = 'Take Out';
    btnTakeOut.classList.add('btn', 'btn-takeout');
    btnTakeOut.addEventListener('click', () => {
      alert(`Product "${product.name}" is taken out successfully.`);
    });

    const btnRestore = document.createElement('button');
    btnRestore.textContent = 'Restore to this state';
    btnRestore.classList.add('btn', 'btn-restore');
    btnRestore.addEventListener('click', () => {
      alert(`Product "${product.name}" is restored successfully.`);
    });

    card.appendChild(carousel);
    card.appendChild(name);
    card.appendChild(btnTakeOut);
    card.appendChild(btnRestore);

    productList.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

let allProducts = []; // To store all fetched products

async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    allProducts = [];
    querySnapshot.forEach((doc) => {
      allProducts.push(doc.data());
    });
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  }
});
