/*
   Brittany McCarthy 
   ID: 2400662
   Class: Friday UE2 7-9
   
  
   This section handles:
   - Adding selected products to a user's cart
   - Validating user input
   - Storing cart data in localStorage
   - Providing real-time feedback using alerts
 
*/


/* 
   (IA#2 Question 2a: DOM Manipulation)
   • Demonstrates correct use of DOM functions:
       - getElementById() to access input and error message elements
       - Dynamically updating text content in the DOM for validation

   (IA#2 Question 2c: Form Validation / Input Handling)
   • Validates that the user enters required backdrop text.
   • Displays and clears error messages dynamically.
 
   (IA#2 Question 2d: Basic Interactivity / Logic)
   • Checks login state and calculates totals.
   • Uses control structures (if / else) and arithmetic operations.
  
*/

function addToCart(themeName, price, textInputId, errorId) {
    // Step 1: Get references to the user input and error message area
    // Using getElementById() to retrieve specific elements from the DOM
    var babyTextInput = document.getElementById(textInputId);
    var errorMsg = document.getElementById(errorId);
    var babyText = babyTextInput.value.trim(); // trim is use to remove extra spaces

    // Step 2: Input Validation — Ensure backdrop text is entered
    // (IA#2 2c - Form Validation)
    if (!babyText) {
        // If the field is empty, show an error message dynamically
        errorMsg.textContent = "Please enter backdrop text.";
        return; // Stop execution until corrected
    } else {
        // If input is valid, clear any previous error messages
        errorMsg.textContent = "";/* error message is now blank*/
    }

    // Step 3: Check if user is logged in before adding to cart
    // (IA#2 2d - Basic Logic)
    var username = localStorage.getItem("currentUser");
    if (!username) {
        // If no user session is found, show alert and stop
        alert("User not logged in.");
        return;
    }

    // Step 4: Retrieve existing cart data or create a new one
    // (IA#2 2a - DOM & Storage Manipulation)
    // Using JSON.parse() to convert stored data back into an object
    var cart = JSON.parse(localStorage.getItem("cart")) || {};

    // If this is the user's first time, create an empty array for their cart
    if (!cart[username]) cart[username] = [];

    // Step 5: Add the selected product to the user's cart
    // Each item includes a category label for easy grouping
    cart[username].push({
        theme: themeName,      // The chosen theme name (e.g  Baby Bear )
        price: price,          // The cost of the package
        backdropText: babyText,// The user’s custom backdrop text
        category: "Baby Shower"// Added category label for identification
    });

    // Step 6: Save updated cart back to localStorage
    // Convert object to string using JSON.stringify()
    localStorage.setItem("cart", JSON.stringify(cart));

    // Step 7: Provide user feedback (Basic Interactivity)
    // Uses a helper function to calculate updated total and display it
    alert(`Added "${themeName}" (Baby Shower) to cart with backdrop text. Total so far: $${calculateTotal(username)} JMD`);
    /*We use back ticks ` to  create a template literal a special type of string that allows embeded variables and line breaks.
 we use ${}	 to embed variables or expressions inside the string.*/
}


/* 
   (IA#2 Question 2d: Basic Interactivity / Logic)
   • Function demonstrates correct use of control structures and
     arithmetic operations.
   • Uses Array.reduce() to compute total cost dynamically.
  
*/

function calculateTotal(username) {
    // Retrieve full cart from localStorage
    var cart = JSON.parse(localStorage.getItem("cart")) || {};

    // Get only the current user's items
    var userCart = cart[username] || [];

    // Sum all prices using reduce()
    // The function takes a running total (sum) and adds each item's price
    return userCart.reduce(function (sum, item) {
        return sum + item.price; // Arithmetic operation
    }, 0);// Starts with 0 as the initial total
    // For each item in userCart, and continues to add items price to the running total

}


/* 
   (IA#2 Question 3a: Integration & Presentation)
   • This JS file interacts with HTML through function calls (e.g., buttons).
   • Keeps HTML semantic and free from inline code.
   • Works with external CSS and HTML for organized, modular design.
   
*/
