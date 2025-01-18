const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import CORS

const app = express();
const port = 5000;  // You can change the port number if needed

// Enable CORS for all origins
app.use(cors()); // This allows all origins. You can customize it if needed

// Middleware to parse JSON data
app.use(bodyParser.json());

// Endpoint to handle form submission and write to file
app.post('/submit-form', (req, res) => {
  const { taskDateTime, taskName, challengesFaced, completedDateTime } = req.body;
  
  const data = `Task Date and Time: ${taskDateTime}
                Task Name: ${taskName}
                Challenges Faced: ${challengesFaced}
                Completed Date and Time: ${completedDateTime}`;

  // Update the path to where content.txt is located
  const filePath = path.join(__dirname, 'gitfilesreadandwrite', 'src', 'filesreadandwrite', 'content.txt');

  // Write the data to content.txt file
  fs.appendFile(filePath, data + '\n\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Error writing to file');
    }
    res.status(200).send('Data written to content.txt successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
