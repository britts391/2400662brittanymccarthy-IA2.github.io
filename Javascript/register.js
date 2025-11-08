
/* 

Name: Brittany McCarthy
ID: 2400662
Class: Friday UE2 7-9

FILE SUMMARY:
This JavaScript manages user registration.  
It validates input fields, ensures unique usernames,  
toggles password visibility, and saves user credentials 
in localStorage.

IA#2 Demonstrations:
 (a) DOM Manipulation — Reads and modifies form fields dynamically  
 (b) Event Handling — save() & togglePassword() triggered by events  
 (c) Form Validation — Checks empty fields, password match, uniqueness  
 (d) Logic — Uses conditions, loops, and storage management  
 (3) Integration — External JS file with clean, accessible HTML

*/



// FUNCTION: togglePassword()
// PURPOSE: Show/hide password text dynamically

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = (field.type === "password") ? "text" : "password"; // Toggle visibility
}



// FUNCTION: validateForm()
// PURPOSE: Check all input fields and password confirmation
//c. Form Validation / Input Handling 
//•	Simple validation(e.g., check if a field is empty, validate email format, etc).
//•	Uses JavaScript functions or updates the DOM with error messages.


function validateForm() {/* get values for different variables from user input in form */
    const firstName = document.getElementById("FirstName").value.trim();
    const lastName = document.getElementById("LastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Check if any fields are empty
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
        alert("Please fill out all required fields.");
        return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return false;
    }

    return true;
}


//a. DOM Manipulation
//•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
//•	Dynamically update HTML and CSS using Js.

// FUNCTION: save()
// PURPOSE: Save new user data to localStorage after validation

function save() {
    if (validateForm()) {// if validation is true will get variables from user's input  in form
        const firstName = document.getElementById("FirstName").value.trim();
        const lastName = document.getElementById("LastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Retrieve all users from localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if username already exists in the users array by using some method which check to see if atleast 1 element in the array is equal to the variable you are comparing .
        var exists = users.some(function (user) {
            // Compare the username property of each user object with the entered username
            return user.username === username;
        });

        // If a match is found, show an alert and stop further execution
        if (exists) {
            alert("Username already exists. Please choose another."); /*Form Validation / Input Handling 
•	Simple validation(e.g., check if a field is empty, validate email format, etc).*/

            return;
        }

        // Add new user
        users.push({ firstName, lastName, email, username, password });

        // Save back to storage
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");
        window.location.href = "index.html"; // Redirect to login page
    }
}

