import './App.css'
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DataVisualization from './components/DataVisualization';

function App() {
  const [data, setData] = useState(null);

  const handleFileUpload = (fileData) => {
    // Set the parsed data received from the backend
    setData(fileData);
  };

  return (
    <div className="container">
      <h1>Data Analysis Tool</h1>
      <FileUpload onUpload={handleFileUpload} />
      <br />
      <br />
      <br />
       <DataVisualization data={data} />
    </div>
  );
}

export default App;
