// HTML element where the clock will be displayed
var clockElement = document.getElementById('clock');

function updateClock() {
  // Get the current date and time
  var currentTime = new Date();

  // Extract the hours, minutes, and seconds from the current time
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  // Pad the numbers with leading zeros if necessary
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  // Construct the string for the clock display
  var clockText = hours + ":" + minutes + ":" + seconds;

  // Update the clock element with the new time
  clockElement.textContent = clockText;
  
}

// Call the updateClock function initially to avoid a delay
updateClock();

// Update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);
