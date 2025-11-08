/*

Name: Brittany McCarthy
ID: 2400662
Class: Friday UE2 7-9

This JavaScript file powers the Checkout page. It dynamically loads 
items selected for checkout, validates user and payment input, and 
confirms the order by updating the cart in localStorage.

IA#2 Demonstrations:
 (a) DOM Manipulation — dynamically creates checkout table rows, updates totals  
 (b) Event Handling — triggered by buttons (Confirm, Cancel, Close)  
 (c) Form Validation — verifies payment details, address, and event dates  
 (d) Basic Logic — loops, conditionals, arithmetic, and storage updates  
 (3) Integration — connects with checkout.html and SlayByBritts.html  

*/


// FUNCTION: loadCheckoutPage()
// PURPOSE: Dynamically display checkout items and create event date inputs
// IA#2(a): DOM Manipulation — creating rows, totals, and date fields

function loadCheckoutPage() {
    var selectedItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];/*Retrieves the string stored in localStorage under the key "checkoutItems".
                                                                                   and  converts it back to an array/object using JSON.parse(). If nothing is found (returns null), it will then default to a empty array [].*/
    var tbody = document.getElementById("checkoutItems");//Gets the <tbody> element with the ID checkoutItems in html  where the items will be displayed.
    var total = 0; //Initializes a variable total to keep track of the total price which will be calculated later.

    tbody.innerHTML = ""; // Clears any existing rows inside the <tbody> before adding new ones.

    if (selectedItems.length === 0) {//Checks if there are no items in the selectedItems array.
        tbody.innerHTML = "<tr><td colspan='7'>No items selected for checkout.</td></tr>";//If empty, displays a message in the table saying “No items selected for checkout”.
                                                                                            //colspan = '7' means the message spans across 7 columns of the table.
        return;
    }




 /* IA#2(d): . Basic Interactivity / Logic
 •	Evidence of correct control structures being used.
 •	Correct arithmetic calculations*/

    for (var i = 0; i < selectedItems.length; i++) {//Loops through each item in the selectedItems array.

        var item = selectedItems[i];//Gets the current item object from the array.
        var qty;
        if (item.quantity) {//If item.quantity exists, convert it to an integer.Otherwise, default to 1 this ensures quantity is always there.

                qty = parseInt(item.quantity);
        } else {
                    qty = 1;
        }
                                                                
        var priceValue;

        if (item.price) {//If item.price exists, convert it to an float .Otherwise, default to 0 .
            priceValue = parseFloat(item.price);
        } else {
            priceValue = 0;
        }

        var itemTotal = priceValue * qty;//Calculates the total price for this item.
        total += itemTotal; //Adds this item’s total to the overall checkout total.


        // Build date inputs dynamically (DOM Manipulation)
        var dateInputs = "";//Initializes an empty string to hold date input fields.
        for (var j = 0; j < qty; j++) {//Loops for the quantity of items.
            dateInputs += "Event " + (j + 1) + ": <input type='date'><br>";//Adds a date input for each event (based on quantity).
        }

        // Create table row dynamically
        var row = document.createElement("tr"); /* DOM Manipulation a. DOM Manipulation
                                                    •	Correct use of DOM functions, eg getElementById(), querySelector(), etc
                                                    •	Dynamically update HTML and CSS using Js.*/

        row.innerHTML =/*Builds the row with: Category, theme, backdrop text, balloon number, quantity , item total and date inputs.*/
            "<td>" + (item.category || "N/A") + "</td>" +
            "<td>" + (item.theme || "N/A") + "</td>" +
            "<td>" + (item.backdropText || "N/A") + "</td>" +
            "<td>" + (item.numberBalloon || "N/A") + "</td>" +
            "<td>" + qty + "</td>" +
            "<td>$" + itemTotal.toFixed(2) + "</td>" +
            "<td>" + dateInputs + "</td>";

        tbody.appendChild(row); // Adds the row to the table body.
    }

    document.getElementById("checkoutTotal").textContent =
        "Total: $" + total.toFixed(2) + " JMD"; // Displays the total price in the checkout .

    var amountField = document.getElementById("shippingAmount");//Gets the shipping amount input field.
    if (amountField) {/*If it exists, sets value to the total and make it read - only to prevent editing.*/
        amountField.value = total.toFixed(2);
        amountField.readOnly = true; /* Form Validation / Input Handling 
                                    •	Simple validation(e.g., check if a field is empty, validate email format, etc).
                                        */
    }
}



// FUNCTION: confirmCheckout()
//  Validates all user input and confirms the order
// IA#2(c): Form Validation
// IA#2(b): Event Handling — triggered by button click

