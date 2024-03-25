import './App.css';
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DataVisualization from './components/DataVisualization';
import FileList from './components/uploads/FileList';

function App() {
  // State to hold data received from file upload
  const [data, setData] = useState(null);

  // Handler function to remove data when all files are deleted
  const handleDelete = (files) => {
    if (files.length === 0) setData(null); // If no files left, reset data state
  };

  // Handler function to set data received from file upload
  const handleFileUpload = (fileData) => {
    setData(fileData); // Set data received from file upload
  };

  return (
    <div className='p-3 rounded-2xl max-w-auto'>
      <h1 className='my-5'>Data Analysis Tool</h1>
      {/* Component for file upload */}
      <FileUpload onUpload={handleFileUpload} />
      {/* Component to display uploaded files */}
      <FileList onUpdate={handleFileUpload} onUpdateDelete={handleDelete} />
      {/* Conditional rendering of data visualization component */}
      {data !== null && <DataVisualization requestData={data} />}
    </div>
  );
}

export default App;
