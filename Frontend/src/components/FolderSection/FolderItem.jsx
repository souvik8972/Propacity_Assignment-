import React, { useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../features/Folder/folderSlice";
import { toast } from "react-toastify"; // Import toast

const FolderItem = ({ folder }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [newName, setNewName] = useState(folder.name); // State for new folder name
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Function to handle folder click
  const onClickHandle = (folderId) => {
    if (!isModalOpen) {
      navigate(`/folder/${folderId}`);
    }
  };

  // Toggle the visibility of the edit and delete buttons
  const handleToggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Function to handle delete button click
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/folders/${folder.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(refresh());
    
      toast.success("Folder deleted successfully!"); // Success toast
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error("Failed to delete folder."); // Error toast
    }
  };

  // Open modal for editing
  const handleEditClick = () => {
    setIsModalOpen(true); // Open the modal
    setIsMenuVisible(false); // Hide the menu
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setNewName(e.target.value); // Update newName state
  };

  // Function to handle the update of the folder name
  const handleUpdate = async () => {
    if (newName.trim() === "") {
      toast.error("Folder name cannot be empty."); // Error toast for empty name
      return;
    }

    if (newName === folder.name) {
      toast.info("No changes made to the folder name."); // Info toast for no changes
      setIsModalOpen(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/folders/${folder.id}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(refresh());
  
      toast.success("Folder name updated successfully!"); // Success toast
      setIsModalOpen(false); // Close modal after successful update
    } catch (error) {
      console.error("Error updating folder:", error);
      toast.error("Failed to update folder name."); // Error toast
    }
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setNewName(folder.name); // Reset the name to the original value
  };

  return (
    <div className="relative">
      {/* Ellipsis menu button */}
      <button onClick={handleToggleMenu} className="absolute top-2 right-2 z-50">
        <HiOutlineDotsVertical className="text-2xl" />
      </button>

      {/* Edit and Delete buttons menu */}
      {isMenuVisible && (
        <div className="absolute top-8 right-2 w-32 bg-white shadow-lg border border-gray-300 rounded z-10">
          <button
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleEditClick} // Open modal on edit click
          >
            <MdOutlineEdit className="mr-2" /> Edit
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleDelete}
          >
            <MdDelete className="mr-2" /> Delete
          </button>
        </div>
      )}

      {/* Folder item */}
      <div
        onClick={() => onClickHandle(folder.id)}
        className={`w-[90%] flex flex-col justify-center items-center h-[100px] border-[1px] rounded-lg p-3 bg-white hover:scale-105 hover:shadow-md cursor-pointer m-auto relative ${
          isModalOpen ? "pointer-events-none" : ""
        }`}
      >
        <FaRegFolderOpen className="text-2xl" />
        <h2 className="line-clamp-3 text-[13px] text-center">{folder.name}</h2>
      </div>

      {/* Modal for editing folder name */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full border-dashed max-w-md mx-4 p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Edit Folder Name
            </h2>
            <input
              type="text"
              value={newName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="text-gray-700 px-4 py-2 mr-2 rounded hover:bg-gray-100 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-inFile text-white px-4 py-2 border-2 border-inFile rounded hover:bg-white hover:text-inFile focus:outline-none"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderItem;
