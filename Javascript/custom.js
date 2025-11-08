/* 

Name: Brittany McCarthy
ID: 2400662
Class: Friday UE2 7-9


This file validates and saves data from a custom event request form.  
It ensures all fields are filled before saving the submission 
to localStorage and confirming success.

*/





/*a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.


FUNCTION: validateForm() ensure all input fields are filled before saving*/  



function validateForm() {
    const firstName = document.getElementById("FirstName").value.trim();//  getting value from form inputed by the user in html. Also use trim to remove white spaces.
    const lastName = document.getElementById("LastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const occasion = document.getElementById("occasion").value.trim();
    const colours = document.getElementById("colours").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const budget = document.getElementById("budget").value.trim();
    const details = document.getElementById("details").value.trim();
    const date = document.getElementById("date").value.trim();
    const duration = document.getElementById("duration").value.trim();

    // General input validation for all fields
    if (!firstName || !lastName || !email || !occasion || !colours || !contact || !budget || !details || !date || !duration) {
        alert("Please fill out all required fields.");
        return false;
    }

    return true;
}



// FUNCTION: save() Save form data to localStorage for logged in user
function save() {
    const username = localStorage.getItem("currentUser");
    if (!username) {
        alert("User not logged in.");
        return;
    }

     /*a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
 Only proceed if form passes validation*/
    if (validateForm()) {
        const firstName = document.getElementById("FirstName").value.trim();/*use trim to remove white spaces*/
        const lastName = document.getElementById("LastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const occasion = document.getElementById("occasion").value.trim();
        const colours = document.getElementById("colours").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const budget = document.getElementById("budget").value.trim();
        const details = document.getElementById("details").value.trim();
        const date = document.getElementById("date").value.trim();
        const duration = document.getElementById("duration").value.trim();

        // Retrieve existing form submissions or initialize new array
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Add new form data
        users.push({ firstName, lastName, email, occasion, colours, contact, budget, details, date, duration });

        // Save back to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        alert("Custom form was successfully saved and sent! We will contact you via email as soon as possible.");
    }
}
