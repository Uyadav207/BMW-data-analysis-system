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
    <div className='p-3 rounded-2xl max-w-auto'>
      <h1 className='my-5'>Data Analysis Tool</h1>
      <FileUpload onUpload={handleFileUpload} />
      <FileList onUpdate={handleFileUpload} />
      {data !== null && <DataVisualization requestData={data} />}
    </div>
  );
}

export default App;
