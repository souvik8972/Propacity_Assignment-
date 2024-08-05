import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Registering the elements for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const StorageChart = () => {
  const { value } = useSelector((state) => state.folders);
  const { token } = useSelector((state) => state.auth);
  const [usedStorage, setUsedStorage] = useState(0); // State to store used storage

  // Function to calculate the total used storage from the file sizes
  const calculateUsedStorage = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/files', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const files = response.data; // Array of files
      const totalUsedSize = files.reduce((acc, file) => acc + parseInt(file.size), 0); // Sum of file sizes
console.log(totalUsedSize)
      // Convert size from bytes to GB
      const usedSizeInMB = (totalUsedSize / (1024 * 1024 )); // Convert bytes to MB and limit to 2 decimals
      setUsedStorage(parseFloat(usedSizeInMB)); // Update the used storage state

    } catch (error) {
      console.error("Error fetching storage data:", error);
    }
  };

  // Call the function to calculate storage on component mount
  useEffect(() => {
    calculateUsedStorage();
    console.log(usedStorage)
  }, [value]);

  const totalStorage = 50; // Total storage capacity in Mb
  const availableStorage = totalStorage - usedStorage; // Calculate available storage in GB

  // Data for the Doughnut chart
  const data = {
    labels: ['Used Storage', 'Available Storage'],
    datasets: [
      {
        label: 'Storage Usage',
        data: [usedStorage, availableStorage],
        backgroundColor: [
          '#4F46E5',  // Color for used storage
          'white',    // Color for available storage
        ],
        borderColor: ['#4F46E5'],
        hoverOffset: 4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom', // Position the legend at the bottom
      },
      title: {
        display: true,
        text: 'Storage Usage Overview',
      },
    },
  };

  return (
    <div className='w-[17vw] rounded-xl rounded-e-none m-auto bg-white h-[100%]'>
      <Doughnut data={data} options={options} />
      <p className='text-center p-2 border font-rubik text-inFile'>Total Storage: {totalStorage} MB</p>
      <p className='text-center p-2 border font-rubik text-inFile'>Used Storage:{usedStorage.toFixed(2)}MB</p>
      <p className='text-center p-2 border font-rubik text-inFile'> Available Storage:{availableStorage.toFixed(2)}MB</p>

      <h2 className='text-center mt-3 bg-inFile text-white '>Need More Space ?</h2>
       <h2 className='text-center p-2 bg-inFile text-white '>Upgrade to Prime</h2>
       <div className="w-[100%]  flex justify-center mt-4 ">
      <button className='btn btn-primary border rounded-xl border-inFile p-4 pt-2 pb-2 text-inFile '>Add Storage</button>
      </div>
    </div>
  );
};

export default StorageChart;
