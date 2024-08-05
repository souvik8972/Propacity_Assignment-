import React, { useState, useEffect } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { refresh } from "../../features/Folder/folderSlice";

function CreateFolderModal() {
    const { folderId } = useParams(); // Get folderId from route parameters
    const [folderName, setFolderName] = useState("");
  const { token } = useSelector((state) => state.auth);
  const {value}=useSelector((state) => state.folders);
 const dispatch = useDispatch();
    // Determine the parent folder ID
    const parentId = folderId ? folderId : null;

    const onCreate = async () => {
        if (!folderName) {
            alert("Folder name is required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/folders", {
                name: folderName,
                parentId: parentId
            },{
              headers: {
          Authorization: `Bearer ${token}`,
        },
            });
            
            toast.success("Folder created successfully!");
            dispatch(refresh())
            
            // Close modal or handle success
        } catch (error) {
            console.error("Error creating folder:", error);
            // Handle error
        }
    };

    return (
        <div>
            <form method="dialog" className="select-none modal-box p-9 items-center border-dashed border-2">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2">
                    ✕
                </button>
                <div className="w-full items-center flex flex-col justify-center gap-3">
                    <div className="flex items-center gap-2 text-inFile">
                        <MdOutlineCreateNewFolder />
                        <h3 className="text-lg">Create Folder</h3>
                    </div>
                    <input
                        type="text"
                        placeholder="Folder Name"
                        className="p-2 border-[1px] outline-none rounded-md"
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                    <button
                        type="button"
                        className="bg-inFile text-white rounded-md p-2 px-3 w-full"
                        onClick={onCreate}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateFolderModal;
