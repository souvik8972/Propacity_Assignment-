"react";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoTrash, GoFileDirectory } from "react-icons/go";
import { MdStarOutline, MdOutlineLogout } from "react-icons/md";
import { motion } from "framer-motion";
import CreateFolderModal from "../FolderSection/CreateFolderModal";
import uploadFile from "../FileSection/UploadFileModal";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice"; // Adjust import path as needed
import UploadFileModal from "../FileSection/UploadFileModal";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openCreateFolderModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.showModal();
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to login page
  };

  const openUploadFileModal = () => {
    const modal = document.getElementById("upload-file-modal");
    if (modal) modal.showModal();
  };
  return (
    <motion.div className="bg-white select-none w-[15vw] shadow-md rounded-2xl  h-full flex gap-4 pt-10 items-center flex-col">
      <div className="flex flex-col gap-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex justify-start pl-2 items-center gap-2 rounded-lg h-[40px] w-[8vw] border text-inFile border-inFile ${
              isActive
                ? "bg-inFile text-white"
                : "hover:bg-inFile hover:text-white"
            } hover:scale-105 ease-out duration-75 shadow-md`
          }
          aria-label="Home"
        >
          <IoHomeOutline /> Home
        </NavLink>

        <button
          onClick={openCreateFolderModal}
          className="flex justify-start pl-2 items-center gap-2 text-inFile rounded-lg h-[40px] w-[8vw] border-inFile hover:bg-inFile hover:text-white hover:scale-105 ease-out duration-75 border-0  shadow-md"
          aria-label="Add Folder"
        >
          <IoIosAddCircleOutline /> Add Folder
        </button>

        <button
          onClick={openUploadFileModal}
          className="flex justify-start pl-2 items-center gap-2 text-inFile rounded-lg h-[40px] w-[8vw]  hover:bg-inFile hover:text-white hover:scale-105 ease-out duration-75 border-0 border-inFile shadow-md"
          aria-label="Add File"
        >
          <IoIosAddCircleOutline /> Add File
        </button>

        <NavLink
  to="/my-files"
  className={({ isActive }) =>
    `flex justify-start pl-2 items-center gap-2 rounded-lg h-[40px] w-[8vw] ${isActive ? 'bg-inFile text-white' : 'text-inFile border-inFile'} ${!isActive ? 'hover:bg-inFile hover:text-white' : ''} hover:scale-105 ease-out duration-75 border-0 shadow-md`
  }
  aria-label="My Files"
>
  <GoFileDirectory /> My Files
</NavLink>

        <button
          className="flex justify-start pl-2 items-center gap-2 text-inFile rounded-lg h-[40px] w-[8vw] hover:bg-inFile hover:text-white hover:scale-105 ease-out duration-75 border-0 border-inFile shadow-md"
          aria-label="Starred"
        >
          <MdStarOutline /> Starred
        </button>

        <button
          className="flex justify-start pl-2 items-center gap-2 text-inFile rounded-lg h-[40px] w-[8vw] hover:bg-inFile hover:text-white hover:scale-105 ease-out duration-75 border-0 border-gray-200 shadow-md"
          aria-label="Trash"
        >
          <GoTrash /> Trash
        </button>
      </div>

      <div className="h-full flex items-end pb-10">
        <button
          onClick={handleLogout}
          className="flex justify-center items-center gap-2 bg-inFile text-white border-inFile rounded-lg h-[40px] w-[8vw] hover:bg-white hover:text-inFile hover:scale-105 ease-out duration-75 shadow-md"
          aria-label="Logout"
        >
          <MdOutlineLogout /> Logout
        </button>
      </div>

      <dialog id="my_modal_3" className="modal">
        <CreateFolderModal />
      </dialog>

      <dialog id="upload-file-modal" className="modal">
        <UploadFileModal />
      </dialog>
    </motion.div>
  );
};

export default Sidebar;
