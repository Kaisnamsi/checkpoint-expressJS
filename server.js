const express = require('express');

const app = express();
const port = 3000;

// Custom middleware to verify the time of the request
const checkWorkingHours = (req, res, next) => {
  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHour = currentTime.getHours();

  if (currentDay >= 1 && currentDay <= 5) { // Monday to Friday
    if (currentHour >= 9 && currentHour < 18) { // 9 AM to 5 PM
      next(); // Proceed to the next middleware or route handler
    } else {
      res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 to 17).');
    }
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

// Set up middleware to check working hours for all routes
app.use(checkWorkingHours);

// Set up static files directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/public/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
