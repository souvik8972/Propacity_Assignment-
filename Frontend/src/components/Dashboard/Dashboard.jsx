// src/components/Dashboard/Dashboard.js

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from '../Layout/Layout';
import MainSection from '../MainSection/MainSection';

const Dashboard = () => {
  return (
    <AnimatePresence>
      <Layout>
        <MainSection  />
      </Layout>
    </AnimatePresence>
  );
};

export default Dashboard;
