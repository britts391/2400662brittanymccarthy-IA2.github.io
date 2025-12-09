// Name Brittany McCarthy
// ID: 2400662
// class: Friday UE2 7 - 9
/*quetion 6 Additional Functionality:
ShowUserFrequency() – Show’s user requency based on Gender and Age Group:
show how many registered users fall under specific gender categories (e.g. Male, Female, Other)
show how many registered users fall under different age groups (e.g., 18-25, 26-35, 36-50, 50+).
Display this data on a dashboard or a separate page. 
ShowInvoices() - displays all invoices and allow the visitor to search for any of the invoices (using trn) stored in AllInvoices from localStorage using console.log().
GetUserInvoices() – displays all the invoices for a user based on trn stored in the localStorage key called, RegisterData. 

 */

// window.onload ensures that when the page finishes loading, the two main functions are called
// ShowInvoices() displays all invoices stored in localStorage
// ShowUserFrequency() generates the gender and age distribution charts for registered users
window.onload = function () {
    ShowInvoices();
    ShowUserFrequency();
};

// SHOW ALL INVOICES
function ShowInvoices() {
    // Get the container element where invoices will be displayed
    var container = document.getElementById("allInvoicesContainer");
    container.innerHTML = ""; // Clear previous content

    var allInvoices = []; // Initialize array to hold all invoices from localStorage

    // Loop through localStorage to find keys ending with "_Invoices"
    // These keys contain stored invoice data
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.endsWith("_Invoices")) {
            var invoices = JSON.parse(localStorage.getItem(key)) || []; // Parse JSON or use empty array if null
            for (var j = 0; j < invoices.length; j++) {
                allInvoices.push(invoices[j]); // Add each invoice to the allInvoices array
            }
        }
    }

    // Log all invoices to the console for debugging purposes
    console.log("All invoices in system:");
    for (var i = 0; i < allInvoices.length; i++) {
        console.log(allInvoices[i]);
    }

    // If no invoices are found, show a message in the container and exit
    if (allInvoices.length === 0) {
        container.innerHTML = "<h3>No invoices found in system.</h3>";
        return;
    }

    // Helper function to remove non-printable characters and trim spaces
    function cleanString(str) {
        return String(str || "").replace(/[^\x20-\x7E]/g, "").trim();
    }

    // Loop through all invoices to display them
    for (var i = 0; i < allInvoices.length; i++) {
        var inv = allInvoices[i];
        var box = document.createElement("div"); // Create a div for each invoice
        box.classList.add("invoice-box"); // Add CSS class for styling

        // Build HTML for purchased items in the invoice
        var purchasedHTML = "";
        if (inv.purchasedItems && inv.purchasedItems.length > 0) {
            for (var k = 0; k < inv.purchasedItems.length; k++) {
                var item = inv.purchasedItems[k];

                var itemName = cleanString(item.category); // Clean category string
                if (itemName === "") {
                    itemName = "Package"; // Default name if category is empty
                }

                var themeName = "";
                if (cleanString(item.theme) !== "") {
                    themeName = "Theme: (" + cleanString(item.theme) + ")"; // Add theme if exists
                }

                var special = "";
                if (item.numberBalloon) {
                    special = "Balloon Number: " + item.numberBalloon; // Show balloon number
                } else if (item.backdropText) {
                    special = "Backdrop: " + cleanString(item.backdropText); // Show backdrop text
                }

                var qty = item.quantity; // Get quantity
                if (!qty) {
                    qty = 1; // Default to 1 if undefined
                }

                // Append HTML for each purchased item
                purchasedHTML += "<p>Package:" + itemName + " - " + themeName + " - " + special +
                    " - Qty:" + qty + " Price:$" + parseFloat(item.price).toFixed(2) + "</p>";
            }
        } else {
            purchasedHTML = "<p>No items listed.</p>"; // If no purchased items
        }

        // Construct the invoice box inner HTML
        box.innerHTML = "<h2>Invoice #: " + inv.invoiceNumber + "</h2>" +
            "<p><strong>Date:</strong> " + inv.date + "</p>" +
            "<p><strong>Company:</strong> " + inv.companyName + "</p>" +
            "<p><strong>TRN:</strong> " + inv.trn + "</p>" +
            "<h3>Shipping Details</h3>" +
            "<p><strong>Name:</strong> " + inv.shippingDetails.name + "</p>" +
            "<p><strong>Address:</strong> " + inv.shippingDetails.address + "</p>" +
            "<h3>Purchased Items</h3>" + purchasedHTML +
            "<h3>Payment Summary</h3>" +
            "<p><strong>Subtotal:</strong> $" + inv.subtotal + "</p>" +
            "<p><strong>Tax:</strong> $" + inv.tax + "</p>" +
            "<p><strong>Total:</strong> $" + inv.totalCost + "</p>";

        container.appendChild(box); // Add invoice box to the container

        // Add a visual divider between invoices
        var divider = document.createElement("hr");
        divider.style.margin = "30px 0";
        divider.style.border = "1px solid #ff69b4";
        container.appendChild(divider);
    }
}

