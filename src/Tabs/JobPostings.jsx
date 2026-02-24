import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, MapPin, MoreVertical, Briefcase, Users, Eye, Plus, Filter, 
  ChevronLeft, ChevronRight, X, Copy, XCircle, Trash2, Edit
} from 'lucide-react';
import './JobPostings.css';

const JobPostings = () => {
  // --- UI & Menu State ---
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeFilterMenu, setActiveFilterMenu] = useState(null);
  
  // --- Modal State ---
  const [activeModal, setActiveModal] = useState(null);
  const [selectedJobForAction, setSelectedJobForAction] = useState(null);
  const [editFormData, setEditFormData] = useState({ dept: '', type: '' });
  
  // New State for Create Job Form
  const [createFormData, setCreateFormData] = useState({
    title: '',
    dept: 'Brokerage',
    branch: 'Manila',
    type: 'Full-time'
  });

  // --- Filter State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');

  const departments = ['All Departments', 'Brokerage', 'Operations', 'Logistics', 'Documentation', 'Administration'];
  const editModalDepartments = departments.slice(1); 
  const allBranches = ['All Branches', 'Cebu', 'Davao', 'Manila'];
  const contractTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  // Data for the Create Modal Dropdowns
  const createDepts = ['Brokerage', 'Operations', 'Logistics', 'Documentation', 'Administration'];
  const createBranches = ['Manila', 'Cebu', 'Davao'];

  // Stats Data
  const stats = [
    { label: 'Active Job Posts', value: '18', icon: <Briefcase size={20} />, bgColor: '#DCFCE7', color: '#16A34A' },
    { label: 'Total Applications', value: '294', icon: <Users size={20} />, bgColor: '#E0E7FF', color: '#6366F1' },
    { label: 'Views This Month', value: '1,247', icon: <Eye size={20} />, bgColor: '#FFEDD5', color: '#EA580C' },
  ];

  // --- Job Data ---
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Licensed Customs Broker', dept: 'Brokerage', branch: 'Manila', branchCount: 3, type: 'Full-time', applicants: 35, date: 'Jan 15, 2025', status: 'Active' },
    { id: 2, title: 'Import & Export Head', dept: 'Operations', branch: 'Cebu', branchCount: 3, type: 'Full-time', applicants: 23, date: 'Jan 10, 2025', status: 'Active' },
    { id: 3, title: 'Messenger / Logistics', dept: 'Logistics', branch: 'Davao', branchCount: 3, type: 'Full-time', applicants: 45, date: 'Jan 5, 2025', status: 'Active' },
    { id: 4, title: 'Documentation Head', dept: 'Documentation', branch: 'Manila', branchCount: 3, type: 'Full-time', applicants: 17, date: 'Jan 12, 2025', status: 'Mixed' },
    { id: 5, title: 'Brokerage Specialist', dept: 'Brokerage', branch: 'Manila', branchCount: 3, type: 'Full-time', applicants: 26, date: 'Jan 8, 2025', status: 'Active' },
    { id: 6, title: 'HR Manager', dept: 'Administration', branch: 'Manila', branchCount: 1, type: 'Full-time', applicants: 12, date: 'Jan 2, 2025', status: 'Active' },
    { id: 7, title: 'Sales Associate', dept: 'Operations', branch: 'Cebu', branchCount: 2, type: 'Full-time', applicants: 8, date: 'Jan 1, 2025', status: 'Closed' },
  ]);

  // --- Filtering Logic ---
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All Departments' || job.dept === selectedDept;
      const matchesBranch = selectedBranch === 'All Branches' || job.branch === selectedBranch;
      return matchesSearch && matchesDept && matchesBranch;
    });
  }, [jobs, searchQuery, selectedDept, selectedBranch]);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
      setActiveFilterMenu(null);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleActionMenu = (e, jobId) => {
    e.stopPropagation();
    setActiveFilterMenu(null);
    setActiveMenu(activeMenu === jobId ? null : jobId);
  };

  const toggleFilterMenu = (e, type) => {
    e.stopPropagation();
    setActiveMenu(null);
    setActiveFilterMenu(activeFilterMenu === type ? null : type);
  };

  const selectFilterOption = (type, value) => {
    if (type === 'dept') setSelectedDept(value);
    if (type === 'branch') setSelectedBranch(value);
    setActiveFilterMenu(null);
  };

  const openModal = (actionType, job = null) => {
    setSelectedJobForAction(job);
    setActiveModal(actionType);
    setActiveMenu(null); 
    if (actionType === 'edit' && job) {
        setEditFormData({ dept: job.dept, type: job.type });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedJobForAction(null);
    // Reset create form data on close
    setCreateFormData({ title: '', dept: 'Brokerage', branch: 'Manila', type: 'Full-time' });
  };

  const handleEditFormChange = (e) => {
      const { name, value } = e.target;
      setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- New Job Handlers ---
  const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateJob = () => {
    if (!createFormData.title.trim()) return alert("Please enter a job title");

    const newJob = {
      id: Date.now(), // Unique ID
      title: createFormData.title,
      dept: createFormData.dept,
      branch: createFormData.branch,
      branchCount: 1,
      type: createFormData.type,
      applicants: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Active'
    };

    setJobs([newJob, ...jobs]);
    closeModal();
  };

  const saveEditChanges = () => {
      if (!selectedJobForAction) return;
      const updatedJobs = jobs.map(job => 
          job.id === selectedJobForAction.id 
              ? { ...job, dept: editFormData.dept, type: editFormData.type }
              : job
      );
      setJobs(updatedJobs);
      closeModal();
  };

  const handleDuplicate = () => { 
    if (selectedJobForAction) {
        const duplicatedJob = {
            ...selectedJobForAction,
            id: Date.now(),
            title: `${selectedJobForAction.title} (Copy)`,
            applicants: 0,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Active'
        };
        setJobs([duplicatedJob, ...jobs]);
    }
    closeModal(); 
  };
  
  const handleClosePosition = () => { 
    if (selectedJobForAction) {
      const updatedJobs = jobs.map(job => 
        job.id === selectedJobForAction.id 
          ? { ...job, status: 'Closed' }
          : job
      );
      setJobs(updatedJobs);
    }
    closeModal(); 
  };
  
  const handleDelete = () => { 
    if (selectedJobForAction) {
      const updatedJobs = jobs.filter(job => job.id !== selectedJobForAction.id);
      setJobs(updatedJobs);
    }
    closeModal(); 
  };

  return (
    <div className="jobs-container">
      
      {/* Header */}
      <div className="header-with-icon">
        <div className="title-icon-box"><Briefcase size={22} color="#3b82f6" /></div>
        <div className="title-text">
          <h2>Job Posting Management</h2>
          <p>Create, manage, and track job postings</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Card Row */}
      <div className="filters-card">
        <div className="search-box-container">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search job title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-actions-right">
          <div className="custom-dropdown-container">
            <div className="custom-dropdown-btn" onClick={(e) => toggleFilterMenu(e, 'dept')}>
              <Filter size={14} style={{marginRight: '8px', color: '#94a3b8'}} />
              <span>{selectedDept}</span>
            </div>
            {activeFilterMenu === 'dept' && (
              <div className="filter-drop-menu" onClick={e => e.stopPropagation()}>
                {departments.map((dept, idx) => (
                  <div key={idx} className={`filter-drop-item ${selectedDept === dept ? 'selected' : ''}`} onClick={() => selectFilterOption('dept', dept)}>
                    {dept}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="custom-dropdown-container">
            <div className="custom-dropdown-btn" onClick={(e) => toggleFilterMenu(e, 'branch')}>
              <Filter size={14} style={{marginRight: '8px', color: '#94a3b8'}} />
              <span>{selectedBranch}</span>
            </div>
            {activeFilterMenu === 'branch' && (
              <div className="filter-drop-menu" onClick={e => e.stopPropagation()}>
                {allBranches.map((branch, idx) => (
                  <div key={idx} className={`filter-drop-item ${selectedBranch === branch ? 'selected' : ''}`} onClick={() => selectFilterOption('branch', branch)}>
                    {branch}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="add-new-btn" onClick={() => openModal('create')}>
            <Plus size={16} strokeWidth={2.5} /> Add New Job Opening
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-card">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>JOB TITLE</th>
              <th>DEPARTMENT</th>
              <th>BRANCH</th> 
              <th>CONTRACT TYPE</th>
              <th>APPLICANTS</th>
              <th>DATE POSTED</th>
              <th>STATUS</th>
              <th style={{ textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.slice(0, 5).map((job) => (
              <tr key={job.id}>
                <td className="bold-text">{job.title}</td>
                <td>{job.dept}</td>
                <td>
                  <div className="branch-cell">
                    <MapPin size={14} color="#94a3b8" />
                    <span>{job.branchCount > 1 ? `${job.branchCount} Branches` : job.branch}</span>
                  </div>
                </td>
                <td><span className="type-badge">{job.type}</span></td>
                <td>
                  <div className="applicant-cell">
                    <Users size={14} color="#5d9cec" />
                    <strong>{job.applicants}</strong> applicants
                  </div>
                </td>
                <td>{job.date}</td>
                <td><span className={`status-badge ${job.status.toLowerCase()}`}>{job.status}</span></td>
                <td className="action-cell">
                  <button className="dots-btn" onClick={(e) => toggleActionMenu(e, job.id)}>
                    <MoreVertical size={18} />
                  </button>
                  {activeMenu === job.id && (
                    <div className="action-dropdown">
                        <div className="drop-item" onClick={() => openModal('edit', job)}>
                            <Edit size={16} /> Edit Job
                        </div>
                        <div className="drop-item" onClick={() => openModal('duplicate', job)}>
                            <Copy size={16} /> Duplicate
                        </div>
                        <div className="drop-item warning" onClick={() => openModal('close', job)}>
                            <XCircle size={16} /> Close Position
                        </div>
                        <div className="drop-divider"></div>
                        <div className="drop-item delete" onClick={() => openModal('delete', job)}>
                            <Trash2 size={16} /> Delete
                        </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="table-footer">
          <span className="pagination-info">Showing {filteredJobs.length < 5 ? filteredJobs.length : 5} of {filteredJobs.length} job postings</span>
          <div className="pagination-controls">
            <button className="page-text-btn"><ChevronLeft size={14} /> Previous</button>
            <div className="page-numbers">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
            </div>
            <button className="page-text-btn">Next <ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
            
            {/* Create Job Modal */}
            {activeModal === 'create' && (
                <div className="modal-container" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>Create New Job Opening</h3>
                        <button className="modal-close-btn" onClick={closeModal}><X size={20} /></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Job Title</label>
                            <input 
                                type="text" 
                                name="title"
                                placeholder="e.g. Senior Customs Broker"
                                value={createFormData.title} 
                                onChange={handleCreateFormChange}
                                className="form-input" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <select name="dept" value={createFormData.dept} onChange={handleCreateFormChange} className="form-select">
                                {createDepts.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Branch</label>
                            <select name="branch" value={createFormData.branch} onChange={handleCreateFormChange} className="form-select">
                                {createBranches.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Contract Type</label>
                            <select name="type" value={createFormData.type} onChange={handleCreateFormChange} className="form-select">
                                {contractTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                        <button className="btn-save" onClick={handleCreateJob}>Create Position</button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {activeModal === 'edit' && (
                <div className="modal-container" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>Edit Job Posting</h3>
                        <button className="modal-close-btn" onClick={closeModal}><X size={20} /></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Job Title (Read-only)</label>
                            <input type="text" value={selectedJobForAction?.title} readOnly className="form-input read-only" />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <select name="dept" value={editFormData.dept} onChange={handleEditFormChange} className="form-select">
                                {editModalDepartments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Contract Type</label>
                            <select name="type" value={editFormData.type} onChange={handleEditFormChange} className="form-select">
                                {contractTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                        <button className="btn-save" onClick={saveEditChanges}>Save Changes</button>
                    </div>
                </div>
            )}

            {/* Duplicate Modal */}
            {activeModal === 'duplicate' && (
                <div className="modal-container confirm-modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>Duplicate Job Posting</h3>
                        <button className="modal-close-btn" onClick={closeModal}><X size={20} /></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to duplicate "{selectedJobForAction?.title}"?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                        <button className="btn-save" onClick={handleDuplicate}>Duplicate</button>
                    </div>
                </div>
            )}

            {/* Close Position Modal */}
            {activeModal === 'close' && (
                <div className="modal-container confirm-modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>Close Position</h3>
                        <button className="modal-close-btn" onClick={closeModal}><X size={20} /></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to close "{selectedJobForAction?.title}"? This will stop accepting new applications.</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                        <button className="btn-warning" onClick={handleClosePosition}>Close Position</button>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {activeModal === 'delete' && (
                <div className="modal-container confirm-modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>Delete Job Posting</h3>
                        <button className="modal-close-btn" onClick={closeModal}><X size={20} /></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to permanently delete "{selectedJobForAction?.title}"? This action cannot be undone.</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                        <button className="btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default JobPostings;