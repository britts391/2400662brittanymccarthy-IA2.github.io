/*Name: Caleighia Walters 
ID: 2404248
Class: Friday UE2 7-9
 */

/* 
   ResetPassword.js
   Handles updating the password stored in localStorage
   question
   for a specific user identified by their formatted TRN.
   Reset Password hyperlink (used to allow the user to change their password that is associated with the localStorage key called, 
   RegistrationData by matching their trn.


*/

function resetPassword() {

    let trn = document.getElementById("trn").value.trim();
    let newPass = document.getElementById("newPass").value.trim();
    let confirmPass = document.getElementById("confirmPass").value.trim();
    let msg = document.getElementById("message");

    // Basic validation for empty fields
    if (!trn || !newPass || !confirmPass) {
        msg.textContent = "All fields are required.";
        msg.style.color = "red";
        return;
    }

    // Validate TRN format (XXX-XXX-XXX)
    let trnPattern = /^\d{3}-\d{3}-\d{3}$/;

    if (!trnPattern.test(trn)) {
        msg.textContent = "Invalid TRN format. Use XXX-XXX-XXX.";
        msg.style.color = "red";
        return;
    }


    // Check if new passwords match
    if (newPass !== confirmPass) {
        msg.textContent = "Passwords do not match.";
        msg.style.color = "red";
        return;
    }

    // Retrieve registration data
    let regData = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    // Locate user by TRN
    let userIndex = regData.findIndex(record => record.trn === trn);

    if (userIndex === -1) {
        msg.textContent = "TRN not found. Cannot reset password.";
        msg.style.color = "red";
        return;
    }

    // Update password
    regData[userIndex].password = newPass;

    // Save updated data
    localStorage.setItem("RegistrationData", JSON.stringify(regData));

    msg.textContent = "Password successfully reset!";
    msg.style.color = "green";

    // Optionally clear fields
    document.getElementById("newPass").value = "";
    document.getElementById("confirmPass").value = "";
}


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