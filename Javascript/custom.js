/* 

Name: Brittany McCarthy
ID: 2400662
Class: Friday UE2 7-9

This JavaScript file manages and validates the Custom Event Request form for “Slay by Britts”. 
It ensures that all fields are filled correctly, validates that the event date is not in the past, 
and saves each user’s submission to localStorage under their own key (“custom”) — 
similar to how the cart system stores user data.

This demonstrates:
 IA#2(a): DOM Manipulation (getElementById, querySelector, resetting form)
 IA#2(b): Event Handling (onclick triggers save() function)
 IA#2(c): Form Validation (checks empty fields and valid date)
 IA#2(d): Logic & Data Management (control structures, localStorage storage)

Linked in HTML using:
<script src="../Javascript/custom.js"></script>

*/



// FUNCTION: validateForm()
// Ensures all fields in the form are filled before saving.
// Also checks that the selected event date is not before today's date.

function validateForm() {

    // IA#2(a): DOM Manipulation — retrieving form input values using getElementById()
    // Also uses .trim() to remove any accidental spaces from user input.
    const firstName = document.getElementById("FirstName").value.trim();
    const lastName = document.getElementById("LastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const occasion = document.getElementById("occasion").value.trim();
    const colours = document.getElementById("colours").value.trim();
    let contact = document.getElementById("contact").value.trim();
    const budget = document.getElementById("budget").value.trim();
    const details = document.getElementById("details").value.trim();
    const date = document.getElementById("date").value.trim();
    const duration = document.getElementById("duration").value.trim();

    // IA#2(c): Form Validation — Check that no field is empty before proceeding
    // If any required field is empty, display an alert message and stop the process.
    if (!firstName || !lastName || !email || !occasion || !colours || !contact || !budget || !details || !date || !duration) {
        alert("Please fill out all required fields.");
        return false;
    }


    // Validate phone number (10 digits)
    contact = contact.replace(/\D/g, ''); // Remove non-digits
    if (contact.length !== 10) {
        alert("Phone number must be exactly 10 digits.");
        return false;
    }

   
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    if (!emailPattern.test(email)) {  // <── changed data.email → email
        alert("Please enter a valid email address that includes '@' and ends with '.com'.");
        return false;
    }


    // IA#2(c): Additional Validation — Ensure that the event date is not in the past.
    // Create a new Date object for the selected date.
    const selectedDate = new Date(date);
    // Create another Date object for today’s date.
    const today = new Date();
    // Remove the time portion from today’s date so the comparison checks date only.
    today.setHours(0, 0, 0, 0);

    // If the selected date is before today, alert the user and stop submission.
    if (selectedDate < today) {
        alert("Please select a valid date — event date cannot be in the past.");
        return false;
    }

    // If all fields are valid, return true to allow the save() function to continue.
    return true;
}



// FUNCTION: save()
// Saves the user’s custom form data to localStorage under their username key.
// Demonstrates DOM Manipulation, Event Handling, Logic, and LocalStorage interaction.

function save() {

    // Retrieve the current user’s username from localStorage.
    // This ensures the data is linked to the correct logged-in user.
    const username = localStorage.getItem("currentUser");

    // IA#2(d): Logic and Validation — if no user is logged in, show a message and stop.
    if (!username) {
        alert("User not logged in.");
        return;
    }

    // Proceed only if the form passes all validation checks.
    if (validateForm()) {

        // IA#2(a): DOM Manipulation — retrieving values again for storage
        // .trim() ensures clean data is stored in localStorage.
        const firstName = document.getElementById("FirstName").value.trim();
        const lastName = document.getElementById("LastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const occasion = document.getElementById("occasion").value.trim();
        const colours = document.getElementById("colours").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const budget = document.getElementById("budget").value.trim();
        const details = document.getElementById("details").value.trim();
        const date = document.getElementById("date").value.trim();
        const duration = document.getElementById("duration").value.trim();

        // IA#2(d): Data Storage Logic — Retrieve the “custom” object from localStorage.
        // If it doesn’t exist yet, create an empty object.
        let custom = JSON.parse(localStorage.getItem("custom")) || {};

        // If this specific user doesn’t have a custom entry yet, create one as an empty array.
        if (!custom[username]) {
            custom[username] = [];
        }

        // Add the new form submission (custom event details) to the user’s array.
        custom[username].push({
            firstName,
            lastName,
            email,
            occasion,
            colours,
            contact,
            budget,
            details,
            date,
            duration
        });

        // Save the updated custom object back into localStorage.
        localStorage.setItem("custom", JSON.stringify(custom));

        // IA#2(a): DOM Manipulation — dynamically update user with success feedback.
        alert("Custom form was successfully saved and sent! We will contact you via email as soon as possible.");

        // Reset the form after saving so the user sees a fresh form.
        document.getElementById("customForm").reset();
    }
}


