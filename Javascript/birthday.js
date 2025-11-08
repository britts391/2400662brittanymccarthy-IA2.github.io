
/* 

Name: Brittany McCarthy
ID: 2400662
Class: Friday UE2 7-9

:
This JavaScript file manages the interactive behavior of the Birthday 
Package webpage for "Slay by Britts". It connects to the HTML using 
external <script> tags and performs the following tasks:

 Defines theme prices (data storage logic)
 Handles "Add to Cart" actions for different package themes
 Validates user input (form validation)
 Manipulates the DOM to show error messages dynamically
 Uses control structures (if, loops) and arithmetic for totals
 Stores and retrieves data from localStorage
 Demonstrates DOM Manipulation, Event Handling, and Logic per IA#2

Linked in HTML using:
<script src="../Javascript/birthday.js"></script>


*/



// Define prices for all themes (IA#2: Basic Logic / Data Setup)
// This object stores price and category info for each birthday theme.
// Used later when calculating total and storing cart items.

const themePrices = {
    Pink: { price: 40000, category: "Birthday" },
    Black: { price: 40000, category: "Birthday" },
    Burgundy: { price: 40000, category: "Birthday" },
    Purple: { price: 40000, category: "Birthday" },
    Princess: { price: 60000, category: "Birthday" },
    Pawpatrol: { price: 60000, category: "Birthday" },
    Dinosaur: { price: 60000, category: "Birthday" },
    Unicorn: { price: 60000, category: "Birthday" },
    ExtraPink: { price: 80000, category: "Birthday" },
    ExtraPurple: { price: 80000, category: "Birthday" },
    ExtraBlack: { price: 80000, category: "Birthday" },
};



// FUNCTION: handleAddToCart(button)
// Handles the process of adding a selected theme to the cart
// Requirements:
//   IA#2(a): DOM Manipulation (querySelector, closest, dynamic text updates)
//   IA#2(b): Event Handling (onclick event listener in HTML triggers this)
//   IA#2(c): Form Validation (checks if a theme and number are selected)
//   IA#2(d): Basic Logic (calculates totals, uses conditionals)

function handleAddToCart(button) {
    // --- DOM Manipulation: Find the parent <div> of the clicked button ---
    const section = button.closest("div");

    // --- DOM Selection: Identify all checked checkboxes in this section ---
    const selectedThemes = section.querySelectorAll('input[name="theme"]:checked');

    // --- DOM Selection: Get number input field ---
    const numberInput = section.querySelector('input[type="number"]');

    // --- DOM Manipulation: Error message <p> tags for validation feedback ---
    const errorMsgTheme = section.querySelector("#themeError");
    const errorMsgNumber = section.querySelector("#numberError");

    // FORM VALIDATION  Theme
  
    // Ensure that exactly one theme is selected before proceeding.
    if (selectedThemes.length !== 1) {
        // IA#2(c): DOM Manipulation + Validation — updating HTML content dynamically.
        errorMsgTheme.textContent = "Please select exactly one theme.";
        return; // Stop function if validation fails.
    } else {
        errorMsgTheme.textContent = ""; // Clear error message if valid.
    }

 
    // FORM VALIDATION STEP 2: Number

    // Validate that a valid number balloon value is entered.
    if (!numberInput.value || numberInput.value <= 0) {
        // IA#2(c): Update DOM to show error dynamically.
        errorMsgNumber.textContent = "Please enter a valid number.";
        return;
    } else {
        errorMsgNumber.textContent = ""; // Clear error if valid.
    }

    // Store validated form data
    const theme = selectedThemes[0].value;
    const numberBalloon = numberInput.value;

    
    // DATA RETRIEVAL AND VALIDATION
  
    // Retrieve price details from themePrices object.
    const details = themePrices[theme];/* themePrices theme is now stored in details so details is for example Pink: { price: 40000, category: "Birthday"} */
    if (!details) {
        alert(`Details for ${theme} not found!`);
        return;
    }

    const price = details.price;/* details is the object and price is the property which is being set to store  in constant  price same for category*/
    const category = details.category;

    // ----------------------------
    // LOCAL STORAGE INTERACTION
    // ----------------------------
    // Retrieve the currently logged-in user from localStorage.
    const username = localStorage.getItem("currentUser");
    if (!username) {
        alert("User not logged in.");
        return;
    }

    // Get existing cart data or create a new object if none exists.
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    // If the user has no cart yet, create an empty array for them.
    if (!cart[username]) cart[username] = [];

    // ----------------------------
    // ADD ITEM TO CART (LOGIC)
    // ----------------------------
    // Push the new item into the user’s cart array.
    cart[username].push({
        theme,
        numberBalloon,
        price,
        category // new property added
    });

    // Save updated cart back to localStorage (persistent storage)
    localStorage.setItem("cart", JSON.stringify(cart));

    // --- IA#2(d): Arithmetic & Dynamic Feedback ---
    // Calculate total cost and display it in an alert.
    alert(`Added ${theme} (${category}) to cart. Total so far: $${calculateTotal(username)}`);
}


// ====================================================================
// FUNCTION: calculateTotal(username)
// Purpose: Calculates the total cost of items in the user's cart
// Requirements:
//   IA#2(a): DOM Manipulation (indirect — used for updating user view)
//   IA#2(d): Basic Logic & Arithmetic Calculation
// ====================================================================

function calculateTotal(username) {
    // Retrieve the entire cart from localStorage.
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    // Access only the current user's cart items.
    const userCart = cart[username] || [];

    // --- Logic & Arithmetic ---
    // Use the Array.reduce() method to sum prices of all items.
    // sum starts at 0, adds each item's price to get total.

    return userCart.reduce(function (sum, item) {
        return sum + item.price;
    }, 0);


}
