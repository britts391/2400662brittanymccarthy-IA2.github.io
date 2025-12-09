
/* 
Name: Brittany McCarthy
ID: 2400662
Class: Friday UE2 7-9

This JavaScript file provides functionality for the Login Page of the 
“Slay by Britts” website. It contains two simple event-driven functions 
that open new windows (or tabs) when users click the "Sign in" or "Register" buttons.

*/
/* 
Function: signin()
Purpose: Opens the “signin.html” page in a new browser tab.
Triggered by: The "Sign in" button’s onclick event in the HTML file.
IA2 Match: Demonstrates event handling and function creation.
*/
function signin() {
    window.location.href="../Codes/SignIn.html" ;
    // window.location.href  is a built-in JavaScript property that opens and redirect to a new page.
    // "signin.html" is the target page.

    //window.open("../Codes/SignIn.html", "_blank"); would be use if wanted a new tab

   
}


/* 
Function: Register()
Purpose: Opens the “Register.html” page in a new browser tab when the user clicks “Register”.
Triggered by: The "Register" button’s onclick event in the HTML file.
IA2 Match: Demonstrates function call in response to a user event.
*/
function Register() {
    window.location.href="../Codes/Register.html";
    // Redirects to the registration form page, allowing new users to sign up.
}
