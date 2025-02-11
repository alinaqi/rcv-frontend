import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UploadContract from './pages/UploadContract';
import ContractViewer from './pages/ContractViewer';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadContract />} />
          <Route path="/viewer/:id" element={<ContractViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;