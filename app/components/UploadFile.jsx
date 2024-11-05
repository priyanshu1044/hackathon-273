"use client";
import React, { useState, useRef } from 'react';

const UploadFile = ({ endpoint, text }) => {
    const fileInput = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); // Progress state

    const handleFileSelect = async (event) => {
        const selectedFile = Array.from(event.target.files);
        
        if (!selectedFile) {
            console.log("No File found!");
            return;
        }
        
        setLoading(true);
        const progressInterval = startSimulatedProgress(); // Start progress simulation
        
        await handleSubmit(endpoint, selectedFile);
        setFile(selectedFile);
        
        clearInterval(progressInterval); // Clear interval once upload is complete
        setUploadProgress(100); // Set progress to 100% once done
        
        setTimeout(() => {
            setLoading(false);
            setUploadProgress(0); // Reset progress after a short delay
        }, 1000);
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

    const startSimulatedProgress = () => {
        setUploadProgress(0);
        
        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval);
                    return prevProgress;
                }
                return prevProgress + 5; // Increment progress
            });
        }, 500);

        return interval;
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
                    <div
                        className={`h-full ${uploadProgress === 100 ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500`}
                        style={{ width: `${uploadProgress}%` }}
                    />
                </div>
            )}

            {loading && uploadProgress === 100 && (
                <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                    Uploaded Successfully...
                </div>
            )}
        </div>
    );
};

export default UploadFile;
