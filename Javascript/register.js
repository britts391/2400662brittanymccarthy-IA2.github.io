
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



/* 
   FUNCTION: Password(fieldId)
   PURPOSE: Toggles visibility of password fields
   Demonstrates: DOM Manipulation + Event Handling
*/
function Password(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = (field.type === "password") ? "text" : "password";
}



/* 
   FUNCTION: validateForm()
   PURPOSE: Validate all form inputs before saving
   Includes:
      Empty field checks
      Email validation
     Phone validation (10 digits)
      TRN validation and format (000-000-000)
      Age ≥ 18 requirement
     Password length ≥ 8
      Password match

      question 1
      User Authentication (LocalStorage)
Registration Page:
create a registration form where users can enter their first name, last name, date of birth, gender, phone number, email, tax registration number (trn), and password, etc. 
Validate the form to ensure:
all fields are filled (HTML validation). JavaScript Error handling.
passwords should be at least 8 characters long.
visitor must be over 18 years old to register. Calculate age using JavaScript.
trn is unique; must be of length and in the format (000-000-000). **trn is used instead of a username with login.
store registration information (ie. first name, last name, date of birth, gender, phone number, email, tax registration number (trn), password, date of registration, cart{}, invoices[]) as a JavaScript object. Each registration record must be appended to localStorage key called RegistrationData using JavaScript (as an array of objects.)
Include the following buttons: 
Register (used to stored registration form data) 
Cancel (used to clear data from the registration form)


 */
function validateForm() {

    // Read values from form inputs
    const firstName = document.getElementById("FirstName").value.trim();
    const lastName = document.getElementById("LastName").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const trn = document.getElementById("trn").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // --- Check for EMPTY FIELDS ---
    if (!firstName || !lastName || !dob || !gender || !phone || !email || !trn || !password || !confirmPassword) {
        alert("Please fill out all required fields.");
        return false;
    }

    // --- Validate EMAIL FORMAT ---
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // --- Validate PHONE NUMBER (10 digits) ---
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return false;
    }

    // --- Validate TRN FORMAT (000-000-000) ---
    const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
    if (!trnPattern.test(trn)) {
        alert("TRN must follow the format 000-000-000.");
        return false;
    }

    // --- Age VALIDATION and birthday must not be in the future (Must be 18+) ---
    const birthDate = new Date(dob);
    const today = new Date();

    // Check if birthday is in the future
    if (birthDate > today) {
        alert("Date of birth cannot be in the future.");
        return false;
    }

    // Calculate age properly
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--; // birthday hasn't occurred yet this year
    }

    if (age < 18) {
        alert("You must be at least 18 years old to register.");
        return false;
    }



    // --- Validate PASSWORD LENGTH ---
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false;
    }

    // --- Validate PASSWORD MATCH ---
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    return true; // Validation passed
}


/*Name: Caleighia Walters 
ID: 2404248
Class: Friday UE2 7-9
Login Page:
create a login form where visitors can enter their TRN and password provided at registration.
validate this login data by checking the currently entered trn and password against data associated with the localStorage key called, RegistrationData. 
a visitor is given three (3) attempts to enter a correct trn and password. If login is successful, redirect the user to the product catalog. Otherwise, redirect the user to an error/account locked page.
Include the following:
Login button (validate user login information)
Cancel button (used to clear data from the Login form)
Reset Password hyperlink (used to allow the user to change their password that is associated with the localStorage key called, RegistrationData by matching their trn.


 */
/* 
   FUNCTION: save()
   PURPOSE: Save valid user data to localStorage
   Demonstrates:
     • JSON storage
     • Array iteration
     • Uniqueness checks
 */
function save() {

    if (validateForm()) {

        // Get all form values
        const firstName = document.getElementById("FirstName").value.trim();
        const lastName = document.getElementById("LastName").value.trim();
        const dob = document.getElementById("dob").value.trim();
        const gender = document.getElementById("gender").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const trn = document.getElementById("trn").value.trim();
        const password = document.getElementById("password").value.trim();

        // Retrieve existing users or create new array
        let RegistrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];


        // Check if TRN already exists (unique identifier)
        const exists = RegistrationData.some(function (user) {
            return user.trn === trn; // TRN used instead of username
        });

        if (exists) {
            alert("TRN already exists. Please check again.");
            return;
        }

        // Construct new registration object
        const newRecord = {
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            gender: gender,
            phone: phone,
            email: email,
            trn: trn,
            password: password,

            // NEW REQUIRED FIELDS
            dateOfRegistration: new Date().toISOString().split("T")[0], // YYYY-MM-DD
           
        };

        // Append new record
        RegistrationData.push(newRecord);

        // Save back to localStorage
        localStorage.setItem("RegistrationData", JSON.stringify(RegistrationData));

        alert("Registration successful!");
        window.location.href = "Login.html"; // Redirect
    }
}



/* 
   FUNCTION: clearForm()
   PURPOSE: Clears all inputs when Cancel button is clicked
 */
function clearForm() {
    document.getElementById("registerForm").reset();
}


/* 
   FEATURE: Auto-format TRN Input (###-###-###)
   PURPOSE: Enhances UX by inserting dashes automatically
   Demonstrates:
       DOM Manipulation — directly updates input value
       Live Event Handling — runs on every keystroke
       String Logic — strips non-digits and rebuilds format*/
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
