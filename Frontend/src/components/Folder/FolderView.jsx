import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegFolderOpen } from 'react-icons/fa';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FolderItem from '../FolderSection/FolderItem'; // Import the FolderItem component
import FileItem from '../FileSection/FileItem'; // Import the FileItem component
import { toast } from 'react-toastify';

const FolderView = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [folders, setFolders] = useState([]); // State to store folders
  const [files, setFiles] = useState([]); // State to store files
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const authtoken = localStorage.getItem('token');
  const { value } = useSelector((state) => state.folders);

  const fetchFolders = async (id) => {
    if (!token && !authtoken) {
      setError('No token available');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/folders/${id}`, {
        headers: {
          Authorization: `Bearer ${token || authtoken}`,
        },
      });
      setFolders(response.data); // Set folders data
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch folders');
      setLoading(false);
    }
  };

  const fetchFiles = async (id) => {
    if (!token && !authtoken) {
      setError('No token available');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/files/folder/${id}`, {
        headers: {
          Authorization: `Bearer ${token || authtoken}`,
        },
      });
      setFiles(response.data); // Set files data
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch files');
    }
  };

  useEffect(() => {
    if (folderId) {
      fetchFolders(folderId);
      fetchFiles(folderId); // Fetch files for the current folder ID
    }
  }, [folderId, token, value]); // Add token to the dependency array

  return (
    <div className="p-4 bg-white rounded-md ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-800"
      >
        <AiOutlineArrowLeft className="text-lg" /> Back
      </button>
      {loading && <p className="text-gray-500">Loading folders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {folders.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          {folders.map((folder) => (
            <FolderItem key={folder.id} folder={folder} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No folders found.</p>
      )}

      {/* Render Files */}
      <h2 className="text-lg font-bold mt-8 mb-4">Files</h2>
      {files.length > 0 ? (
        <div className="">
          {files.map((file) => (
            <FileItem key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No files found.</p>
      )}
    </div>
  );
};

export default FolderView;
