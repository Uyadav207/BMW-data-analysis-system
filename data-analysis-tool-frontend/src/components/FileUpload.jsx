import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL_UPLOAD } from '../config/BaseUrl';

function FileUpload({ onUpload }) {
  // State to hold the selected file
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    // Check if a file is selected
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    // Create FormData object and append selected file
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Send POST request to upload endpoint with FormData
      const response = await axios.post(BASE_URL_UPLOAD, formData);
      // Pass uploaded file data to parent component
      onUpload(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      {/* Input field for file selection */}
      <input type="file" onChange={handleFileChange} />
      {/* Button to trigger file upload */}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
