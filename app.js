let products = [
    {
        id: 1,
        name: "Product 1",
        images: ["image1.jpg", "image2.jpg"],
        currentImageIndex: 0,
        isTakenOut: false
    },
    {
        id: 2,
        name: "Product 2",
        images: ["image3.jpg", "image4.jpg"],
        currentImageIndex: 0,
        isTakenOut: false
    }
];

// Function to display products dynamically
function displayProducts() {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; // Clear existing content

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-card");

        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img id="image-${product.id}" src="${product.images[product.currentImageIndex]}" alt="${product.name}">
            <br>
            <button onclick="showNextImage(${product.id})">Next Image</button>
            <button onclick="toggleProductState(${product.id})">
                ${product.isTakenOut ? "Restore to this state" : "Take out"}
            </button>
        `;
        
        container.appendChild(productDiv);
    });
}

// Function to toggle product state
function toggleProductState(productId) {
    const product = products.find(p => p.id === productId);
    product.isTakenOut = !product.isTakenOut;
    displayProducts();
}

// Function to show next image
function showNextImage(productId) {
    const product = products.find(p => p.id === productId);
    product.currentImageIndex = (product.currentImageIndex + 1) % product.images.length;
    document.getElementById(`image-${productId}`).src = product.images[product.currentImageIndex];
}

// Function to search products
function searchProducts() {
    let searchValue = document.getElementById("searchBox").value.toLowerCase();
    products.forEach(product => {
        const productCard = document.querySelector(`#image-${product.id}`).parentElement;
        productCard.style.display = product.name.toLowerCase().includes(searchValue) ? "block" : "none";
    });
}

// Load initial products
window.onload = displayProducts;
