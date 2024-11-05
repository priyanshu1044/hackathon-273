"use client";
import React, { useRef, useState } from 'react';

const UploadFile = ({ endpoint, text, setUploadedFileName }) => {
    const fileInput = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); // State for loading

    const handleFileSelect = async (event) => {
        const selectedFile = Array.from(event.target.files);
        
        if (!selectedFile) {
            console.log("No File found!");
            return;
        }

        // Update the uploaded file name in the parent component
        setUploadedFileName(selectedFile[0].name); // Set the file name

        setLoading(true);  // Set loading state to true
        await handleSubmit(endpoint, selectedFile);
        setFile(selectedFile);
        setLoading(false);  // Set loading state to false
    };

    const triggerFileInputClick = () => {
        fileInput.current.click();
    };

    const handleSubmit = async (endpoint, selectedFile) => {
        try {
            const data = new FormData();
            selectedFile.forEach((file, index) => {
                data.append(`files[${index}]`, file);
            });

            const response = await fetch(`/api/${endpoint}`, {
                method: "POST",
                body: data,
            });

            const searchRes = await response.json();
            console.log(searchRes);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative">
            <input
                type='file'
                id='fileInput'
                name='pdf'
                accept='application/pdf'
                hidden
                onChange={handleFileSelect}
                ref={fileInput}
                multiple
            />
            <label htmlFor='fileInput'>
                <button
                    onClick={triggerFileInputClick}
                    className="py-2 px-6 mb-4 rounded-full border border-gray-500 shadow hover:shadow-lg bg-white hover:bg-white"
                >
                    {text}
                </button>
            </label>

            {loading && (
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
                    <div className="h-full bg-blue-500 animate-pulse" style={{ width: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default UploadFile;
