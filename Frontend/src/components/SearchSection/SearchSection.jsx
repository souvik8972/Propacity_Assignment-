import React from 'react'

import { CiSearch } from 'react-icons/ci';
import { motion } from 'framer-motion';

const SearchSection = () => {
      const searchIconVariants = {
    hover: { scale: 1.2 },
  };
  return (
    <div className="flex items-center justify-end w-full lg:w-[80%] mx-auto">
        
        {/* Search bar */}
        <div className="flex items-center w-[30%] rounded-full bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
          <input
            type="search"
            name="search"
            placeholder="Search..."
            className="flex-grow py-2 px-4 rounded-l-full p-4  w-full focus:outline-none"
          />
          <motion.button
            variants={searchIconVariants}
            whileHover="hover"
            className="flex items-center justify-center p-2"
          >
            <CiSearch size={24} className="text-gray-500" />
          </motion.button>
        </div>
      </div>
  )
}

export default SearchSection
