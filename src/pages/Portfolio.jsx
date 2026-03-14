import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Menu } from 'lucide-react';
import ProfileSummaryCard from '../components/ProfileSummaryCard';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
import './Portfolio.css';

/* ── Sample portfolio data ── */
const pd = {
  name: 'Alex Morgan',
  title: 'Full Stack Developer',
  tagline: 'Building elegant solutions to complex problems',
  email: 'alex@example.com',
  phone: '+1 (555) 987-6543',
  location: 'San Francisco, CA',
  github: 'github.com/alexmorgan',
  linkedin: 'linkedin.com/in/alexmorgan',
  website: 'alexmorgan.dev',
  about: 'Passionate full-stack developer with 5+ years of experience crafting scalable web applications. I love turning ideas into reality through clean code and thoughtful design.',
  skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Python'],
  projects: [
    { name: 'E-Commerce Platform', desc: 'A full-stack shopping platform with real-time inventory, payment integration, and admin dashboard.', tech: ['React', 'Node.js', 'MongoDB'], link: '#' },
    { name: 'AI Chat App', desc: 'Real-time chat application powered by OpenAI with smart reply suggestions and sentiment analysis.', tech: ['Next.js', 'Socket.io', 'OpenAI'], link: '#' },
    { name: 'DevOps Dashboard', desc: 'Monitoring dashboard for microservices with live metrics, alerts, and deployment pipelines.', tech: ['React', 'Docker', 'AWS'], link: '#' },
  ],
  experience: [
    { role: 'Senior Developer', company: 'TechCorp Inc.', period: '2021 – Present', desc: 'Led a team of 5 engineers building cloud-native applications.' },
    { role: 'Full Stack Developer', company: 'StartupXYZ', period: '2019 – 2021', desc: 'Built and shipped 3 SaaS products from scratch.' },
  ],
};

