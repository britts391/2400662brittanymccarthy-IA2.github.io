/* 

Name: Brittany McCarthy
ID: 2400662
Class:UE2  7-9pm


This script powers the login page. It validates user input, checks
credentials stored in localStorage, and limits login attempts to
three. It also supports toggling password visibility.

IA#2 Demonstrations:
 (a) DOM Manipulation — accesses and updates HTML elements dynamically  
 (b) Event Handling — login() and togglePassword() triggered by user actions  
 (c) Form Validation — checks for empty fields before processing login  
 (d) Basic Interactivity / Logic — uses loops, conditionals, and arithmetic  
 (3) Integration — linked externally; interacts with HTML & CSS cleanly

*/

let attempts = 0; // (IA#2d: Basic Logic) Initialize a counter to track login attempts



// FUNCTION: togglePassword(fieldId)
// PURPOSE: Toggles visibility of the password field when the user clicks
// the "Show Password" button. Demonstrates DOM Manipulation and
//Event Handling
/*a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
b. Event Handling 
•	At least two (2) working event listeners and respective handlers.
*/

// This function toggles the visibility of a password input field
function Password(fieldId) {//  . The ID is passed as a parameter to the function

   // Get the input field element by its ID
  
    const field = document.getElementById(fieldId);

    // Check the current type of the input field
    // If the type is "password", it means the characters are hidden
    // So  the function change it to type "text" to make the password visible
    // If the type is "text", it means the password is currently visible
    // So we change it back to "password" to hide the characters
    if (field.type === "password") {
        // Change the input type to "text" to show the password
        field.type = "text";
    } else {
        // Change the input type back to "password" to hide the password
        field.type = "password";
    }
}


// FUNCTION: validateForm()
// Checks that both the username and password fields are filled out
// before attempting login. Demonstrates (IA#2c: Form Validation).
function validateForm() {

    // Retrieve the text typed into the username field
    const username = document.getElementById("username").value.trim(); // (IA#2a)

    // Retrieve the text typed into the password field
    const password = document.getElementById("password").value.trim(); // (IA#2a)

    // Check if either input is empty — simple validation check
    if (!username || !password) { // (IA#2c)
        alert("Please fill out all required fields."); // Display message to user (IA#2a)
        return false; // Stop the form submission
    }

    // If both fields have values, validation passes
    return true;
}



// FUNCTION: login()
//  Runs when the user clicks "Login". It validates inputs,
// checks credentials in localStorage, and tracks failed attempts.
// Demonstrates:
//    (IA#2a) DOM Manipulation (getElementById, localStorage)
//    (IA#2b) Event Handling (triggered via button click)
//    (IA#2c) Input Validation
//   (IA#2d) Logic with loops, conditionals, arithmetic
// 
function login() {

    // Run form validation first; if it fails, stop further processing
    if (!validateForm()) return; // (IA#2c)

    // Get the username and password values again (now that validation passed)
    const username = document.getElementById("username").value.trim(); // (IA#2a)
    const password = document.getElementById("password").value.trim(); // (IA#2a)

    // Retrieve all registered users from localStorage.
    // localStorage stores data as strings,
    // so we use JSON.parse() to convert it back to a JavaScript array.
    let users = JSON.parse(localStorage.getItem("users")) || []; // (IA#2a)

    // Variable to track whether a matching account was found
    let found = false; // (IA#2d)

    // (IA#2d) Loop through the array of saved users
    for (let i = 0; i < users.length; i++) {

        // Check if the current user's username and password match the inputs
        if (users[i].username === username && users[i].password === password) {/* three equal sign means strict equality we use to ensure no converting of one data type to the next is taking place when trying to compare objects*/
            found = true; // Match found
            break; // Exit the loop early to save time
        }
    }

    // (IA#2d) Conditional logic to handle login success or failure
    if (found) {
        // If a valid account is found, save the current user to localStorage
        localStorage.setItem("currentUser", username); // (IA#2a)

        // Notify the user that the login was successful
        alert("Login successful!"); // (IA#2a: DOM feedback)

        // Redirect the user to the homepage using JavaScript (Integration)
        window.location.href = "SlayByBritts.html"; // (IA#3a)
    }
    else {
        // Increase the number of failed login attempts
        attempts++; // (IA#2d: Arithmetic)

        // If the user fails 3 times, block further attempts temporarily
        if (attempts >= 3) { // (IA#2d: Conditional Logic)
            alert("Password wrong 3 times. Try again later."); // Inform the user
            window.location.href = "Login.html"; // Reload login page (IA#3a)
        }
        else {
            // Otherwise, inform the user how many attempts remain
            alert(`Incorrect username or password. Attempts left: ${3 - attempts}`); // (IA#2d)
        }
    }
}
