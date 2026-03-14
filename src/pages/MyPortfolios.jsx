import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Menu, Trash2, Eye, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import GeneratedPortfolio from '../components/GeneratedPortfolio';
import ProfileSummaryCard from '../components/ProfileSummaryCard';
import './Dashboard.css';
import './MyResumes.css';

function MyPortfolios() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);

  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    fetch(`http://localhost:5000/api/portfolios/${user.id}`)
      .then(r => r.json())
      .then(data => { setPortfolios(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/portfolios/${id}`, { method: 'DELETE' });
    setPortfolios(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="dashboard-page">
      <nav className="top-bar">
        <div className="top-bar-content">
          <div className="logo">
            <button className="mobile-menu-btn"><Menu size={24} /></button>
            <span className="logo-text">Portfolio</span>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link">Home</a>
          </div>
          <div className="auth-buttons">
            <button onClick={() => setShowProfileCard(v => !v)} className="btn-user-profile"><User size={20} /></button>
            <button onClick={() => navigate('/')} className="btn-logout-nav">Logout</button>
          </div>
        </div>
      </nav>

      {showProfileCard && (
        <>
          <div className="profile-overlay" onClick={() => setShowProfileCard(false)} />
          <div className="profile-dropdown">
            <ProfileSummaryCard name={user.name || 'User'} role="Member"
              profileImage={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&size=200&background=667eea&color=fff&bold=true`}
              resumeScore={0} leaderboardRank={0} totalPoints={0} />
          </div>
        </>
      )}

      <Sidebar />

      <div className="dashboard-container">
        <main className="dashboard-content">
          <div className="page-header">
            <h1 className="page-title" style={{ color: '#ffa116' }}>My Portfolios</h1>
            <p className="page-subtitle">All your generated portfolios in one place</p>
          </div>

          {loading ? (
            <div className="mr-loading"><div className="gr-spinner" /></div>
          ) : portfolios.length === 0 ? (
            <div className="mr-empty">
              <p>No portfolios yet. <span onClick={() => navigate('/portfolio')}>Build one now →</span></p>
            </div>
          ) : (
            <div className="mr-grid">
              {portfolios.map(p => (
                <div key={p._id} className="mr-card">
                  <div className="mr-card-preview">
                    <div className="mr-card-inner">
                      <GeneratedPortfolio data={p.data} templateId={p.templateId} />
                    </div>
                  </div>
                  <div className="mr-card-footer">
                    <div className="mr-card-info">
                      <span className="mr-card-name">{p.data?.name || 'Portfolio'}</span>
                      <span className="mr-card-date">{new Date(p.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mr-card-actions">
                      <button className="mr-btn mr-btn-view" onClick={() => setPreview(p)}><Eye size={14} /></button>
                      <button className="mr-btn mr-btn-delete" onClick={() => handleDelete(p._id)}><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {preview && (
        <div className="mr-modal-overlay" onClick={() => setPreview(null)}>
          <div className="mr-modal" onClick={e => e.stopPropagation()}>
            <button className="mr-modal-close" onClick={() => setPreview(null)}><X size={20} /></button>
            <div className="mr-modal-body">
              <GeneratedPortfolio data={preview.data} templateId={preview.templateId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPortfolios;
