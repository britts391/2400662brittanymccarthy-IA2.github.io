/* 
====================================================================
Name: Brittany McCarthy
ID: 2400662
Class: Friday UE2 7-9

This script dynamically loads and manages the user's shopping cart.  
It displays all selected items (Birthday/Wedding packages.), updates totals 
when quantities or selections change, and supports removing or clearing 
items from the cart.  

It demonstrates:

 (a) DOM Manipulation — creates table rows dynamically, updates innerHTML  
 (b) Event Handling — multiple event listeners (click, change, mouseover)  
 (c) Form Validation — verifies logged-in user, prevents empty checkout  
 (d) Basic Logic — uses loops, conditionals, and arithmetic  
 (3) Integration — linked as an external script for cart.html page  

Linked in HTML as:
<script src="../Javascript/cart.js"></script>

*/

// FUNCTION: loadCartPage()
// Load and display cart contents dynamically when user visits cart.html
// Called on page load or after updates (IA#2(b): Event Handling)

function loadCartPage() {
    var username = localStorage.getItem("currentUser");
    var cartContainer = document.querySelector(".cart-container"); // DOM Manipulation

    // Validation: Ensure user is logged in before displaying cart
    if (!username) {
        cartContainer.innerHTML = "<h2>Please log in to view your cart.</h2>";
        return;
    }

    // Retrieve cart data from localStorage
    var cart = JSON.parse(localStorage.getItem("cart")) || {};
    var userCart = cart[username] || [];

    // Select HTML table body for items
    var cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; // Clear before reloading
    var selectedTotal = 0; // Initialize total cost

   
    // DOM CREATION: Build table rows dynamically for each cart item
    
    for (var index = 0; index < userCart.length; index++) {
        var item = userCart[index];
        if (item.selected === undefined) item.selected = true; // items added to cart are by default selected

        var category = item.category || "N/A";// N/A as place holder if none is present
        var theme = item.theme || "N/A";
        var customText = item.backdropText || "N/A";
        var numberBalloon = item.numberBalloon || "N/A";
        var quantity = item.quantity || 1;
        var price = item.price ? item.price * quantity : 0;

        // Create a new row for each cart item
        var row = document.createElement("tr");

        // Insert table cells dynamically (DOM Manipulation)
        row.innerHTML =
            "<td><input type='checkbox' class='item-checkbox' data-index='" + index + "' " + (item.selected ? "checked" : "") + "></td>" +
            "<td>" + category + "</td>" +
            "<td>" + theme + "</td>" +
            "<td>" + customText + "</td>" +
            "<td>" + numberBalloon + "</td>" +
            "<td><input type='number' min='1' value='" + quantity + "' onchange='updateQuantity(" + index + ", this.value)'></td>" +
            "<td>$" + price + "</td>" +
            "<td><button onclick='removeItem(" + index + ")'>Remove</button></td>";

        // Add row to table
        cartItemsContainer.appendChild(row);

        // Add to total if selected
        if (item.selected) selectedTotal += price;
    }

    // Update total display (Dynamic DOM Update)
    document.getElementById("totalPrice").textContent = "Total: $" + selectedTotal + " JMD";

    
    // EVENT HANDLING: Checkbox selection update when check boxes are selected .
    
    var checkboxes = document.querySelectorAll(".item-checkbox");//This line finds all checkbox elements on the page with the class name item-checkbox and document.querySelectorAll() returns  an array of all matching elements.
    
    for (var i = 0; i < checkboxes.length; i++) {//A for loop goes through every checkbox that was found.
        checkboxes[i].addEventListener("change", function () {//Adds an event listener for each checkbox that listens for the change event (triggered when a checkbox is checked or unchecked).
            var idx = parseInt(this.getAttribute("data-index"));
            userCart[idx].selected = this.checked;//Updates the specific item in the user’s cart to reflect the checkbox state
            cart[username] = userCart;//Updates the cart object in localStorage to include the new selection status.

            //JSON.stringify(cart) converts the updated cart back to a string format so it can be stored in local storage .
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCartPage(); // Reload updated view
        });
    }

    
    // EVENT HANDLING: Hover effects for cart rows 
    var rows = document.querySelectorAll("#cartItems tr");
    rows.forEach(function (row) {
        row.addEventListener("mouseover", function () {/*whenever mouse is over table row the colour will change and alsoe text colour*/
            row.style.backgroundColor = "#DDA0DD"; // Light purple background
            row.style.color = "white"; // Contrast text
        });
        row.addEventListener("mouseout", function () {/* returns to normal when mouse is off table row*/
            row.style.backgroundColor = "";
            row.style.color = "";
        });
    });
}



// EVENT HANDLING: Apply hover effect to table headers on page load

document.addEventListener("DOMContentLoaded", function () {/*event handler to change table head colour when mouse is over it and mouse out to reset colour */
    var headers = document.querySelectorAll("thead th");
    headers.forEach(function (header) {
        header.addEventListener("mouseover", function () {
            header.style.backgroundColor = "#FF69B4"; // Hot pink
            header.style.color = "#C22588"; // Deep pink
        });
        header.addEventListener("mouseout", function () {
            header.style.backgroundColor = "";
            header.style.color = "";
        });
    });
});



// FUNCTION: updateQuantity()
// Purpose: Updates item quantity and recalculates total
function updateQuantity(index, newQuantity) {
    var username = localStorage.getItem("currentUser");
    if (!username) {
        alert("User not logged in.");
        return;
    }

    var cart = JSON.parse(localStorage.getItem("cart")) || {};
    var userCart = cart[username] || [];

    userCart[index].quantity = parseInt(newQuantity); // DOM input value to JS variable
    cart[username] = userCart;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage(); // Refresh cart view
}



// FUNCTION: removeItem()
// Removes a specific item from the user's cart

function removeItem(index) {
    var username = localStorage.getItem("currentUser");
    if (!username) {
        alert("User not logged in.");
        return;
    }

    var cart = JSON.parse(localStorage.getItem("cart")) || {};
    var userCart = cart[username] || [];

    userCart.splice(index, 1); //  splice is a java script function that can add or remove an element it accepts two arguments index for element in array and number of elements you want to add or removeRemove one element
    cart[username] = userCart;
    localStorage.setItem("cart", JSON.stringify(cart));// update cart back to local storage.
    loadCartPage();
}



// FUNCTION: clearCart()
// Purpose: Clears all items for the logged-in user

function clearCart() {// check if user is logged in
    var username = localStorage.getItem("currentUser");
    if (!username) {
        alert("User not logged in.");
        return;
    }

    var cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[username] = []; // Empty the user's cart
    localStorage.setItem("cart", JSON.stringify(cart));// update cart
    loadCartPage();
    alert("Cart cleared successfully!");
}



// FUNCTION: goToCheckout()
//  Saves selected items and redirects to checkout.html
function goToCheckout() {
    var username = localStorage.getItem("currentUser");
    if (!username) {
        alert("User not logged in.");
        return;
    }

    var cart = JSON.parse(localStorage.getItem("cart")) || {};
    var userCart = cart[username] || [];

    var selectedItems = userCart.filter(function (item) {
        return item.selected === undefined || item.selected === true;
    });

    if (selectedItems.length === 0) {
        alert("Please select at least one item to checkout.");
        return;
    }

    //Ensure quantity exists
    for (var i = 0; i < selectedItems.length; i++) {
        if (!selectedItems[i].quantity) {
            selectedItems[i].quantity = 1;
        }
    }

    localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "../Codes/checkout.html";
}