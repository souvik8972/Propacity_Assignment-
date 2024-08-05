// src/components/Layout/Layout.js

import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import StorageChart from '../StorageChart/StorageChart';


const Layout = ({ children }) => {
  return (
    <div className=' h-[80vh] flex gap-2 '>
      <Sidebar />
      <div className='flex-1 overflow-x-hidden overflow-y-scroll l ' >
        {children}
      </div>
      <div className='w-[17vw] rounded-xl  shadow-xl  bg-white h-full overflow-hidden'>
        <h2 className='text-lg w-full p-2 text-center font-rubik border    text-inFile rounded-md'>Storage Chart</h2>
        
        <StorageChart/>
      </div>
    </div>
  );
};

export default Layout;
