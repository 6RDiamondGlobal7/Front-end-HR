import React, { useState } from 'react';
import { Search, User, Clock, ChevronDown, Calendar, Mail, Phone, X, ChevronLeft, ChevronRight, AlertCircle, Users, CalendarCheck } from 'lucide-react';
import './SetSchedule.css';

const SetSchedule = ({ onComplete }) => {
  // --- STATE MANAGEMENT (STRICTLY PRESERVED) ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Manila');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedAppIds, setSelectedAppIds] = useState([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [tempDate, setTempDate] = useState("");
  
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isIncompleteModalOpen, setIsIncompleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [formDetails, setFormDetails] = useState({
    location: "Burke Building, Burke St, Binondo, Manila, 1006 Metro Manila",
    roomNumber: "210",
    reminders: "Be on time."
  });

  const [applicants, setApplicants] = useState([
    { id: 'APP004', name: 'Ana Garcia', email: 'ana.garcia@email.com', phone: '+63 945 678 9012', location: 'Manila', date: null, time: null },
    { id: 'APP005', name: 'Jose Mendoza', email: 'jose.mendoza@email.com', phone: '+63 956 789 0123', location: 'Cebu', date: null, time: null },
    { id: 'APP006', name: 'Maria Santos', email: 'm.santos@email.com', phone: '+63 917 123 4567', location: 'Manila', date: null, time: null },
    { id: 'APP007', name: 'Zeke Miller', email: 'z.miller@email.com', phone: '+63 922 111 2222', location: 'Davao', date: null, time: null },
  ]);

  const timeSlots = [
    '8:30 AM - 9:30 AM', '9:30 AM - 10:30 AM', '10:30 AM - 11:30 AM',
    '11:30 AM - 12:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM'
  ];

  const locationsList = ['Manila', 'Cebu', 'Davao'];

  // --- DATA FILTERING (STRICTLY PRESERVED) ---
  const leftApplicants = applicants.filter(app => !app.date &&
    (selectedLocation === 'All' || app.location === selectedLocation) &&
    (app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const rightApplicants = applicants.filter(app => app.date);
  const selectedApplicantsData = applicants.filter(app => selectedAppIds.includes(app.id));
  const assignedTimeSlots = rightApplicants.map(app => app.time).filter(Boolean);

  // --- HANDLERS (STRICTLY PRESERVED) ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails(prev => ({ ...prev, [name]: value }));
  };

  const toggleApplicant = (id) => {
    setSelectedAppIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const selectAllLeft = () => {
    setSelectedAppIds(leftApplicants.map(a => a.id));
  };

  const confirmAndProceed = () => {
    setApplicants(prev => prev.map(app =>
      selectedAppIds.includes(app.id) ? { ...app, date: tempDate } : app
    ));
    setSelectedAppIds([]);
    setTempDate("");
    setIsConfirmModalOpen(false);
  };

  const handleTimeChange = (id, newTime) => {
    setApplicants(prev => prev.map(app =>
      app.id === id ? { ...app, time: newTime } : app
    ));
  };

  const removeAssignedDate = (id) => {
    setApplicants(prev => prev.map(app =>
      app.id === id ? { ...app, date: null, time: null } : app
    ));
  };

  const handleCompleteScheduling = () => {
    const missingTime = rightApplicants.filter(app => !app.time);
    if (missingTime.length > 0) {
      setIsIncompleteModalOpen(true);
    } else {
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <div className="set-schedule-wrapper">
      <div className="set-schedule-grid">
        
        {/* LEFT COLUMN */}
        <div className="sched-card">
          <div className="sched-card-header">
            <h3 className="sched-card-title">Select Applicants</h3>
            <button className="sched-select-all" onClick={selectAllLeft}>Select All</button>
          </div>

          <div className="sched-input-container">
            <Search size={18} className="sched-icon-left" />
            <input type="text" className="sched-input" placeholder="Search applicants..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className="sched-dropdown-wrapper">
            <div className={`sched-dropdown-box ${isDropdownOpen ? 'active-border' : ''}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ borderColor: isDropdownOpen ? '#3b82f6' : '#e2e8f0' }}>
              <User size={18} className="sched-icon-left" />
              <span className="sched-dropdown-text">{selectedLocation}</span>
              <ChevronDown size={18} className={`sched-icon-right ${isDropdownOpen ? 'rotate' : ''}`} />
            </div>
            {isDropdownOpen && (
              <div className="sched-custom-dropdown-menu">
                {locationsList.map((loc) => (
                  <div key={loc} className={`sched-dropdown-item ${selectedLocation === loc ? 'active-item' : ''}`} onClick={() => { setSelectedLocation(loc); setIsDropdownOpen(false); }}>{loc}</div>
                ))}
              </div>
            )}
          </div>

          <div className="sched-scroll-area">
            {leftApplicants.length > 0 ? (
              leftApplicants.map((app) => (
                <label key={app.id} className={`sched-app-row ${selectedAppIds.includes(app.id) ? 'selected-border' : ''}`}>
                  <input type="checkbox" className="sched-checkbox" checked={selectedAppIds.includes(app.id)} onChange={() => toggleApplicant(app.id)} />
                  <div className="sched-app-info">
                    <div className="sched-app-name-line">
                      <span className="sched-id-badge">{app.id}</span>
                      <span className="sched-name-text">{app.name}</span>
                    </div>
                    <div className="sched-contact-stack">
                      <div className="sched-contact-item"><Mail size={12} /> {app.email}</div>
                      <div className="sched-contact-item"><Phone size={12} /> {app.phone}</div>
                    </div>
                  </div>
                </label>
              ))
            ) : (
              <div className="left-empty-state">
                <Users size={48} className="left-empty-icon" />
                <h4 style={{margin: '0 0 4px', color: '#1e293b'}}>All applicants have dates assigned</h4>
                <p style={{margin: 0, color: '#64748b', fontSize: '0.9rem'}}>Great! Now assign time slots to your applicants</p>
              </div>
            )}
          </div>

          {leftApplicants.length > 0 && (
            <div className="assign-date-container">
                {isDatePickerOpen && (
                    <div className="calendar-picker-popup">
                        <div className="calendar-header-small">
                            <ChevronLeft size={16} color="#94a3b8" style={{cursor: 'pointer'}}/>
                            February 2026
                            <ChevronRight size={16} color="#94a3b8" style={{cursor: 'pointer'}}/>
                        </div>
                        <div className="calendar-grid-small">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (<div key={d} className="cal-weekday-label">{d}</div>))}
                            {[...Array(28)].map((_, i) => (
                                <div key={i+1} className={`cal-day-small ${selectedDay === i+1 ? 'active-day-blue' : ''}`} onClick={() => { setSelectedDay(i+1); setTempDate(`Tuesday, February ${i+1}, 2026`); setIsDatePickerOpen(false); setIsConfirmModalOpen(true); }}>{i+1}</div>
                            ))}
                        </div>
                    </div>
                )}
                <button className="sched-assign-btn" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} disabled={selectedAppIds.length === 0}><Calendar size={18} /> Assign Date</button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="sched-card">
          <div className="sched-card-header">
            <h3 className="sched-card-title">Assign Times</h3>
            <span className="sched-status-label">{rightApplicants.length} Applicant(s) with Dates</span>
          </div>
          <div className="sched-form-group">
            <label className="sched-label">Location</label>
            <input name="location" type="text" className="sched-input sched-filled" value={formDetails.location} onChange={handleInputChange}/>
          </div>
          <div className="sched-form-group">
            <label className="sched-label">Room Number</label>
            <input name="roomNumber" type="text" className="sched-input sched-filled" value={formDetails.roomNumber} onChange={handleInputChange}/>
          </div>
          <div className="sched-form-group">
            <label className="sched-label">Reminders</label>
            <input name="reminders" type="text" className="sched-input sched-filled" value={formDetails.reminders} onChange={handleInputChange}/>
          </div>
          <div className="sched-scroll-area">
              {rightApplicants.length === 0 ? (
                  <div className="sched-dashed-box">
                    <div className="sched-circle-icon"><Clock size={28} className="sched-orange" /></div>
                    <p className="sched-empty-main">No applicants with dates yet</p>
                    <p className="sched-empty-sub">Assign dates to applicants first</p>
                  </div>
              ) : (
                  rightApplicants.map(app => (
                      <div key={app.id} className={`assign-time-card ${app.time ? 'success' : 'pending'}`}>
                          <div className="card-header-row">
                              <div className="card-header-left">
                                  <span className="sched-id-badge">{app.id}</span>
                                  <span className="sched-name-text">{app.name}</span>
                                  {!app.time && <span className="pending-badge">Pending</span>}
                              </div>
                              <button className="remove-btn" onClick={() => removeAssignedDate(app.id)}><X size={18} strokeWidth={3} /></button>
                          </div>
                          <div className="card-detail-row"><Calendar size={14} /> {app.date}</div>
                          {app.time && (<div className="card-detail-row success-time"><Clock size={14} /> {app.time}</div>)}
                          <select className="time-slot-select" value={app.time || ""} onChange={(e) => handleTimeChange(app.id, e.target.value)}>
                              <option value="" disabled>Select time slot...</option>
                              {timeSlots.map(t => {
                                  const isTaken = assignedTimeSlots.includes(t) && app.time !== t;
                                  return (<option key={t} value={t} disabled={isTaken} style={{ color: isTaken ? '#94a3b8' : 'inherit' }}>{t}</option>);
                              })}
                          </select>
                      </div>
                  ))
              )}
          </div>
          <button className="sched-btn-primary" onClick={handleCompleteScheduling} disabled={rightApplicants.length === 0}>
             <Calendar size={18} style={{display:'inline', marginRight:'8px', verticalAlign:'middle'}}/> Complete Scheduling
          </button>
        </div>

        {/* --- MODALS (REVISED BASED ON IMAGE 3 & 4 DESIGN) --- */}
        
        {isConfirmModalOpen && (
          <div className="modal-overlay">
              <div className="confirm-modal">
                  <div className="modal-header-box">
                    <div className="modal-icon-bg"><Calendar size={24} className="blue-text" /></div>
                    <h2>Confirm Date Assignment</h2>
                    <p>Please review the following information before proceeding</p>
                  </div>
                  <div className="modal-section-box blue-bg">
                    <span className="modal-label blue-text">INTERVIEW DATE</span>
                    <div className="modal-date-val"><Calendar size={18} /> {tempDate}</div>
                  </div>
                  <div className="modal-section-box">
                      <span className="modal-label">SELECTED APPLICANTS ({selectedApplicantsData.length})</span>
                      <div className="modal-app-list">
                        {selectedApplicantsData.map(app => (
                          <div key={app.id} className="modal-app-item">
                            <span className="dot-blue"></span> {app.name} <span className="gray-text">({app.id})</span>
                          </div>
                        ))}
                      </div>
                  </div>
                  <div className="modal-next-step-box">
                    <div className="next-step-header"><Clock size={18} /> Next Step</div>
                    <p>After confirmation, you'll be able to assign specific time slots to each applicant.</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
                    <button className="btn-confirm" onClick={confirmAndProceed}>Confirm & Proceed</button>
                  </div>
              </div>
          </div>
        )}

        {/* UPDATED INCOMPLETE MODAL (IMAGE 3) */}
        {isIncompleteModalOpen && (
           <div className="modal-overlay">
              <div className="incomplete-modal">
                  <div className="inc-header">
                    <div className="inc-icon-bg"><AlertCircle size={24} /></div>
                    <h2>Incomplete Scheduling</h2>
                  </div>
                  <p className="inc-desc">Some applicants don't have time slots assigned yet. Please assign time slots to all applicants before proceeding.</p>
                  <div className="inc-warning-box">
                    <div className="inc-warn-title"><AlertCircle size={16} /> Missing Time Slots</div>
                    <p className="inc-warn-desc">{rightApplicants.filter(a => !a.time).length} applicant(s) need time slot assignments</p>
                  </div>
                  <button className="btn-got-it" onClick={() => setIsIncompleteModalOpen(false)}>Got It</button>
              </div>
           </div>
        )}

        {/* UPDATED SUCCESS MODAL (IMAGE 4) */}
        {isSuccessModalOpen && (
           <div className="modal-overlay">
              <div className="success-modal">
                  {/* Reuse confirm-modal styling patterns but with success logic */}
                  <div className="confirm-modal" style={{textAlign: 'left'}}>
                    <div className="modal-header-box">
                        <div className="modal-icon-bg" style={{background: '#f0fdf4'}}>
                          <CalendarCheck size={24} style={{color: '#15803d'}} />
                        </div>
                        <h2>Scheduling Complete</h2>
                    </div>
                    <p className="inc-desc">All applicants have been assigned time slots. You can now proceed to the Interview tab to view the schedule.</p>
                    
                    <div className="modal-section-box" style={{background: '#f0fdf4', borderColor: '#bbf7d0'}}>
                        <div className="next-step-header" style={{color: '#15803d'}}>
                          <CalendarCheck size={18} /> Interview Schedule Ready
                        </div>
                        <p style={{margin: 0, color: '#166534', fontSize: '0.85rem'}}>
                          {rightApplicants.length} interviews are scheduled and ready to go.
                        </p>
                    </div>

                    <div className="modal-footer" style={{marginTop: '24px'}}>
                        <button className="btn-confirm" style={{width: '100%'}} onClick={onComplete}>Got It</button>
                    </div>
                  </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default SetSchedule;