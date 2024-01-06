function typeWriter(text, i, element) {
  if (i < text.length) {
   document.getElementById(element).innerHTML += text.charAt(i);
   i++;
   setTimeout(function() {
     typeWriter(text, i, element);
   }, 50); 
 }
}
// Call the typing effect function
window.onload = function() {
var text = 'Welcome to Basil web app.. currently on responsive design';  // Text to be typed
var i = 0;
typeWriter(text, i, 'typed-text'); 
};