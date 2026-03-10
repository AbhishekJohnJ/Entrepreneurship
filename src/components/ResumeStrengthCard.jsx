import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import './ResumeStrengthCard.css';

function ResumeStrengthCard({ score, strengths, weakAreas }) {
  return (
    <div className="resume-strength-card">
      {/* Resume Score Section */}
      <div className="resume-score-header">
        <div className="score-info">
          <h2 className="score-title">Resume Score</h2>
          <div className="score-display">
            <span className="score-number">{score}%</span>
            <TrendingUp className="score-icon" size={32} />
          </div>
        </div>
        <div className="score-progress-circle">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 339.292} 339.292`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              className="progress-circle"
            />
            <text
              x="60"
              y="60"
              textAnchor="middle"
              dy="7"
              fontSize="24"
              fontWeight="bold"
              fill="#1a1a1a"
            >
              {score}%
            </text>
          </svg>
        </div>
      </div>

      {/* Strengths Section */}
      <div className="resume-section">
        <div className="section-header">
          <CheckCircle className="section-icon success" size={20} />
          <h3 className="section-title">Strengths</h3>
        </div>
        <div className="skills-list">
          {strengths.map((skill, index) => (
            <span key={index} className="skill-tag strength">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Weak Areas Section */}
      <div className="resume-section">
        <div className="section-header">
          <AlertCircle className="section-icon warning" size={20} />
          <h3 className="section-title">Weak Areas</h3>
        </div>
        <div className="skills-list">
          {weakAreas.map((area, index) => (
            <span key={index} className="skill-tag weak">
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button className="btn-improve-resume">
        <TrendingUp size={20} />
        Improve Resume
      </button>
    </div>
  );
}

export default ResumeStrengthCard;
