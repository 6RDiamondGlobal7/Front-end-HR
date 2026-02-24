import React, { useState } from 'react';
import { Search, Calendar, Clock, Mail, Phone, Eye, Download, X, User, FileText, UserCheck, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './Interview.css';

const Interview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [filterDate, setFilterDate] = useState(null);

  // Original data
  const scheduledInterviews = [
    { 
      id: 'APP005', name: 'Jose Mendoza', time: '9:30 AM - 10:30 AM', email: 'jose.mendoza@email.com', phone: '+63 956 789 0123',
      dateStr: 'Tuesday, February 24, 2026', dateShort: 'Feb 24',
      firstName: 'Jose', lastName: 'Mendoza', middleInitial: 'S', dob: '1995-01-15', age: 30, nationality: 'Filipino', branch: 'Cebu', position: 'Brokerage Specialist',
      address: { region: 'National Capital Region (NCR)', province: 'Metro Manila', city: 'Quezon City', barangay: 'Barangay Commonwealth', detailed: '123 Main Street, Corner Oak Avenue, Building A, Unit 405' }, 
      medicalCondition: 'No'
    },
    { 
      id: 'APP004', name: 'Ana Garcia', time: '3:00 PM - 4:00 PM', email: 'ana.garcia@email.com', phone: '+63 945 678 9012',
      dateStr: 'Tuesday, February 10, 2026', dateShort: 'Feb 10',
      firstName: 'Ana', lastName: 'Garcia', middleInitial: 'A', dob: '1996-03-20', age: 29, nationality: 'Filipino', branch: 'Manila', position: 'Documentation Head',
      address: { region: 'NCR', province: 'Metro Manila', city: 'Manila', barangay: 'Malate', detailed: '456 Taft Avenue' }, 
      medicalCondition: 'No'
    }
  ];

  const handleDownload = (name) => {
    alert(`Downloading document for ${name}...`);
  };

  const filteredInterviews = scheduledInterviews.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = filterDate ? app.dateShort === filterDate : true;
    return matchesSearch && matchesDate;
  });

  // Group by date for display
  const groupedInterviews = filteredInterviews.reduce((groups, app) => {
    const date = app.dateStr;
    if (!groups[date]) groups[date] = [];
    groups[date].push(app);
    return groups;
  }, {});

  return (
    <div className="interview-container">
      <div className="interview-header-card">
        <div className="interview-header-top">
          <div className="header-title-group"><Calendar size={22} className="header-blue-icon" /><h3>Interview Schedule</h3></div>
          <div className="total-interviews-badge"><span>{filteredInterviews.length} Total Interviews Scheduled</span></div>
        </div>
        <div className="interview-controls">
          <div className="search-wrapper"><Search size={20} className="search-icon" /><input type="text" placeholder="Search by name or ID..." className="interview-search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
          
          <div className="filter-wrapper" style={{position:'relative'}}>
            <button className="filter-date-btn" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
              <Calendar size={20} /> 
              {filterDate ? `Filter: ${filterDate}` : 'Filter by Date'}
              {filterDate && <X size={16} style={{marginLeft:'10px'}} onClick={(e) => {e.stopPropagation(); setFilterDate(null);}}/>}
            </button>
            {isDatePickerOpen && (
              <div className="calendar-picker-popup" style={{top:'110%', bottom:'auto'}}>
                <div className="calendar-header-small"><ChevronLeft size={16}/> February 2026 <ChevronRight size={16}/></div>
                <div className="calendar-grid-small">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (<div key={d} className="cal-weekday-label">{d}</div>))}
                  {[...Array(28)].map((_, i) => (
                    <div key={i+1} className="cal-day-small" onClick={() => { setFilterDate(`Feb ${i+1}`); setIsDatePickerOpen(false); }}>{i+1}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="interview-list-wrapper">
        {Object.keys(groupedInterviews).length > 0 ? (
          Object.entries(groupedInterviews).map(([date, apps]) => (
            <div key={date} className="date-group-card">
              <div className="date-group-header"><div className="date-icon-box"><Calendar size={24} /></div><h3>{date}</h3></div>
              {apps.map(app => (
                <div key={app.id} className="interview-row">
                  <div className="time-column"><Clock size={18} /> {app.time.split(' - ')[0]}</div>
                  <div className="applicant-column">
                    <div className="app-badge-name"><span className="app-badge">{app.id}</span><span className="app-name">{app.name}</span></div>
                    <div className="app-contacts"><span><Mail size={14} /> {app.email}</span><span><Phone size={14} /> {app.phone}</span></div>
                  </div>
                  <div className="actions-column">
                    <button className="btn-action-view" onClick={() => setSelectedApplicant(app)}><Eye size={18} /> View</button>
                    <button className="btn-action-download" onClick={() => handleDownload(app.name)}><Download size={18} /> Download</button>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="interview-empty-state">
            <div className="empty-icon-wrapper"><Calendar size={72} strokeWidth={1.5} /></div>
            <h2 className="empty-title">No Interviews Scheduled</h2>
            <p className="empty-subtitle">No interviews match your search criteria or date filter.</p>
          </div>
        )}
      </div>

      {/* VIEW MODAL PIXEL PERFECT TO IMAGE 5 */}
      {selectedApplicant && (
        <div className="app-modal-overlay" onClick={() => setSelectedApplicant(null)}>
          <div className="app-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <div className="app-modal-title-area"><h3>Applicant Details</h3><p>{selectedApplicant.name} - Applicant Number: {selectedApplicant.id}</p></div>
              <button className="app-modal-close-btn" onClick={() => setSelectedApplicant(null)}><X size={24} /></button>
            </div>
            <div className="app-modal-body">
              <div className="app-section-header"><User size={20} /><span className="app-section-title">Personal Information</span></div>
              <div className="app-info-grid">
                <div className="app-info-item"><span className="app-info-label">First Name</span><span className="app-info-value">{selectedApplicant.firstName}</span></div>
                <div className="app-info-item"><span className="app-info-label">Middle Initial</span><span className="app-info-value">{selectedApplicant.middleInitial}</span></div>
                <div className="app-info-item"><span className="app-info-label">Last Name</span><span className="app-info-value">{selectedApplicant.lastName}</span></div>
                <div className="app-info-item"><span className="app-info-label">Date of Birth</span><span className="app-info-value">{selectedApplicant.dob}</span></div>
                <div className="app-info-item"><span className="app-info-label">Age</span><span className="app-info-value">{selectedApplicant.age}</span></div>
                <div className="app-info-item"><span className="app-info-label">Nationality</span><span className="app-info-value">{selectedApplicant.nationality}</span></div>
                <div className="app-info-item"><span className="app-info-label">Email</span><span className="app-info-value">{selectedApplicant.email}</span></div>
                <div className="app-info-item"><span className="app-info-label">Phone</span><span className="app-info-value">{selectedApplicant.phone}</span></div>
                <div className="app-info-item"><span className="app-info-label">Branch</span><span className="app-info-value">{selectedApplicant.branch}</span></div>
                <div className="app-info-item"><span className="app-info-label">Position Applied</span><span className="app-info-value">{selectedApplicant.position}</span></div>
              </div>
              <div className="app-subsection-title" style={{marginTop:'25px', paddingLeft:'5px'}}>Address</div>
              <div className="app-address-grid" style={{marginTop:'10px'}}>
                <div className="app-info-item"><span className="app-info-label">Region</span><span className="app-info-value">{selectedApplicant.address.region}</span></div>
                <div className="app-info-item"><span className="app-info-label">Province</span><span className="app-info-value">{selectedApplicant.address.province}</span></div>
                <div className="app-info-item"><span className="app-info-label">City/Municipality</span><span className="app-info-value">{selectedApplicant.address.city}</span></div>
                <div className="app-info-item"><span className="app-info-label">Barangay</span><span className="app-info-value">{selectedApplicant.address.barangay}</span></div>
                <div className="app-info-item" style={{gridColumn:'span 2'}}><span className="app-info-label">Detailed Address</span><span className="app-info-value">{selectedApplicant.address.detailed}</span></div>
              </div>
              <div className="app-section-header" style={{marginTop:'25px'}}><FileText size={20} /><span className="app-section-title">Documents</span></div>
              <div className="app-doc-list">
                <div className="app-doc-card">
                  <div className="app-doc-info"><div className="app-doc-icon-box"><FileText size={24} /></div><div className="app-doc-details"><span className="app-doc-type">Resume</span><span className="app-doc-name">{selectedApplicant.firstName}_Resume.pdf</span></div></div>
                  <div className="app-doc-actions"><button className="app-btn-view" onClick={() => alert('Viewing...')}>View</button><button className="app-btn-download" onClick={() => handleDownload(selectedApplicant.firstName)}>Download</button></div>
                </div>
              </div>
            </div>
            <div className="app-modal-footer">
              <button className="app-btn-approve" style={{background:'#22c55e'}} onClick={() => alert('Hired!')}><UserCheck size={18}/> Hire</button>
              <button className="app-btn-reject" onClick={() => alert('Rejected')}><XCircle size={18}/> Reject Application</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;