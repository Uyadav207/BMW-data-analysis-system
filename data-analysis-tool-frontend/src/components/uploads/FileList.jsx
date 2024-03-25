import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL_FILES } from '../../config/BaseUrl'; // Importing BASE_URL_FILES from config
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';

const FileList = ({ onUpdate, onUpdateDelete }) => {
    // State to hold files and loading status
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch files from server
    const fetchFiles = async () => {
        setLoading(true); // Set loading state to true before fetching files
        try {
            const response = await axios.get(BASE_URL_FILES);
            if (response.data.length === 0) alert('No files in database');
            setFiles(response.data); // Set files state with fetched data
        } catch (error) {
            console.error('Error fetching files:', error);
        } finally {
            setLoading(false); // Set loading state back to false after fetching files
        }
    };

    // Function to delete a file
    const deleteFile = async (fileId) => {
        try {
            await axios.delete(`${BASE_URL_FILES}/${fileId}`);
            // Update the files state to reflect the deleted file
            setFiles(prevFiles => {
                const updatedFiles = prevFiles.filter(file => file.id !== fileId);
                if (updatedFiles.length === 0) {
                    onUpdateDelete(updatedFiles); // Call onUpdateDelete only if there are no files left after deletion
                }
                return updatedFiles;
            });
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    // Function to visualize data for a file
    const visualizeData = (file) => {
        onUpdate(file);
    };

    return (
        <div className="mx-auto p-10 max-w-screen-lg">
            {/* Button to fetch all files */}
            <button className='m-4 self-center' onClick={fetchFiles}>View All Uploads</button>
            {/* Display loading spinner while fetching files */}
            {loading ? <CircularProgress /> :
                <div className="flex flex-wrap -mx-2">
                    {/* Display each file */}
                    {files.map(file => (
                        <div key={file.id} className="relative inline-block p-2">
                            {/* Button to visualize file data */}
                            <button
                                className="text-white-700 text-center w-full"
                                onClick={() => visualizeData(file)}
                            >
                                {file.filename}
                            </button>
                            {/* Button to delete file */}
                            <CancelIcon
                                className="absolute top-0 right-0 cursor-pointer"
                                onClick={() => deleteFile(file.id)}
                            />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default FileList;
