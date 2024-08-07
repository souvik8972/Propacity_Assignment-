import React, { useState } from 'react';
import { CiFileOn } from "react-icons/ci";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { refresh } from '../../features/Folder/folderSlice';

function FileItem({ file }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState(file.name);

  const deleteFile = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/files/${file.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(refresh());
      toast.success("File deleted successfully");
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error("Failed to delete file");
    }
  };

  const editFileName = async () => {
    if (newFileName.trim() === '') {
      toast.error("File name cannot be empty.");
      return;
    }

    if (newFileName === file.name) {
      setIsEditing(false);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/files/${file.id}`, { name: newFileName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(refresh());
      setIsEditing(false);
      toast.success("File name updated successfully");
    } catch (error) {
      console.error('Error updating file name:', error);
      toast.error("Failed to update file name");
    }
  };

  const parseFileSize = (sizeString) => {
    const sizeInMB = parseFloat(sizeString) / (1024 * 1024); // Convert bytes to MB
    return sizeInMB.toFixed(2); // Keep two decimal places
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "";
    }
    return date.toLocaleDateString();
  };

  const openFileUrl = () => {
    if (file.url) {
      window.open(file.url, '_blank'); // Open URL in new tab
    } else {
      toast.error("No URL available for this file.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-md">
      <div className="flex gap-2 items-center">
        {isEditing ? (
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onBlur={editFileName}
            onKeyDown={(e) => e.key === 'Enter' && editFileName()}
            className="text-[13px] truncate"
            autoFocus
          />
        ) : (
          <h2
            className="text-[13px] truncate flex justify-start items-center gap-1"
            onClick={openFileUrl}
          >
            <CiFileOn /> {file.name}
          </h2>
        )}
      </div>
      <div className="grid grid-cols-3 place-content-start">
        <h2 className="text-[13px]">{formatDate(file.updatedAt)}</h2>
        <h2 className="text-[13px]">{parseFileSize(file.size) + ' MB'}</h2>
        <div className="flex gap-2">
          {isEditing ? (
            <button onClick={() => setIsEditing(false)} className="text-blue-500 hover:scale-110 transition-all">
              Cancel
            </button>
          ) : (
            <FaEdit
              onClick={() => setIsEditing(true)}
              className="w-5 h-5 text-inFile hover:scale-110 transition-all"
            />
          )}
          <FaTrash
            onClick={deleteFile}
            className="w-5 h-5 text-gray-500 hover:scale-110 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

export default FileItem;
