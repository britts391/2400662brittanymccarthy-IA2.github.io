// account-locked.js
// Name: Yukalia Williams
// ID: 2406385
// Class: Tuesday UM2 11-1
// Function: Handle account lock countdown and page functionality
/*a visitor is given three (3) attempts to enter a correct trn and password. If login is successful, 
redirect the user to the product catalog. Otherwise, redirect the user to an error/account locked page.
*/

// Global variables
let timeLeft = 900; // 15 minutes in seconds
let timerInterval;

// Start the countdown timer when page loads
window.addEventListener('load', function() {
    startCountdown();
    
    // Check localStorage for existing lock time
    checkExistingLock();
});

// Function to start the countdown timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    // Store lock time if not already stored
    if (!localStorage.getItem('lockTime')) {
        localStorage.setItem('lockTime', new Date().getTime().toString());
    }
    
    // Start the timer interval
    timerInterval = setInterval(function() {
        updateDisplay(countdownElement);
    }, 1000);
}

// Function to update the countdown display
function updateDisplay(countdownElement) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // Format as MM:SS
    countdownElement.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Decrease time
    timeLeft--;
    
    // Check if time is up
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        unlockAccount(countdownElement);
    }
}

// Function to check for existing lock time
function checkExistingLock() {
    const lockTime = localStorage.getItem('lockTime');
    
    if (lockTime) {
        const currentTime = new Date().getTime();
        const timeElapsed = Math.floor((currentTime - parseInt(lockTime)) / 1000);
        
        // Adjust timeLeft based on elapsed time
        if (timeElapsed < 900) {
            timeLeft = 900 - timeElapsed;
        } else {
            // Account should already be unlocked
            timeLeft = 0;
            unlockAccount(document.getElementById('countdown'));
        }
    }
}

// Function to unlock the account
function unlockAccount(countdownElement) {
    countdownElement.textContent = "00:00";
    countdownElement.style.color = "#4CAF50";
    
    // Show the try again button
    document.getElementById('tryAgainBtn').style.display = "inline-block";
    
    // Update message
    document.querySelector('.warning-box').innerHTML = 
        '<h3>Account Unlocked</h3><p>Your account is now unlocked. You can try logging in again.</p>';
    
    // Clear lock data from localStorage
    localStorage.removeItem('accountLocked');
    localStorage.removeItem('lockTime');
    localStorage.removeItem('failedAttempts');
}

// Function to navigate to login page
function goToLogin() {
    window.location.href = "../Codes/SignIn.html";
}

// Function to navigate to homepage
function goToHome() {
    window.location.href = "../Codes/Login.html";
}