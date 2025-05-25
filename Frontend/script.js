document.addEventListener("DOMContentLoaded", function() {
    // Load stored products or set default empty array
    let products = JSON.parse(localStorage.getItem("products")) || [];

    const productContainer = document.getElementById("product-container");

    // Function to display products
    function displayProducts() {
        productContainer.innerHTML = "";
        products.forEach((product, index) => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.imageUrl}" alt="Product Image">
                <h2>${product.title}</h2>
                <button class="take-out">Take Out</button>
                <button class="restore">Restore</button>
            `;

            // Take Out Button
            card.querySelector(".take-out").addEventListener("click", function() {
                if (confirm("Are you sure you want to take this out?")) {
                    products.splice(index, 1);  // Remove product from array
                    localStorage.setItem("products", JSON.stringify(products)); // Update storage
                    displayProducts(); // Refresh UI
                }
            });

            // Restore Button (re-add a sample item)
            card.querySelector(".restore").addEventListener("click", function() {
                if (confirm("Are you sure you want to restore it?")) {
                    products.push(product);
                    localStorage.setItem("products", JSON.stringify(products));
                    displayProducts();
                }
            });

            productContainer.appendChild(card);
        });
    }

    // Initial display
    displayProducts();

    // Search functionality
    document.getElementById("search-bar").addEventListener("input", function(event) {
        let searchValue = event.target.value.toLowerCase();
        productContainer.innerHTML = "";
        products
            .filter(product => product.title.toLowerCase().includes(searchValue))
            .forEach((filteredProduct) => {
                const card = document.createElement("div");
                card.classList.add("product-card");

                card.innerHTML = `
                    <img src="${filteredProduct.imageUrl}" alt="Product Image">
                    <h2>${filteredProduct.title}</h2>
                    <button class="take-out">Take Out</button>
                    <button class="restore">Restore</button>
                `;

                productContainer.appendChild(card);
            });
    });

    // Add a new product (sample)
    document.getElementById("add-product-btn").addEventListener("click", function() {
        const title = prompt("Enter Product Title:");
        const imageUrl = prompt("Enter Image URL:");
        if (title && imageUrl) {
            products.push({ title, imageUrl });
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();
        }
    });
});
