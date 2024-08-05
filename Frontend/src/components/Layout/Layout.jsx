// src/components/Layout/Layout.js

import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className=' h-[80vh] flex gap-2 '>
      <Sidebar />
      <div className='flex-1'>
        {children}
      </div>
      <div className='w-[17vw] rounded-xl rounded-e-none bg-white h-full'></div>
    </div>
  );
};

export default Layout;
