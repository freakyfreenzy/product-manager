const products = [];

function addProduct() {
    const name = prompt("Enter product name:");
    if (!name) return;

    const images = [];
    for (let i = 0; i < 3; i++) {
        const imgUrl = prompt(`Enter image URL ${i + 1}:`);
        if (imgUrl) images.push(imgUrl);
    }

    const product = { name, images, currentImageIndex: 0 };
    products.push(product);
    renderProducts();
}

function renderProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const img = document.createElement("img");
        img.src = product.images[product.currentImageIndex];
        productDiv.appendChild(img);

        const carouselDiv = document.createElement("div");
        carouselDiv.classList.add("carousel");

        const prevBtn = document.createElement("button");
        prevBtn.innerText = "<";
        prevBtn.onclick = () => {
            product.currentImageIndex = (product.currentImageIndex - 1 + product.images.length) % product.images.length;
            renderProducts();
        };

        const nextBtn = document.createElement("button");
        nextBtn.innerText = ">";
        nextBtn.onclick = () => {
            product.currentImageIndex = (product.currentImageIndex + 1) % product.images.length;
            renderProducts();
        };

        carouselDiv.appendChild(prevBtn);
        carouselDiv.appendChild(nextBtn);
        productDiv.appendChild(carouselDiv);

        const nameDiv = document.createElement("div");
        nameDiv.innerText = product.name;
        productDiv.appendChild(nameDiv);

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("product-buttons");

        const takeOutBtn = document.createElement("button");
        takeOutBtn.innerText = "Take out";
        takeOutBtn.onclick = () => alert("Are you sure you want to take out this product?");
        
        const restoreBtn = document.createElement("button");
        restoreBtn.innerText = "Restore to this state";
        restoreBtn.onclick = () => alert("Are you sure you want to restore to this state?");
        
        btnDiv.appendChild(takeOutBtn);
        btnDiv.appendChild(restoreBtn);
        productDiv.appendChild(btnDiv);

        productList.appendChild(productDiv);
    });
}

document.getElementById("searchInput").addEventListener("input", function() {
    const searchText = this.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchText));
    
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    filteredProducts.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const img = document.createElement("img");
        img.src = product.images[product.currentImageIndex];
        productDiv.appendChild(img);

        const nameDiv = document.createElement("div");
        nameDiv.innerText = product.name;
        productDiv.appendChild(nameDiv);

        productList.appendChild(productDiv);
    });
});

renderProducts();
