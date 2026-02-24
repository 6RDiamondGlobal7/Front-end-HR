import React from 'react';

import './Dashboard.css';



const Dashboard = () => {

  return (

    <div className="tab-container-wrapper">

      <div className="overview-content">

       

        <div className="tab-title-area">

          <div className="title-icon">⊞</div>

          <h2>Dashboard Overview</h2>

        </div>



        {/* 4 Stat Cards Grid */}

        <div className="stats-container">

          <div className="stat-card blue">

            <div className="stat-info">

              <p>Total Applicants</p>

              <h3>6</h3>

            </div>

            <div className="stat-icon-box blue-bg">

              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>

            </div>

          </div>

         

          <div className="stat-card orange">

            <div className="stat-info">

              <p>Pending Approval</p>

              <h3>2</h3>

            </div>

            <div className="stat-icon-box orange-bg">

              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>

            </div>

          </div>

         

          <div className="stat-card purple">

            <div className="stat-info">

              <p>For Interview</p>

              <h3>2</h3>

            </div>

            <div className="stat-icon-box purple-bg">

              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>

            </div>

          </div>

         

          <div className="stat-card green">

            <div className="stat-info">

              <p>Hired Applicants</p>

              <h3>1</h3>

            </div>

            <div className="stat-icon-box green-bg">

              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>

            </div>

          </div>

        </div>



        {/* Main Grid */}

        <div className="data-grid">

         

          {/* Left Side: Chart */}

          <div className="card">

            <h4>Applicant Status Distribution</h4>

            <div className="chart-container">

              <div className="pie-placeholder"></div>

              <div className="chart-legend">

                <span><i className="dot blue"></i> Applied (2)</span>

                <span><i className="dot orange"></i> Interview (2)</span>

                <span><i className="dot green"></i> Hired (1)</span>

                <span><i className="dot red"></i> Rejected (1)</span>

              </div>

              <div className="chart-nav">

                <span>‹ Previous</span>

                <div className="dots-indicator">

                  <div className="dot-pill active"></div>

                  <div className="dot-pill"></div>

                </div>

                <span>Next ›</span>

              </div>

            </div>

          </div>



          {/* Right Side: Lists */}

          <div className="lists-container">

           

            <div className="card" style={{ marginBottom: '20px' }}>

              <div className="list-section-header">

                <h4>Upcoming Interviews</h4>

                <span style={{ color: '#3b82f6' }}>📅</span>

              </div>

              <div className="blue-item">

                <p className="item-title">📅 January 27, 2025</p>

                <p className="item-sub">2 applicants scheduled</p>

              </div>

              <div className="footer-info">

                <p>Total: <span className="highlight-blue">2 applicant(s)</span> scheduled</p>

              </div>

            </div>



            <div className="card">

              <div className="list-section-header">

                <h4>Recent Applications</h4>

                <span style={{ color: '#f59e0b' }}>📄</span>

              </div>

              <div className="orange-item">

                <p className="item-title">📄 Juan Dela Cruz</p>

                <p className="item-sub">01-15-2025</p>

              </div>

              <div className="orange-item">

                <p className="item-title">📄 Maria Santos</p>

                <p className="item-sub">01-14-2025</p>

              </div>

              <div className="footer-info">

                <p>Total: <span className="highlight-orange">2 new application(s)</span></p>

                <span className="view-all-btn">View All</span>

              </div>

            </div>



          </div>

        </div>

      </div>

    </div>

  );

};



export default Dashboard;