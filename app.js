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

import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');

let allProducts = []; // Store all fetched products here

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

function renderProducts(products) {
  productList.innerHTML = '';

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

window.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

import { db } from './firebase-config.js';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');

const productModal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');
const productImagesInput = document.getElementById('productImages');
const productIdInput = document.getElementById('productId');
const cancelBtn = document.getElementById('cancelBtn');
const addProductBtn = document.getElementById('addProductBtn');

let allProducts = [];

async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    allProducts = [];
    querySnapshot.forEach((docSnap) => {
      allProducts.push({ id: docSnap.id, ...docSnap.data() });
    });
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function renderProducts(products) {
  productList.innerHTML = '';

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

    // Edit button
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.classList.add('btn', 'btn-edit');
    btnEdit.addEventListener('click', () => openEditModal(product));

    // Delete button
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.classList.add('btn', 'btn-delete');
    btnDelete.addEventListener('click', () => deleteProduct(product.id));

    card.appendChild(carousel);
    card.appendChild(name);
    card.appendChild(btnTakeOut);
    card.appendChild(btnRestore);
    card.appendChild(btnEdit);
    card.appendChild(btnDelete);

    productList.appendChild(card);
  });
}

function openAddModal() {
  modalTitle.textContent = 'Add Product';
  productNameInput.value = '';
  productImagesInput.value = '';
  productIdInput.value = '';
  productModal.style.display = 'flex';
}

function openEditModal(product) {
  modalTitle.textContent = 'Edit Product';
  productNameInput.value = product.name;
  productImagesInput.value = product.images;
  productIdInput.value = product.id;
  productModal.style.display = 'flex';
}

cancelBtn.addEventListener('click', () => {
  productModal.style.display = 'none';
});

productForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = productNameInput.value.trim();
  const images = productImagesInput.value.trim();
  const id = productIdInput.value;

  if (!name || !images) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    if (id) {
      // Update product
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, { name, images });
      alert('Product updated successfully.');
    } else {
      // Add new product
      await addDoc(collection(db, "products"), { name, images });
      alert('Product added successfully.');
    }
    productModal.style.display = 'none';
    loadProducts(); // Reload to update UI
  } catch (error) {
    console.error('Error saving product:', error);
    alert('Failed to save product.');
  }
});

async function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      const docRef = doc(db, "products", id);
      await deleteDoc(docRef);
      alert('Product deleted successfully.');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  }
}

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

addProductBtn.addEventListener('click', openAddModal);

window.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
