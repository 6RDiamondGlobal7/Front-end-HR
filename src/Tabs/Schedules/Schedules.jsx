import React, { useState } from 'react';
import SetSchedule from './SetSchedule';
import Interview from './Interview';
import { Calendar } from 'lucide-react';
import './Schedules.css';

const Schedules = () => {
  const [activeTab, setActiveTab] = useState('Set Schedule');

  // Function to be passed to SetSchedule to trigger redirect
  const switchToInterview = () => {
    setActiveTab('Interview');
  };

  <SetSchedule onComplete={switchToInterview} />

  return (
    <div className="schedules-main-container">
      <div className="page-header-wrapper">
        <div className="header-icon-box">
          <Calendar size={24} strokeWidth={2.5} />
        </div>
        <h2>Schedules</h2>
      </div>
      
      <div className="tab-navigation">
        <button 
          className={`tab-link ${activeTab === 'Set Schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('Set Schedule')}
        >
          <Calendar size={16} /> Set Schedule
        </button>
        <button 
          className={`tab-link ${activeTab === 'Interview' ? 'active' : ''}`}
          onClick={() => setActiveTab('Interview')}
        >
          Interview
        </button>
      </div>

      <div className="tab-content-area">
        {activeTab === 'Set Schedule' ? (
          <SetSchedule onComplete={switchToInterview} />
        ) : (
          <Interview />
        )}
      </div>
    </div>
  );
};

export default Schedules;