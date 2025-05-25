document.addEventListener("DOMContentLoaded", function() {
    // Sample product data (later this can be fetched from Java backend)
    const products = [
        { title: "Product 1", imageUrl: "https://via.placeholder.com/150" },
        { title: "Product 2", imageUrl: "https://via.placeholder.com/150" },
        { title: "Product 3", imageUrl: "https://via.placeholder.com/150" }
    ];

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

            // Add event listeners for Take Out & Restore buttons
            card.querySelector(".take-out").addEventListener("click", function() {
                if (confirm("Are you sure you want to take this out?")) {
                    alert(product.title + " has been taken out!");
                }
            });

            card.querySelector(".restore").addEventListener("click", function() {
                if (confirm("Are you sure you want to restore it?")) {
                    alert(product.title + " has been restored!");
                }
            });

            productContainer.appendChild(card);
        });
    }

    // Call function to display initial products
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
});
