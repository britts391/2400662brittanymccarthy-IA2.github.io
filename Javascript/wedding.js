/* 

Name: Brittany McCarthy
ID: 2400662
Class: Friday UE2 7-9


This JavaScript file manages adding wedding packages to a user’s cart 
on the "Slay by Britts" website. It validates user inputs, stores data 
in localStorage, and calculates total prices.  

It demonstrates the following IA#2 requirements:

 (a) DOM Manipulation — Uses getElementById(), querySelector(), and updates HTML dynamically  
 (b) Event Handling — addToCart() is called by an onclick event in HTML  
 (c) Form Validation / Input Handling — Validates backdrop text before adding item  
 (d) Basic Logic — Uses control structures, arithmetic, and data storage  
 (3) Integration & Presentation — Works with external HTML + CSS cleanly  via java script file link in html


*/



// Function: addToCart()
// Purpose: Handles adding a wedding package item to the user's cart
// Triggered by an onclick event in the HTML "Add to Cart" button
//
function addToCart(themeName, price, textInputId, errorId) {

    // --- DOM Manipulation ---  (a) DOM Manipulation — Uses getElementById(), querySelector(), and updates HTML dynamically
    // Accesses input and error elements using their IDs passed from HTML.
    const weddingTextInput = document.getElementById(textInputId);
    const errorMsg = document.getElementById(errorId);
    const weddingText = weddingTextInput.value.trim(); // Remove spaces

  
    // IA#2(c) FORM VALIDATION: Ensure user enters backdrop text
 
    if (!weddingText) {
        errorMsg.textContent = "Please enter backdrop text."; // Update HTML dynamically
        return; // Stop if validation fails
    } else {
        errorMsg.textContent = ""; // Clear error message when input is valid
    }

    
    // CHECK IF USER IS LOGGED IN (Basic Logic — Uses control structures, arithmetic, and data storage)
    
    const username = localStorage.getItem("currentUser");
    if (!username) {
        alert("User not logged in."); // User feedback
        return;
    }

  
    // Retrive cart data from local storage by using JSON.parse which convert string into oringal object if no 
    //cart is there it creates cart array. 2d (Basic Logic — Uses control structures, arithmetic, and data storage)
    
    let cart = JSON.parse(localStorage.getItem("cart")) || {}; // Create cart if empty
    if (!cart[username]) cart[username] = []; // Create user cart if missing


    // ADD ITEM TO USER’S CART ARRAY (Basic Interactivity  (3) Integration & Presentation — Works with external HTML + CSS cleanly  and Basic Logic — 
    //Uses control structures, arithmetic, and data storage)
    
    cart[username].push({
        theme: themeName,         // Theme name chosen from HTML
        price: price,             // Price recieved from html
        backdropText: weddingText,// Custom text entered by user
        category: "Wedding"       // Category tag for organization
    });

    
    // SAVE UPDATED CART BACK TO LOCAL STORAGE
    
    localStorage.setItem("cart", JSON.stringify(cart));

  
    // CONFIRMATION FEEDBACK (Basic Interactivity  (3) Integration & Presentation — Works with external HTML + CSS cleanly)
   
    alert(`Added "${themeName}" (Wedding) to cart with backdrop text. Total so far: $${calculateTotal(username)} JMD`);
    /*We use back ticks ` to  create a template literal a special type of string that allows embeded variables and line breaks.
 we use ${}	 to embed variables or expressions inside the string.*/
}



// Function: calculateTotal()
// Purpose: Adds all prices together for a user's cart items
// IA#2(d): Basic Logic and Arithmetic Calculation

function calculateTotal(username) {
    const cart = JSON.parse(localStorage.getItem("cart")) || {}; /*We use JSON.parse to convert the JSON-formatted string  created by JSON.stringify. stored under the key "cart" into 
                                                                    the original data structure r java object. */
    const userCart = cart[username] || [];// get cart elements stored under the current username if there is none or if cart is empty a null array is created.
   
    // Sum up all prices using Array.reduce()
    return userCart.reduce(function (sum, item) {
        return sum + item.price;
    }, 0);// use zero as the inital number or total to start adding
}
