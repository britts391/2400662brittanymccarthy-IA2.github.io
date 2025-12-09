/* 
Name: T'shara Shaw, 
Class: Friday UE2 7-9pm
Question 2
Product Catalogue:
Product List (Using Arrays & Objects)
Create an array of product objects in JavaScript. Each product should have:
`name`
`price`
`description`
`image`
An updated product list must be kept on localStorage, as AllProducts. 
Display the product list dynamically on the website. 
Each product should have an “Add to Cart” button.

*/

// Load products from localStorage and display them
function loadProducts() {
    initializeProducts();
    
    // Get products from localStorage
    const products = getAllProducts();
    const productsContainer = document.getElementById("productsContainer");
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products available. Please check back later.</p>';
        return;
    }
    
    // Display all products
    displayProducts(products);
}

// Display products in the grid
function displayProducts(products) {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = '';
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products found in this category.</p>';
        return;
    }
    
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        
        // Create appropriate button based on category
        let buttonHTML = '';
        
        if (product.category === 'Baby Shower') {
            buttonHTML = `
                <button class="add-to-cart-btn" onclick="redirectToCategoryPage('babyshower')">
                    <i class="fas fa-baby"></i> View Baby Shower Packages
                </button>
            `;
        } else if (product.category === 'Birthday') {
            buttonHTML = `
                <button class="add-to-cart-btn" onclick="redirectToCategoryPage('birthday')">
                    <i class="fas fa-birthday-cake"></i> View Birthday Packages
                </button>
            `;
        } else if (product.category === 'Wedding') {
            buttonHTML = `
                <button class="add-to-cart-btn" onclick="redirectToCategoryPage('wedding')">
                    <i class="fas fa-ring"></i> View Wedding Packages
                </button>
            `;
        } else {
            buttonHTML = `
                <button class="add-to-cart-btn" onclick="addSimpleToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            `;
        }
        
        // Create image with error handling
        const imageHTML = product.image ? 
            `<img src="${product.image}" alt="${product.name}" class="product-image">` :
            `<div class="no-image">No Image Available</div>`;
        
        productItem.innerHTML = `
            ${imageHTML}
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Price: $${product.price.toLocaleString()} JMD</strong></p>
            ${buttonHTML}
        `;
        productsContainer.appendChild(productItem);
    });
}

// Filter products by category
function  filterProducts(category, event) 
 {
    // Update active button
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const allProducts = getAllProducts();
    
    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filteredProducts = allProducts.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Redirect to specific category page
function redirectToCategoryPage(category) {
    if (category === 'babyshower') {
        window.location.href = 'Babyshower.html';
    } else if (category === 'birthday') {
        window.location.href = 'Birthday.html';
    } else if (category === 'wedding') {
        window.location.href = 'Wedding.html';
    }
}

// Add simple product to cart (for non-custom products)
function addSimpleToCart(productId) {
    const products = getAllProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showNotification("Product not found!", "error");
        return;
    }
    
    // Get current user
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        showNotification("Please login to add items to cart", "error");
        setTimeout(() => {
            window.location.href = "Signin.html";
        }, 1500);
        return;
    }
    
    // For simple products, add directly to cart
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (!cart[currentUser]) {
        cart[currentUser] = [];
    }
    
    // Check if product already exists in cart
    const existingItemIndex = cart[currentUser].findIndex(item => 
        item.productId === productId
    );
    
    if (existingItemIndex !== -1) {
        // Update quantity if item already exists
        cart[currentUser][existingItemIndex].quantity += 1;
    } else {
        // Add new item to cart
        cart[currentUser].push({
            productId: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            quantity: 1,
            dateAdded: new Date().toISOString()
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Show notification
    showNotification(`${product.name} added to cart!`, "success");
    
    // Update any cart summary if present
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    
    const currentUser = localStorage.getItem("currentUser");
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const userCart = cart[currentUser] || [];
    
    // You could display cart item count here if needed
    if (userCart.length > 0) {
        console.log(`Cart has ${userCart.length} items`);
    }
}

// Show notification
function showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = "notification";
    if (type === "error") {
        notification.classList.add("error");
    }
    
    notification.style.display = "block";
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        showNotification("Please login to view products", "error");
        setTimeout(() => {
            window.location.href = "signin.html";
        }, 2000);
    } else {
        loadProducts();
    }
});



