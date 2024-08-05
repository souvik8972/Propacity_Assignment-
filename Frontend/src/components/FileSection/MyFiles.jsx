
import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import FileItem from './FileItem'
import { useSelector } from 'react-redux';
import axios from 'axios';

const MyFiles = () => {
      const [fileList, setFileList] = useState([]);

      const { value } = useSelector((state) => state.folders);
  // const { token } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  

  // Function to calculate the total used storage from the file sizes
  const  allFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/files', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setFileList(response.data)  // Array of files
      
  
     

    } catch (error) {
      console.error("Error fetching storage data:", error);
    }
  };

  // Call the function to calculate storage on component mount
  useEffect(() => {
    allFiles();
  }, [value]);


  return (
    <Layout >
        <div className='overflow-hidden '>
            <h2 className="text-[15px] pl-2 mt-2  flex items-center justify-start text-white bg-inFile w-[100%] p-1 rounded pr-5"> All Files </h2>
        <div >
            {fileList.length > 0 ? (
        fileList.map((item) => (
          <div key={item.id} className='overfollow-y-scroll'>
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
      
        </div>
      
    </Layout>
  )
}

export default MyFiles
