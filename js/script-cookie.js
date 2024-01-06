console.log("Console Log: ok");
console.log("Cookie existance? : " + document.cookie)

// Function to set a cookie if it doesn't exist
function setCookieIfNotExists(name, value, daysToExpire) {
    if (!getCookie(name)) {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
}

// Set 'hasCookies' cookie only if it doesn't exist
setCookieIfNotExists('hasCookies', 'False', 7);


// Function to get a specific cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if this cookie has the specified name
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1); // Corrected substring length
        }
    }
    
    return null; // Return null if the cookie with the given name is not found
}

// Function to set a cookie
function setCookie(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
  
// Get the value of the 'hasCookies' cookie
const cookieValue = getCookie('hasCookies');

// Check the cookie value and display the popup if necessary
if (cookieValue !== "True") {
    setTimeout(displayPopup, 1000); // Display popup after 5 seconds if the cookie value is 'False'
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function denyCookies() {
    deleteCookie('hasCookies');
    
}

function displayPopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('show');
}

function acceptandclose() {
    setCookie('hasCookies', 'True', 7);
    console.log(getCookie('hasCookies'));
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

function denyandclose() {
    deleteCookie('hasCookies');
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

function denyandredirect() {
    deleteCookie('hasCookies');
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
    window.location.href = 'https://www.google.com';
}
  
 

  
  
  
  
  
  