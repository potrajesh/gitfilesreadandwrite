import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReadFile() {
  const [fileContent, setFileContent] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fileUrl = 'https://raw.githubusercontent.com/potrajesh/javapractice-interview/master/syllabus';

    axios.get(fileUrl)
      .then(response => {
        // Assuming response.data is an object with keys: contents and status
        setFileContent(response.data.contents);  // Accessing the 'contents' key
        setStatus(response.data.status);  // Accessing the 'status' key, if needed
      })
      .catch(error => console.error('Error fetching file:', error));
  }, []);

  return (
    <div>
      <h1>Syllabus Content</h1>
      {status && <p>Status: {status}</p>}  {/* Display status if available */}
      <pre>{fileContent}</pre>  {/* Display the file content */}
    </div>
  );
}

export default ReadFile;