/* ══════════════════════════════════════
   Template 1 — Dark Hacker Theme
══════════════════════════════════════ */
function PortfolioTemplate1() {
  return (
    <div className="pt pt1">
      <div className="pt1-nav">
        <span className="pt1-logo">&lt;{pd.name.split(' ')[0]} /&gt;</span>
        <div className="pt1-nav-links">
          <span>About</span><span>Projects</span><span>Contact</span>
        </div>
      </div>
      <div className="pt1-hero">
        <div className="pt1-hero-badge">Available for work</div>
        <h1 className="pt1-hero-name">{pd.name}</h1>
        <p className="pt1-hero-title">{pd.title}</p>
        <p className="pt1-hero-tagline">{pd.tagline}</p>
        <div className="pt1-hero-btns">
          <button className="pt1-btn-primary">View Projects</button>
          <button className="pt1-btn-outline">Download CV</button>
        </div>
      </div>
      <div className="pt1-skills-bar">
        {pd.skills.map((s, i) => <span key={i} className="pt1-skill-tag">{s}</span>)}
      </div>
      <div className="pt1-projects">
        <h2 className="pt1-section-title"><span className="pt1-accent">//</span> Projects</h2>
        <div className="pt1-projects-grid">
          {pd.projects.map((p, i) => (
            <div key={i} className="pt1-project-card">
              <div className="pt1-project-num">0{i + 1}</div>
              <h3 className="pt1-project-name">{p.name}</h3>
              <p className="pt1-project-desc">{p.desc}</p>
              <div className="pt1-project-tech">
                {p.tech.map((t, j) => <span key={j} className="pt1-tech-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt1-contact">
        <h2 className="pt1-section-title"><span className="pt1-accent">//</span> Contact</h2>
        <p className="pt1-contact-text">{pd.email} · {pd.github}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Template 2 — Clean Minimal Light
══════════════════════════════════════ */
function PortfolioTemplate2() {
  return (
    <div className="pt pt2">
      <div className="pt2-sidebar">
        <div className="pt2-avatar">AM</div>
        <h2 className="pt2-name">{pd.name}</h2>
        <p className="pt2-title">{pd.title}</p>
        <div className="pt2-divider" />
        <div className="pt2-contact-list">
          <p className="pt2-contact-item">✉ {pd.email}</p>
          <p className="pt2-contact-item">📍 {pd.location}</p>
          <p className="pt2-contact-item">🔗 {pd.github}</p>
        </div>
        <div className="pt2-divider" />
        <p className="pt2-label">Skills</p>
        <div className="pt2-skills">
          {pd.skills.map((s, i) => <span key={i} className="pt2-skill">{s}</span>)}
        </div>
      </div>
      <div className="pt2-main">
        <section className="pt2-section">
          <h2 className="pt2-section-title">About Me</h2>
          <p className="pt2-about">{pd.about}</p>
        </section>
        <section className="pt2-section">
          <h2 className="pt2-section-title">Projects</h2>
          {pd.projects.map((p, i) => (
            <div key={i} className="pt2-project">
              <div className="pt2-project-header">
                <h3 className="pt2-project-name">{p.name}</h3>
                <div className="pt2-project-tech">
                  {p.tech.map((t, j) => <span key={j} className="pt2-tech">{t}</span>)}
                </div>
              </div>
              <p className="pt2-project-desc">{p.desc}</p>
            </div>
          ))}
        </section>
        <section className="pt2-section">
          <h2 className="pt2-section-title">Experience</h2>
          {pd.experience.map((e, i) => (
            <div key={i} className="pt2-exp">
              <div className="pt2-exp-header">
                <strong className="pt2-exp-role">{e.role}</strong>
                <span className="pt2-exp-period">{e.period}</span>
              </div>
              <p className="pt2-exp-company">{e.company}</p>
              <p className="pt2-exp-desc">{e.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Template 3 — Vibrant Gradient Creative
══════════════════════════════════════ */
function PortfolioTemplate3() {
  return (
    <div className="pt pt3">
      <div className="pt3-hero">
        <div className="pt3-hero-content">
          <p className="pt3-greeting">Hello, I'm</p>
          <h1 className="pt3-name">{pd.name}</h1>
          <p className="pt3-title">{pd.title}</p>
          <p className="pt3-tagline">{pd.tagline}</p>
          <div className="pt3-btns">
            <button className="pt3-btn-primary">Hire Me</button>
            <button className="pt3-btn-ghost">See Work</button>
          </div>
        </div>
        <div className="pt3-hero-avatar">AM</div>
      </div>
      <div className="pt3-skills-section">
        <h2 className="pt3-section-title">Tech Stack</h2>
        <div className="pt3-skills-grid">
          {pd.skills.map((s, i) => (
            <div key={i} className="pt3-skill-card">
              <span className="pt3-skill-icon">⚡</span>
              <span className="pt3-skill-name">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pt3-projects-section">
        <h2 className="pt3-section-title">Featured Work</h2>
        <div className="pt3-projects-list">
          {pd.projects.map((p, i) => (
            <div key={i} className={`pt3-project-card pt3-project-card-${i + 1}`}>
              <div className="pt3-project-index">{String(i + 1).padStart(2, '0')}</div>
              <div className="pt3-project-body">
                <h3 className="pt3-project-name">{p.name}</h3>
                <p className="pt3-project-desc">{p.desc}</p>
                <div className="pt3-project-tech">
                  {p.tech.map((t, j) => <span key={j} className="pt3-tech-pill">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt3-contact-section">
        <h2 className="pt3-contact-title">Let's Work Together</h2>
        <p className="pt3-contact-sub">{pd.email}</p>
        <button className="pt3-contact-btn">Get In Touch</button>
      </div>
    </div>
  );
}

function ScaledModalPreview({ children }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(0.72);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.offsetWidth / 900);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: `${900 * scale}px`, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        width: 900,
      }}>
        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Scaled preview — fills container width, clips height
══════════════════════════════════════ */
function ScaledPortfolioPreview({ children }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(0.85);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.offsetWidth / 900);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        width: 900, pointerEvents: 'none', userSelect: 'none',
      }}>
        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Template definitions
══════════════════════════════════════ */
const portfolioTemplates = [
  {
    id: 1,
    name: 'Dark Hacker',
    tag: 'Developer',
    description: 'Terminal-inspired dark theme with green accents. Perfect for developers who want to stand out.',
    component: <PortfolioTemplate1 />,
    recommended: true,
  },
  {
    id: 2,
    name: 'Clean Minimal',
    tag: 'Professional',
    description: 'Clean two-column layout with a light sidebar. Elegant and easy to read.',
    component: <PortfolioTemplate2 />,
    recommended: false,
  },
  {
    id: 3,
    name: 'Vibrant Creative',
    tag: 'Creative',
    description: 'Bold gradient hero with colorful project cards. Great for designers and creatives.',
    component: <PortfolioTemplate3 />,
    recommended: false,
  },
];

/* ══════════════════════════════════════
   Scaled preview helper
══════════════════════════════════════ */
function ScaledPreview({ children, width = 900 }) {
  return (
    <div className="pt-preview-outer">
      <div
        className="pt-preview-inner"
        style={{ width, transform: `scale(var(--pt-scale, 0.42))`, transformOrigin: 'top left' }}
      >
        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Portfolio Page
══════════════════════════════════════ */
function Portfolio() {
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

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
            <ProfileSummaryCard
              name="Abhishek John" role="Full Stack Developer"
              profileImage="https://ui-avatars.com/api/?name=Abhishek+John&size=200&background=667eea&color=fff&bold=true"
              resumeScore={78} leaderboardRank={24} totalPoints={1240}
            />
          </div>
        </>
      )}

      <Sidebar />

      <div className="dashboard-container">
        <main className="dashboard-content">
          <div className="page-header">
            <h1 className="page-title">Portfolio Templates</h1>
            <p className="page-subtitle">Choose a template to showcase your work and skills</p>
          </div>

          <div className="pf-templates-list">
            {portfolioTemplates.map((tpl) => (
              <div key={tpl.id} className={`pf-row ${selectedTemplate === tpl.id ? 'pf-row-selected' : ''}`}>
                {/* Left: info panel */}
                <div className="pf-row-info">
                  {tpl.recommended && <span className="pf-badge">Recommended</span>}
                  <span className="pf-tag">{tpl.tag}</span>
                  <h3 className="pf-tpl-name">{tpl.name}</h3>
                  <p className="pf-tpl-desc">{tpl.description}</p>
                  <div className="pf-row-actions">
                    <button
                      className="pf-btn-preview"
                      onClick={() => setPreviewTemplate(tpl)}
                    >
                      Preview
                    </button>
                    <button
                      className={`pf-btn-select ${selectedTemplate === tpl.id ? 'pf-btn-selected' : ''}`}
                      onClick={() => setSelectedTemplate(tpl.id)}
                    >
                      {selectedTemplate === tpl.id ? '✓ Selected' : 'Use Template'}
                    </button>
                  </div>
                </div>

                {/* Right: scaled preview */}
                <div className="pf-row-preview" onClick={() => setPreviewTemplate(tpl)}>
                  <ScaledPortfolioPreview>
                    {tpl.component}
                  </ScaledPortfolioPreview>
                  <div className="pf-preview-overlay">
                    <span className="pf-preview-hint">Click to preview</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Full preview modal */}
      {previewTemplate && (
        <div className="pf-modal-overlay" onClick={() => setPreviewTemplate(null)}>
          <div className="pf-modal" onClick={e => e.stopPropagation()}>
            <div className="pf-modal-header">
              <span className="pf-modal-title">{previewTemplate.name}</span>
              <div className="pf-modal-actions">
                <button
                  className={`pf-btn-select ${selectedTemplate === previewTemplate.id ? 'pf-btn-selected' : ''}`}
                  onClick={() => { setSelectedTemplate(previewTemplate.id); setPreviewTemplate(null); }}
                >
                  {selectedTemplate === previewTemplate.id ? '✓ Selected' : 'Use Template'}
                </button>
                <button className="pf-modal-close" onClick={() => setPreviewTemplate(null)}>✕</button>
              </div>
            </div>
            <div className="pf-modal-body">
              <ScaledModalPreview>
                {previewTemplate.component}
              </ScaledModalPreview>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
