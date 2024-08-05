import React, { useEffect, useState } from 'react';
import FileItem from './FileItem';
import { BsDot } from "react-icons/bs";
import axios from 'axios';
import { useSelector } from 'react-redux';

const FileSection = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const {value} =useSelector((state) => state.folders);

  const fetchFile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/files', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFileList(response.data);
      setLoading(false); // Ensure loading is set to false after fetching
    } catch (err) {
      console.log("Error fetching files:", err);
      setError("Error fetching files.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFile();
  }, [token,value]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white mt-5 overflow-hidden">
      <h2 className="text-[15px] flex items-center justify-start text-white bg-inFile w-fit p-1 rounded pr-5">
        <BsDot /> Recent Created Files
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 text-[13px] font-semibold border-b-[1px] pb-2 mt-3 border-gray-300 text-gray-400">
        <h2>Name</h2>
        <div className="grid grid-cols-3">
          <h2>Modified</h2>
          <h2>Size</h2>
          <h2></h2>
        </div>
      </div>
      {fileList.length > 0 ? (
        fileList.map((item) => (
          <div key={item.id}>
            <FileItem 
              file={
                item // Use createdAt if modifiedAt is not available
              } 
            />
          </div>
        ))
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default FileSection;
