import React, { useEffect, useState } from "react";
import { FaFolderOpen } from "react-icons/fa6";
import FolderItem from "./FolderItem";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const FolderSection = () => {
  const [folderList, setFolderList] = useState([]);
  const { token } = useSelector((state) => state.auth);
const {value}=useSelector((state) => state.folders);
  const fetchFolder = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/folders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setFolderList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, [token,toast,value]);
  if(folderList.length===0){
    return <div className="min-h-[30vh]">
    <h4 className="bg-inFile w-fit p-1 pr-6 text-white rounded text-[15px] flex items-center">   <BsDot /> Root Folders</h4>
    <div className="w-full m-auto p-10">No Folders Found</div>
    </div> 
  }


  return (
    <div className="w-[100%] min-h-[30vh] max-h-[35vh]  overflow-y-hidden">
      <h4 className="bg-inFile w-fit p-1 pr-6 text-white rounded text-[15px] flex items-center">
        <BsDot /> Root Folders
      </h4>
      <div
        className="grid grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-6 mt-3
        gap-5"
      >
        {folderList.map((folder) => (
          <FolderItem key={folder.id} folder={folder} />
        ))}
      </div>
    </div>
  );
};

export default FolderSection;
