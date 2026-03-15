import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Menu, Bell } from 'lucide-react';
import ProfileSummaryCard from '../components/ProfileSummaryCard';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
import './DashboardMain.css';

function Dashboard() {
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Add GitHub project',
      desc: 'Link a real project to showcase your coding skills.',
      why: 'Recruiters check GitHub to verify your technical ability.',
      points: 20,
      difficulty: 'Easy',
      category: 'GitHub',
      completed: false
    },
    {
      id: 2,
      name: 'Update LinkedIn profile',
      desc: 'Add your latest role, skills, and a professional photo.',
      why: '87% of recruiters use LinkedIn to find candidates.',
      points: 15,
      difficulty: 'Medium',
      category: 'LinkedIn',
      completed: false
    },
    {
      id: 3,
      name: 'Add portfolio project',
      desc: 'Showcase a project with description, tech stack, and live link.',
      why: 'A strong portfolio increases interview chances by 3x.',
      points: 10,
      difficulty: 'Easy',
      category: 'Portfolio',
      completed: false
    },
    {
      id: 4,
      name: 'Complete resume summary',
      desc: 'Write a 2–3 sentence professional summary at the top of your resume.',
      why: 'Summaries help recruiters quickly understand your value.',
      points: 25,
      difficulty: 'Hard',
      category: 'Resume',
      completed: false
    },
  ]);

  const skills = [
    { name: 'React', progress: 80 },
    { name: 'Node.js', progress: 65 },
    { name: 'MongoDB', progress: 40 }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const toggleProfileCard = () => {
    setShowProfileCard(!showProfileCard);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasksCount = tasks.filter(t => t.completed).length;

  return (
    <div className="dashboard-page">
      <nav className="top-bar">
        <div className="top-bar-content">
          {/* Logo */}
          <div className="logo">
            <button className="mobile-menu-btn"><Menu size={24} /></button>
            <span className="logo-text">Portfolio</span>
          </div>

          {/* Personal Greeting */}
          <div className="top-bar-greeting">
            <span className="greeting-text">👋 Welcome back, <strong>Abhishek</strong></span>
            <span className="greeting-sub">Ready to build something great today?</span>
          </div>

          {/* Right Actions */}
          <div className="top-bar-actions">
            <button className="top-bar-icon-btn notif-btn">
              <Bell size={20} />
              <span className="notif-badge">3</span>
            </button>
            <button onClick={toggleProfileCard} className="top-bar-icon-btn profile-btn">
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Card Dropdown */}
      {showProfileCard && (
        <>
          <div className="profile-overlay" onClick={toggleProfileCard}></div>
          <div className="profile-dropdown">
            <ProfileSummaryCard
              name="Abhishek John"
              role="Full Stack Developer"
              profileImage="https://ui-avatars.com/api/?name=Abhishek+John&size=200&background=667eea&color=fff&bold=true"
              resumeScore={78}
              leaderboardRank={24}
              totalPoints={1240}
            />
          </div>
        </>
      )}

      {/* Sidebar */}
      <Sidebar />

      <div className="dashboard-container">
        <main className="dashboard-content">
          {/* Page Title */}
          <h1 className="dashboard-title">Dashboard</h1>

          {/* Summary Cards */}
          <div className="summary-cards-grid">
            <div className="summary-card">
              <h3 className="summary-card-title">Resume Score</h3>
              <p className="summary-card-value">78 <span className="value-suffix">/ 100</span></p>
            </div>
            <div className="summary-card">
              <h3 className="summary-card-title">Portfolio Strength</h3>
              <p className="summary-card-value">85 <span className="value-suffix">/ 100</span></p>
            </div>
            <div className="summary-card">
              <h3 className="summary-card-title">Total Points / XP</h3>
              <p className="summary-card-value">1,240 <span className="value-suffix">XP</span></p>
            </div>
            <div className="summary-card">
              <h3 className="summary-card-title">Leaderboard Rank</h3>
              <p className="summary-card-value">#24</p>
            </div>
          </div>

          {/* Visual Progress Area */}
          <div className="progress-area">
            <h2 className="progress-area-title">Profile Strength</h2>
            <div className="progress-bars">

              <div className="progress-item">
                <div className="progress-label">
                  <span className="progress-name">📄 Resume Completion</span>
                  <span className="progress-value">78%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill resume" style={{ width: '78%' }} />
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-label">
                  <span className="progress-name">🔗 LinkedIn Strength</span>
                  <span className="progress-value">65%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill linkedin" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-label">
                  <span className="progress-name">🐙 GitHub Strength</span>
                  <span className="progress-value">82%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill github" style={{ width: '82%' }} />
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-label">
                  <span className="progress-name">🚀 Skill Growth</span>
                  <span className="progress-value">55%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill skill" style={{ width: '55%' }} />
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Layout: Tasks + Right Panel */}
          <div className="bottom-layout">

            {/* Left: Daily Tasks + Skill Progress */}
            <div className="bottom-left">
              {/* Daily Tasks Card */}
              <div className="tasks-card">
                <div className="tasks-card-header">
                  <h2 className="tasks-card-title">Daily Tasks</h2>
                  <span className="tasks-count">{completedTasksCount}/{tasks.length}</span>
                </div>
                <div className="tasks-list">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className={`task-item ${task.completed ? 'completed' : ''}`}
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className="task-top">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="task-checkbox"
                          onClick={e => e.stopPropagation()}
                        />
                        <div className="task-body">
                          <div className="task-header-row">
                            <span className="task-name">{task.name}</span>
                            <div className="task-meta">
                              <span className={`task-difficulty diff-${task.difficulty.toLowerCase()}`}>{task.difficulty}</span>
                              <span className="task-category">{task.category}</span>
                              <span className="task-points">+{task.points} XP</span>
                            </div>
                          </div>
                          <p className="task-desc">{task.desc}</p>
                          <p className="task-why">💡 {task.why}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Progress Card */}
              <div className="skills-card">
                <div className="skills-card-header">
                  <h2 className="skills-card-title">Skill Progress</h2>
                </div>
                <div className="skills-list">
                  {skills.map(skill => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.progress}%</span>
                      </div>
                      <div className="skill-progress-bar">
                        <div className="skill-progress-fill" style={{ width: `${skill.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="right-panel">

              {/* Recent Activity */}
              <div className="panel-card">
                <h3 className="panel-card-title">🕐 Recent Activity</h3>
                <div className="activity-list">
                  {[
                    { icon: '📄', text: 'Resume updated', time: '2 mins ago' },
                    { icon: '🏆', text: 'Reached rank #24', time: '1 hour ago' },
                    { icon: '✅', text: 'Task completed: GitHub project', time: '3 hours ago' },
                    { icon: '🎯', text: 'Earned 20 XP', time: 'Yesterday' },
                  ].map((a, i) => (
                    <div key={i} className="activity-item">
                      <span className="activity-icon">{a.icon}</span>
                      <div className="activity-info">
                        <span className="activity-text">{a.text}</span>
                        <span className="activity-time">{a.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard Preview */}
              <div className="panel-card">
                <h3 className="panel-card-title">🏅 Leaderboard</h3>
                <div className="leaderboard-list">
                  {[
                    { rank: 1, name: 'Sarah K.', xp: 3200, you: false },
                    { rank: 2, name: 'James R.', xp: 2950, you: false },
                    { rank: 3, name: 'Priya M.', xp: 2700, you: false },
                    { rank: 24, name: 'Abhishek J.', xp: 1240, you: true },
                  ].map((u) => (
                    <div key={u.rank} className={`leaderboard-item ${u.you ? 'you' : ''}`}>
                      <span className="lb-rank">{u.rank <= 3 ? ['🥇','🥈','🥉'][u.rank-1] : `#${u.rank}`}</span>
                      <span className="lb-name">{u.name}{u.you && <span className="lb-you-tag">You</span>}</span>
                      <span className="lb-xp">{u.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Quick Tips */}
              <div className="panel-card">
                <h3 className="panel-card-title">🤖 AI Suggestions</h3>
                <div className="tips-list">
                  {[
                    'Add measurable results to your resume bullets.',
                    'Your LinkedIn headline could be more specific.',
                    'Pin your best GitHub repo to your profile.',
                    'Add a "Projects" section to boost portfolio score.',
                  ].map((tip, i) => (
                    <div key={i} className="tip-item">
                      <span className="tip-dot" />
                      <span className="tip-text">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Goals */}
              <div className="panel-card">
                <h3 className="panel-card-title">🎯 Upcoming Goals</h3>
                <div className="goals-list">
                  {[
                    { goal: 'Reach Resume Score 90', due: 'This week', progress: 78 },
                    { goal: 'Complete 5 daily tasks', due: 'Today', progress: 60 },
                    { goal: 'Enter Top 20 Leaderboard', due: 'This month', progress: 40 },
                  ].map((g, i) => (
                    <div key={i} className="goal-item">
                      <div className="goal-header">
                        <span className="goal-name">{g.goal}</span>
                        <span className="goal-due">{g.due}</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill resume" style={{ width: `${g.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
