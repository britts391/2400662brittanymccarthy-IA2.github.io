// Name Brittany McCarthy
// ID: 2400662
// class: Friday UE2 7 - 9pm
/*
Invoice Generation:
After checkout, generate an invoice with the following details:
`Name of company`
    `Date of invoice`
    `Shipping information`(from checkout)
    `Invoice number`(unique)
‘trn’
`Purchased items`(name, quantity, price, discount)
    `Taxes`
    `Subtotal`
    `Total cost`
Append this invoice to the user’s array of invoices(array of objects).Also store the invoice to localStorage with the key called AllInvoices(as an array of objects) to access later.
After generating the invoice
Optionally, display a message indicating that the invoice has been “sent” to the user’s email.

 */
// window.onload ensures that the function GetUserInvoices is executed automatically
// when the page has fully loaded. This guarantees that the HTML elements exist
// before the script tries to manipulate them.
window.onload = function () {
    GetUserInvoices();
};

// GetUserInvoices is the main function to fetch and display invoices for the current user
function GetUserInvoices() {

    // Retrieve the currently logged-in user's TRN from localStorage
    // This TRN is assumed to have been stored when the user logged in
    let trn = localStorage.getItem("currentUser");

    // If there is no TRN found, it means no user is logged in
    // In this case, the user is alerted and redirected to the login page
    if (!trn) {
        alert("No user logged in.");
        window.location.href = "../Codes/Login.html";
        return; // stop execution to prevent errors
    }

    // Retrieve the user's invoices from localStorage using a key that combines TRN and "_Invoices"
    // If no invoices exist for this user, an empty array is used
    let invoices = JSON.parse(localStorage.getItem(trn + "_Invoices")) || [];

    // Get the container element from the HTML where invoices will be displayed
    let container = document.getElementById("invoiceContainer");

    // Clear any previous content in the container so the page is fresh
    container.innerHTML = "";

    // If the user has no invoices, display a centered message indicating this
    if (invoices.length === 0) {
        container.innerHTML = `<h2 style="text-align:center;">No invoices found.</h2>`;
        return; // stop further execution since there is nothing to display
    }

    // Helper function to clean strings by removing any non-printable or special characters
    // and trimming whitespace from both ends of the string
    function cleanString(str) {
        return String(str || "").replace(/[^\x20-\x7E]/g, "").trim();
    }

    // Loop through each invoice in the invoices array
    invoices.forEach(inv => {

        // Create a div element that will serve as a container for this invoice
        let box = document.createElement("div");

        // Add a class "invoice-box" to the div for styling purposes
        box.classList.add("invoice-box");

        // Initialize a variable to hold the HTML content for purchased items
        let purchasedHTML = "";

        // If the invoice has purchased items, map through each item to create HTML
        if (inv.purchasedItems.length > 0) {

            // For each purchased item, extract the category, theme, special details, quantity, and price
            purchasedHTML = inv.purchasedItems.map(i => {

                // Clean the category string; if empty, use "Package" as default
                let itemName = cleanString(i.category) || "Package";

                // Clean the theme string; if it exists, format as Theme: (theme name)
                let themeName = cleanString(i.theme) ? `Theme: (${cleanString(i.theme)})` : "";

                // Initialize a variable to hold special details such as balloon number or backdrop
                let special = "";

                // If there is a balloon number, display it
                if (i.numberBalloon) {
                    special = `Balloon Number: ${i.numberBalloon}`;
                }
                // Otherwise, if there is backdrop text, display it
                else if (i.backdropText) {
                    special = `Backdrop: ${cleanString(i.backdropText)}`;
                }

                // Return the HTML string for this item, including name, theme, special info, quantity, and price
                // Quantity is converted to integer, defaulting to 1 if missing
                // Price is converted to float and fixed to two decimal places
                return `<p> Package:${itemName} - ${themeName} - ${special} - Qty: ${parseInt(i.quantity) || 1} Price: $${parseFloat(i.price).toFixed(2)}</p>`;

            }).join(""); // Join all items together into a single HTML string
        } else {
            // If there are no purchased items, display a message indicating that
            purchasedHTML = "<p>No items listed.</p>";
        }

        // Set the innerHTML of the invoice box div
        // This includes invoice number, date, company, TRN, shipping details, purchased items, and payment summary
        box.innerHTML = `
            <h2>Invoice #${inv.invoiceNumber}</h2>
            <p><strong>Date:</strong> ${inv.date}</p>
            <p><strong>Company:</strong> ${inv.companyName}</p>
            <p><strong>TRN:</strong> ${inv.trn}</p>

            <h3>Shipping Details</h3>
            <p><strong>Name:</strong> ${inv.shippingDetails.name}</p>
            <p><strong>Address:</strong> ${inv.shippingDetails.address}</p>

            <h3>Purchased Items</h3>
            ${purchasedHTML}

            <h3>Payment Summary</h3>
            <p><strong>Subtotal:</strong> $${inv.subtotal}</p>
            <p><strong>Tax:</strong> $${inv.tax}</p>
            <p><strong>Total:</strong> <strong>$${inv.totalCost}</strong></p>
        `;

        // Append the invoice box div to the main container in the page
        // This ensures that all invoices are displayed one after another
        container.appendChild(box);
    });
}
