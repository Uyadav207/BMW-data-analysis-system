import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL_FILES } from '../../config/BaseUrl';
import CancelIcon from '@mui/icons-material/Cancel';

const FileList = ({ onUpdate }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all files from the server
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(BASE_URL_FILES);
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, [files]);

    const deleteFile = async (fileId) => {
        try {
            await axios.delete(`${BASE_URL_FILES}/${fileId}`);
            // Update the files state to reflect the deleted file
            setFiles(files.filter(file => file.id !== fileId));
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    // Handle visualization of data for a file
    const visualizeData = (file) => {
        onUpdate(file);
    };

    return (
        <div className="container mx-auto p-10">
            {/* {  loading ? <h2 className="text-2xl font-bold mb-4">Uploads</h2> : null} */}
            <div className="px-2">
                <div className="flex -mx-2">
                    {files.map(file => (
                        <div key={file.id} className="relative inline-block">
                            <button
                                className="text-white-700 text-center py-2 m-2"
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
            </div>
        </div>
    );
};

export default FileList;
