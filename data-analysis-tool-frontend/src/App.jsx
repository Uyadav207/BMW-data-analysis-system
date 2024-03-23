import './App.css';
import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import DataVisualization from './components/DataVisualization';
import FileList from './components/uploads/FileList';

function App() {
  const [data, setData] = useState(null);

  const handleFileUpload = (fileData) => {
    // Set the parsed data received from the backend
    setData(fileData);
  };

  useEffect(() => {
  }, [data]);

  return (
    <div className='max-w-auto'>
      <h1>Data Analysis Tool</h1>
      <FileUpload onUpload={handleFileUpload} />
      <FileList onUpdate={handleFileUpload} />
      {data !== null && <DataVisualization requestData={data} />}
    </div>
  );
}

export default App;
