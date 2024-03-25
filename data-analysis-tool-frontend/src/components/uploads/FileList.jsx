import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL_FILES } from '../../config/BaseUrl';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';

const FileList = ({ onUpdate, onUpdateDelete }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFiles = async () => {
        setLoading(true); // Set loading state to true before fetching files
        try {
            const response = await axios.get(BASE_URL_FILES);
            if (response.data.length == 0) alert('No files in database');
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        } finally {
            setLoading(false); // Set loading state back to false after fetching files
        }
    };

    const deleteFile = async (fileId) => {
        try {
            await axios.delete(`${BASE_URL_FILES}/${fileId}`);
            // Update the files state to reflect the deleted file
            setFiles(prevFiles => {
                const updatedFiles = prevFiles.filter(file => file.id !== fileId);
                if (updatedFiles.length === 0) {
                    onUpdateDelete(updatedFiles);
                }
                return updatedFiles;
            });


            // Call onUpdateDelete only if there are no files left after deletion
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };



    // Handle visualization of data for a file
    const visualizeData = (file) => {
        onUpdate(file);
    };


    return (
        <div className="mx-auto p-10 max-w-screen-lg">
            <button className='m-4 self-center' onClick={fetchFiles}>View All Uploads</button>
            {loading ? <CircularProgress /> :
                <div className="flex flex-wrap -mx-2">
                    {files.map(file => (
                        <div key={file.id} className="relative inline-block p-2">
                            <button
                                className="text-white-700 text-center w-full"
                                onClick={() => visualizeData(file)}
                            >
                                {file.filename}
                            </button>
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
