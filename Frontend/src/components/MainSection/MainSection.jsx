import React from 'react';

import SearchSection from '../SearchSection/SearchSection';
import FolderSection from '../FolderSection/FolderSection';
import FileSection from '../FileSection/FileSection';

const MainSection = () => {
  // Define animation variants for the search icon


  return (
    <div className="w-[70vw] lg:w-[70vw] bg-white h-full p-5 select-none overflow-hidden shadow-md">
      <SearchSection/>
      <FolderSection/>
      <FileSection/>
    </div>
  );
};

export default MainSection;
