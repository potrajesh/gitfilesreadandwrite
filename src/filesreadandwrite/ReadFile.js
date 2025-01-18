import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReadFile() {
  const [fileContent, setFileContent] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Use the raw content URL from GitHub
    //const fileUrl = 'https://raw.githubusercontent.com/potrajesh/gitfilesreadandwrite/master/src/filesreadandwrite/content.txt';
    const fileUrl = 'https://raw.githubusercontent.com/potrajesh/gitfilesreadandwrite/content.txt';

    axios.get(fileUrl)
      .then(response => {
        // If the response contains contents and status, store them
        setFileContent(response.data);  // Assuming the raw content is returned here
        setStatus('Success');  // Assuming the status is 'Success' if the file loads correctly
      })
      .catch(error => {
        console.error('Error fetching file:', error);
        setStatus('Error');  // Set status to 'Error' if something goes wrong
      });
  }, []);

  return (
    <div>
      <h1>File Content</h1>
      {status && <p>Status: {status}</p>}  {/* Display status if available */}
      <pre>{fileContent}</pre>  {/* Display the raw file content */}
    </div>
  );
}

export default ReadFile;