function confirmCheckout() {
    var shippingName = document.getElementById("shippingName").value.trim();//Get the values from input fields by their IDs use trim() removes any leading / trailing whitespace.
    var address = document.getElementById("shippingAddress").value.trim();
    var cardNumber = document.getElementById("cardNumber").value.trim();
    var expiryDate = document.getElementById("expiryDate").value.trim();
    var cvv = document.getElementById("cvv").value.trim();

    // General alert if all fields are empty
    /*c. Form Validation / Input Handling •	Simple validation(e.g., check if a field is empty, validate email format, etc).•	Uses JavaScript functions or updates the DOM with error messages.*/
    if (!shippingName && !address && !cardNumber && !expiryDate && !cvv) {

        alert("Please fill in all required fields.");
        return;
    }

    // Specific alerts for each field
    if (!shippingName) {
        alert("Please enter your name.");
        return;
    }

    if (!address) {
        alert("Please enter your address.");
        return;
    }

    if (!cardNumber) {
        alert("Please enter your card number.");
        return;
    } else if (cardNumber.length < 16) {
        alert("Card number must be at least 16 digits.");
        return;
    }

    if (!expiryDate) {
        alert("Please enter expiry date.");
        return;
    }

    if (!cvv) {
        alert("Please enter CVV.");
        return;
    } else if (cvv.length < 3) {
        alert("CVV must be at least 3 digits.");
        return;
    }

    

   
    // Expiry date validation for card
    //Splits the expiry date (format: YYYY-MM) and converts year/month to integers.
    var parts = expiryDate.split("-");
    var expYear = parseInt(parts[0], 10);
    var expMonth = parseInt(parts[1], 10);

    //Gets the current year and month.
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth() + 1;

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {//Checks if the card is expired.
        alert("Your card has expired. Please use a valid card.");
        return;
    }

    // Event dates validation it loops through all date inputs and ensures each has a value.
    var dateInputs = document.querySelectorAll("input[type='date']");
    for (var i = 0; i < dateInputs.length; i++) {
        if (!dateInputs[i].value) {
            alert("Please select all event dates before confirming checkout.");
            dateInputs[i].focus();
            return;
        }
    }

    /* Checkout logic: remove items from cart (d. Basic Interactivity / Logic •	Evidence of correct control structures being used.•	Correct arithmetic calculations.*/

   var username = localStorage.getItem("currentUser");// Retrieves:Current user entire cart from localStorage 
    var cart = JSON.parse(localStorage.getItem("cart")) || {};/* Retrieves the entire cart object from local storage and convert  it from JSON string to a JavaScript object.
                                                                If nothing is found, defaults to an empty array {}.*/
    var userCart = cart[username] || [];//Gets the specific cart items for the current user.If the user has no items, defaults to an empty array[].
    var checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];//Retrieves the list of items the user is checking out convert it to a java script object  and defaults to an empty array if not found.

    var updatedCart = [];//Initializes a new array to hold items that will remain in the cart.
    for (var i = 0; i < userCart.length; i++) { /*Loops through each item in the user's cart. matchFound is used to check if the current cart item is also in the checkout list.*/ 
        var matchFound = false;
        for (var j = 0; j < checkoutItems.length; j++) {/*Loops through each item in the checkout list.Compares three properties: category, theme, and backdropText.
                                                         If all match, it means the item is being checked out, so matchFound is set to true.*/
            if (
                userCart[i].category === checkoutItems[j].category &&
                userCart[i].theme === checkoutItems[j].theme &&
                userCart[i].backdropText === checkoutItems[j].backdropText
            ) {
                matchFound = true;
                break;
            }
        }
        if (!matchFound) updatedCart.push(userCart[i]);//If the item is not in the checkout list, it is added to updatedCart.This effectively removes the checked  out items from the cart and the ones which are not check
                                                        //are left in cart.
    }

    cart[username] = updatedCart;//Updates the cart object with the new filtered list for the current user.
    localStorage.setItem("cart", JSON.stringify(cart)); // Storage update 
    localStorage.removeItem("checkoutItems");//Clears the temporary checkout list from local storage.
    //
    alert("Checkout confirmed! Thank you for your purchase."); // Shows a confirmation message.

    window.location.href = "../Codes/SlayByBritts.html"; //Redirects the user to a thank - you or confirmation page.
}



// FUNCTION: cancelCheckout()
//  Cancels checkout and clears temporary data
// b)Event Handling •	At least two(2) working event listeners and respective handlers
//d)d. Basic Interactivity / Logic  Evidence of correct control structures being used. •	Correct arithmetic calculations.


function cancelCheckout() {
    if (confirm("Are you sure you want to cancel checkout?")) {/*This uses the built-in confirm() dialog box.It shows a Yes/No popup with the message: "Are you sure you want to cancel checkout?"
                                                                If the user clicks "OK", the function continues. If the user clicks "Cancel", the function stops and does nothing.*/ 
        localStorage.removeItem("checkoutItems"); // This removes the checkoutItems key from localStorage.checkoutItems is a temporary list of items the user selected for checkout.
                                                //Removing it means the checkout process is aborted, and the system forgets what the user was about to buy.

        alert("Checkout cancelled. Returning to cart page.");//Displays a message to the user confirming that the checkout was cancelled.
                                                            //This is a feedback mechanism to reassure the user that their action was successful.
        window.location.href = "../Codes/cart.html"; //  re direct to cart page 
    }
}



// FUNCTION: closeCheckout()
// :Closes checkout (no data cleared) and returns to cart
// IA#2(b) Event Handling

function closeCheckout() {
    window.location.href = "../Codes/cart.html"; // when clicked will return to cart page
}


// FUNCTION: clearCheckout()
//Clears checkout data (debug/admin use only)
// IA#2(d) Basic Logic — interacts with storage, updates DOM

function clearCheckout() {
    localStorage.removeItem("checkoutItems");//This line removes the key checkoutItems from the browser's localStorage.
    alert("Checkout items cleared.");//Displays a popup message to the user confirming that the checkout items were successfully cleared.
    window.location.reload(); // Reload DOM Reloads the current page.
                               //This ensures that any UI elements or scripts that depend on checkoutItems are refreshed and updated.
}

