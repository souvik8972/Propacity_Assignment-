import React, { useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { refresh } from '../../features/Folder/folderSlice';
import { useParams } from 'react-router-dom';

const UploadFileModal = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { folderId } = useParams(); // Get folderId from URL parameters

    const onFileUpload = async () => {
        if (!file) {
            toast.error("No file selected.");
            return;
        }
        const fId = folderId || 0;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folderId', fId); // Append folder ID to form data

        try {
        
            const response = await axios.post("http://localhost:3000/api/files/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

        
            toast.success("File uploaded successfully!");
            dispatch(refresh());
            setFile(null); // Clear the file input after successful upload
        } catch (error) {
            console.error("Error uploading file:", error.response ? error.response.data : error.message);
            toast.error("Error uploading file.");
        }
    };

    return (
        <div>
            <form method="dialog" className="select-none modal-box p-9 items-center border-dashed border-2 w-[360px]">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close">
                    ✕
                </button>
                <div className="w-full flex flex-col justify-center gap-3 items-center">
                    <div className="flex items-center gap-2 text-inFile">
                        <IoCloudUploadOutline />
                        <h3 className="text-lg">Upload File</h3>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:border-gray-600 hover:bg-gray-100 ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 d0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                aria-label="Upload file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </div>
                    {file && (
                        <div className="mt-4 text-gray-700 dark:text-gray-300">
                            <p className="text-sm font-medium">Selected file:</p>
                            <p className="text-md font-semibold">{file.name}</p>
                        </div>
                    )}
                    <button
                        type="button"
                        className="bg-inFile text-white rounded-md p-2 px-3 w-full mt-4"
                        onClick={onFileUpload}
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadFileModal;
