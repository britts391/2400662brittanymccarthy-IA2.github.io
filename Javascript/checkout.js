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

    // Check if a user is logged in
    const trn = localStorage.getItem("currentUser");

    // If not logged in then  no access
    if (!trn) {
        alert("You must be logged in to view your cart.");
        document.getElementById("checkoutItems").innerHTML = "";
        document.getElementById("checkoutTotal").innerHTML = "Total: $0 JMD";

        return; // STOP running the rest of checkout code
    }

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


    //  ADDED 5% TAX HERE 
    

    // Calculate TAX (5%) and Grand Total
    var tax = total * 0.05;  //5% Tax
    var grandTotal = total + tax; // Total including tax

    // Display subtotal, tax, and grand total
    document.getElementById("checkoutTotal").innerHTML =
        "Subtotal: $" + total.toFixed(2) + " JMD<br>" +/*correct to 2 decimal place*/
        "Tax (5%): $" + tax.toFixed(2) + " JMD<br>" +
        "Grand Total: $" + grandTotal.toFixed(2) + " JMD";

    var amountField = document.getElementById("Amount");
    if (amountField) {
        amountField.value = grandTotal.toFixed(2); // Customer pays grand total
        amountField.readOnly = true;
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

    // Split the expiry date string into two parts using the dash "-" as a separator
    // Example: "2025-11" → ["2025", "11"]
    var parts = expiryDate.split("-");

    // Convert the first part (year) from string to integer using base 10 to ensure its inputted as a decimal number and not another base example base 8 or hex
    var expYear = parseInt(parts[0], 10);

    // Convert the second part (month) from string to integer using base 10
    var expMonth = parseInt(parts[1], 10);

    // Get the current date and time
    var today = new Date();

    // Extract the current year from the Date object
    var currentYear = today.getFullYear(); // e.g., 2025

    // Extract the current month from the Date object
    // getMonth() returns 0-11, so add 1 to get the standard 1-12 month
    var currentMonth = today.getMonth() + 1; // e.g., November = 11

    // Check if the card is expired
    // Two conditions:
    // 1) If the card's year is less than the current year → expired
    // 2) If the card's year equals the current year AND the card's month is less than the current month → expired
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        alert("Your card has expired. Please use a valid card."); // Inform user
        return; // Stop further processing because card is invalid
    }

    // Event dates validation
    // Select all input fields of type "date" on the page
    var dateInputs = document.querySelectorAll("input[type='date']");

    // Loop through all date inputs to check if any are empty
    for (var i = 0; i < dateInputs.length; i++) {
        // If the current date input has no value (user did not select a date)
        if (!dateInputs[i].value) {
            alert("Please select all event dates before confirming checkout."); // Warn the user
            dateInputs[i].focus(); // Move cursor to the empty field so user can fill it
            return; // Stop further processing until the user fills all dates
        }
    }

    /*  
       At this point all validation has passed.  
       Now the confirmation appears BEFORE the checkout is finalized.
       
       This confirm() box gives the user a final chance to review  
       or cancel before the system removes items from the cart.
       
        If the user clicks “OK”, confirm() returns true and checkout continues.  
        If the user clicks “Cancel”, confirm() returns false and the function stops.
    */
    if (!confirm("are you sure you want to buy the selected items?")) {
        return; //Stops the checkout process completely if the user selects No.
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

    /*  INVOICE GENERATION & STORAGE
    
Invoice Generation:
After checkout, generate an invoice with the following details:
`Name of company`
`Date of invoice`
`Shipping information` (from checkout)
`Invoice number` (unique)
‘trn’
`Purchased items` (name, quantity, price, discount)
`Taxes`
`Subtotal`
`Total cost`
Append this invoice to the user’s array of invoices (array of objects). Also store the invoice to localStorage with the key called AllInvoices (as an array of objects) to access later.
After generating the invoice
Optionally, display a message indicating that the invoice has been “sent” to the user’s email.

   After all validation is successful, and before redirecting the user,
   the system will now create a unique invoice containing:

   • Company Name: SlayByBritts
   • Date of invoice
   • Shipping information
   • TRN of user (currentUser)
   • Auto-generated invoice number (starting from 100)
   • All items purchased with qty, price, discount if any
   • Subtotal, Tax (5%), and Total
   • Stored inside AllInvoices (array of objects)
   • Also stored inside the user’s own invoice history
*/

    var trn = localStorage.getItem("currentUser");  // Current user TRN
    var checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

    // STEP 1: Retrieve existing invoices (global list)
    var allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];

    // STEP 2: Determine next invoice number
    var nextInvoiceNumber = 100;   // starting number

    if (allInvoices.length > 0) {
        // Get highest existing invoice number and add +1
        var lastInvoice = allInvoices[allInvoices.length - 1];
        nextInvoiceNumber = lastInvoice.invoiceNumber + 1;
    }

    // STEP 3: Calculate subtotal, tax, total 
    var subtotal = 0;
    for (var i = 0; i < checkoutItems.length; i++) {
        var qty = parseInt(checkoutItems[i].quantity) || 1;
        var price = parseFloat(checkoutItems[i].price) || 0;
        subtotal += qty * price;
    }

    var tax = subtotal * 0.05;            // 5% tax
    var totalAmount = subtotal + tax;     // grand total

    // STEP 4: Build invoice object
    var invoice = {

        companyName: "SlayByBritts",

        invoiceNumber: nextInvoiceNumber,  // auto-generated unique invoice #

        date: new Date().toLocaleDateString(), // invoice date

        trn: trn,   // which user this invoice belongs to

        shippingDetails: {
            name: document.getElementById("shippingName").value.trim(),
            address: document.getElementById("shippingAddress").value.trim()
        },

        purchasedItems: checkoutItems, // all items in checkout

        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        totalCost: totalAmount.toFixed(2)
    };

    // STEP 5: Add invoice to global list "AllInvoices"
    allInvoices.push(invoice);
    localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));


    // STEP 6: Save invoice to USER's invoice history
    var userInvoices = JSON.parse(localStorage.getItem(trn + "_Invoices")) || [];
    userInvoices.push(invoice);
    localStorage.setItem(trn + "_Invoices", JSON.stringify(userInvoices));


    localStorage.removeItem("checkoutItems");//Clears the temporary checkout list from local storage.
    
    alert("Checkout confirmed! Thank you for your purchase. Invoice will be sent to your email"); // Shows a confirmation message.
    

    window.location.href = "../Codes/SlayByBritts.html"; //Redirects the user home  page.
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
        window.location.href = "../Codes/cart.html"; //  redirect to cart page 
    }
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

