
/* 
   Brittany McCarthy 
   ID: 2400662
   Class: Friday UE2 7-9
  
  
*/


/*
   (IA#2 Question 2a: DOM Manipulation)
   • Demonstrates correct use of DOM functions such as
     querySelector() to access and manipulate HTML elements.
   • Dynamically updates the DOM and CSS properties in response
     to user actions (e.g., hover effects on text).
   */

// Accessing the element with the class name "logo" using querySelector()
// and assigning an event listener to handle click events.
document.querySelector(".logo").addEventListener("click", function () {
    // This function runs when the logo is clicked.
    // It dynamically updates user interaction by displaying a message box.
    alert("Clicking our logo I see ! Welcome to Slay By Britts :)!!!!");
});


// Accessing the heading element inside the div with the class "heading".
// We use querySelector() to locate it, then attach an event listener that
// changes its style dynamically when the mouse hovers over it.
document.querySelector(".heading h1").addEventListener("mouseover", function () {
    // (IA#2 Question 2a continued)
    // DOM manipulation example: dynamically change color and font style
    // when mouse hovers over the heading.
    this.style.color = "hotpink";     // CSS property modified by JavaScript
    this.style.fontStyle = "italic";  // Adds emphasis effect
});


// Event listener for when the mouse moves off the heading.
// Restores original text color and font style.
document.querySelector(".heading h1").addEventListener("mouseout", function () {
    // (IA#2 Question 2a continued)
    // Resetting the dynamic CSS properties back to their defaults
    this.style.color = "black";
    this.style.fontStyle = "normal";
});


/* 
   (IA#2 Question 2b: Event Handling)
   • Demonstrates at least two working event listeners and
     their respective handlers:
        1. Logo click shows alert message.
        2. Heading hover changes text color and style.
   • Uses appropriate event types: click, mouseover, and mouseout.
    */




function logout() {
    // Remove only the current user's session info from localStorage.
    // This simulates logging out functionality.
    localStorage.removeItem("currentUser");

    // Provide user feedback using an alert box (basic interactivity).
    alert("You have been logged out successfully!");

    // (IA#2 Question 2a & 2d)
    // Dynamic DOM-based redirection to the login page.
    window.location.href = "../Codes/Login.html";
}