// SEARCH INVOICE FUNCTION
function SearchInvoice() {
    var trn = document.getElementById("searchTRN").value.trim(); // Get TRN from input
    var invoiceNumberInput = document.getElementById("searchInvoiceNumber").value.trim(); // Get invoice number from input
    var resultDiv = document.getElementById("searchResult"); // Result display element
    resultDiv.innerHTML = ""; // Clear previous results

    // Validate inputs
    if (!trn || !invoiceNumberInput) {
        resultDiv.innerHTML = "<p style='color:red;'>Enter TRN and Invoice Number.</p>";
        return;
    }

    if (!/^\d+$/.test(invoiceNumberInput)) {
        resultDiv.innerHTML = "<p style='color:red;'>Invoice Number must be a number.</p>";
        return;
    }

    var invoiceNumber = parseInt(invoiceNumberInput, 10); // Convert to integer

    // Gather all invoices from localStorage
    var allInvoices = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.endsWith("_Invoices")) {
            var invoices = JSON.parse(localStorage.getItem(key)) || [];
            for (var j = 0; j < invoices.length; j++) {
                allInvoices.push(invoices[j]);
            }
        }
    }

    // Find matching invoice
    var found = null;
    for (var i = 0; i < allInvoices.length; i++) {
        if (allInvoices[i].trn.trim() === trn && allInvoices[i].invoiceNumber === invoiceNumber) {
            found = allInvoices[i];
            break;
        }
    }

    // If invoice not found
    if (!found) {
        resultDiv.innerHTML = "<p style='color:red;'>No invoice found.</p>";
        console.log("No invoice found for TRN: " + trn + ", Invoice #: " + invoiceNumber);
        return;
    }

    console.log("Invoice found:", found);

    // Clean string helper function
    function cleanString(str) {
        return String(str || "").replace(/[^\x20-\x7E]/g, "").trim();
    }

    // Build purchased items HTML for the found invoice
    var purchasedHTML = "";
    if (found.purchasedItems && found.purchasedItems.length > 0) {
        for (var k = 0; k < found.purchasedItems.length; k++) {
            var item = found.purchasedItems[k];

            var itemName = cleanString(item.category);
            if (itemName === "") itemName = "Package";

            var themeName = "";
            if (cleanString(item.theme) !== "") themeName = "Theme: (" + cleanString(item.theme) + ")";

            var special = "";
            if (item.numberBalloon) special = "Balloon Number: " + item.numberBalloon;
            else if (item.backdropText) special = "Backdrop: " + cleanString(item.backdropText);

            var qty = item.quantity;
            if (!qty) qty = 1;

            purchasedHTML += "<p>Package:" + itemName + " - " + themeName + " - " + special +
                " - Qty:" + qty + " Price:$" + parseFloat(item.price).toFixed(2) + "</p>";
        }
    } else purchasedHTML = "<p>No items listed.</p>";

    // Display the found invoice in the result div
    resultDiv.innerHTML = "<div class='invoice-box'>" +
        "<h2>Invoice #: " + found.invoiceNumber + "</h2>" +
        "<p><strong>Date:</strong> " + found.date + "</p>" +
        "<p><strong>Company:</strong> " + found.companyName + "</p>" +
        "<p><strong>TRN:</strong> " + found.trn + "</p>" +
        "<h3>Shipping Details</h3>" +
        "<p><strong>Name:</strong> " + found.shippingDetails.name + "</p>" +
        "<p><strong>Address:</strong> " + found.shippingDetails.address + "</p>" +
        "<h3>Purchased Items</h3>" + purchasedHTML +
        "<h3>Payment Summary</h3>" +
        "<p><strong>Subtotal:</strong> $" + found.subtotal + "</p>" +
        "<p><strong>Tax:</strong> $" + found.tax + "</p>" +
        "<p><strong>Total:</strong> $" + found.totalCost + "</p>" +
        "</div>";
}

// Calculate age from date of birth
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age; // Return calculated age
}

// SHOW USER FREQUENCY FUNCTION
function ShowUserFrequency() {
    // Get users from localStorage key "RegistrationData"
    var users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    // Initialize gender and age counters
    var genderCount = { Male: 0, Female: 0, Other: 0 };
    var ageCount = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 };

    // Loop through each user to count gender and age
    for (var i = 0; i < users.length; i++) {
        var u = users[i];

        // Gender counting
        if (u.gender === "Male") genderCount.Male++;
        else if (u.gender === "Female") genderCount.Female++;
        else genderCount.Other++;

        // Age counting using calculateAge helper
        var age = calculateAge(u.dob);
        if (age >= 18 && age <= 25) ageCount["18-25"]++;
        else if (age >= 26 && age <= 35) ageCount["26-35"]++;
        else if (age >= 36 && age <= 50) ageCount["36-50"]++;
        else if (age > 50) ageCount["50+"]++;
    }

    // Create bar chart for gender distribution
    // Chart.js is used here
    // The chart shows number of users per gender category
    // labels: the names of the categories
    // data: the values corresponding to each category
    // backgroundColor: color of the bars
    // responsive: ensures chart resizes on window resize
    // legend display is false since label is shown on axis
    new Chart(document.getElementById("genderChart"), {
        type: "bar",
        data: {
            labels: ["Male", "Female", "Other"], // X-axis categories
            datasets: [{
                label: "Users", // Label for dataset
                data: [genderCount.Male, genderCount.Female, genderCount.Other], // Y-axis data
                backgroundColor: "#ff69b4" // Bar color
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    // Create bar chart for age distribution
    // Same approach as gender chart
    // Labels represent age groups and data represents number of users in each group
    new Chart(document.getElementById("ageChart"), {
        type: "bar",
        data: {
            labels: ["18-25", "26-35", "36-50", "50+"], // Age group labels
            datasets: [{
                label: "Users",
                data: [ageCount["18-25"], ageCount["26-35"], ageCount["36-50"], ageCount["50+"]],
                backgroundColor: "#ff69b4" // Bar color
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

