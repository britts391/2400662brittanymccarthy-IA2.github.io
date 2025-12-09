/* 
Name: Brittany McCarthy(did indvidual Assigmnet 2)
ID: 2400662
Class: UE2 7-9pm

Uses TRN and Password for login
Validates against localStorage key: RegistrationData
 Allows 3 attempts only
 Redirects on success (ProductCatalog.html)
 Redirects on lock-out (AccountLocked.html)

Includes DOM Manipulation, Event Handling, Validation, and Logic.
*/

let attempts = 0; // Track failed login attempts (IA#2d: logic)

// FUNCTION: Password(fieldId)
// PURPOSE: Show/hide password text using checkbox
function Password(fieldId) {
    const field = document.getElementById(fieldId);

    if (field.type === "password") {
        field.type = "text";
    } else {
        field.type = "password";
    }
}

// FUNCTION: validateForm()
// Checks that TRN and password fields are not empty
function validateForm() {

    const trn = document.getElementById("trn").value.trim();   // (IA#2a)
    const password = document.getElementById("password").value.trim(); // (IA#2a)

    if (!trn || !password) { // (IA#2c)
        alert("Please enter both TRN and password.");
        return false;
    }
    return true;
}

// FUNCTION: login()
// PURPOSE: Validates TRN + Password against RegistrationData
//          Allows 3 attempts only
function login() {

    if (!validateForm()) return; // stop if form validation fails

    const trn = document.getElementById("trn").value.trim();      // TRN field
    const password = document.getElementById("password").value.trim(); // password field

    // Retrieve registration records (array of objects)
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    let found = false; // track matching account

    // LOOP: search for matching TRN + Password
    for (let i = 0; i < users.length; i++) {

        if (users[i].trn === trn && users[i].password === password) {
            found = true;
            break;
        }
    }

    // SUCCESSFUL LOGIN
    if (found) {

        alert("Login successful!");

        // Store current user TRN for later use if needed
        localStorage.setItem("currentUser", trn);

        // Reset attempts after successful login
        attempts = 0;

        // Redirect user to product catalog page (IA Integration)
        window.location.href = "SlayByBritts.html";
    }

    // FAILED LOGIN
    else {

        attempts++;

        if (attempts >= 3) {
            alert("Too many failed attempts. Password Lock");
            

            // Redirect to lock-out error page
            window.location.href = "AccountLocked.html";
        }
        else {
            alert(`Incorrect TRN or password. Attempts left: ${3 - attempts}`);
        }
    }
}

// Clears the login form (Cancel button)
function clearLoginForm() {
    document.getElementById("loginForm").reset();
}

/*Name: Caleighia Walters 
ID: 2404248
Class: Friday UE2 7-9
 */

/*
   FEATURE: Auto-format TRN Input (###-###-###)
   PURPOSE: Enhances UX by inserting dashes automatically
   Demonstrates:
       DOM Manipulation — directly updates input value
      Live Event Handling — runs on every keystroke
      String Logic — strips non-digits and rebuilds format
 */
document.getElementById("trn").addEventListener("input", function (e) {

    // Remove all non-digits to sanitize input
    let digits = e.target.value.replace(/\D/g, "");

    // Insert dashes at positions 3 and 6 (###-###-###)
    if (digits.length > 3 && digits.length <= 6) {
        digits = digits.slice(0, 3) + "-" + digits.slice(3);
    } else if (digits.length > 6) {
        digits = digits.slice(0, 3) + "-" + digits.slice(3, 6) + "-" + digits.slice(6, 9);
    }

    // Update field with formatted value
    e.target.value = digits;

});
