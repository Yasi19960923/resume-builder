import { useState, useMemo } from 'react';
import { useResume } from './context/ResumeContext';
import PersonalInfoForm from './components/forms/PersonalInfoForm';
import SummaryForm from './components/forms/SummaryForm';
import SkillsForm from './components/forms/SkillsForm';
import ExperienceForm from './components/forms/ExperienceForm';
import EducationForm from './components/forms/EducationForm';
import CertificationsForm from './components/forms/CertificationsForm';
import ProjectsForm from './components/forms/ProjectsForm';
import LanguagesForm from './components/forms/LanguagesForm';
import ClassicATS from './components/templates/ClassicATS';
import ModernATS from './components/templates/ModernATS';
import MinimalATS from './components/templates/MinimalATS';
import ProfessionalATS from './components/templates/ProfessionalATS';
import ATSScoreCard from './components/ats/ATSScoreCard';
import CoverLetterModal from './components/CoverLetterModal';
import SaveLoadModal from './components/SaveLoadModal';
import { exportToPDF } from './utils/exportPDF';
import { exportToDOCX } from './utils/exportDOCX';
import { copyResumeToClipboard } from './utils/clipboard';
import { calculateATSScore } from './utils/atsScorer';


const templates = {
  classic: { name: 'Classic ATS', component: ClassicATS },
  modern: { name: 'Modern ATS', component: ModernATS },
  minimal: { name: 'Minimal ATS', component: MinimalATS },
  professional: { name: 'Professional ATS', component: ProfessionalATS },
};

const sectionNav = [
  { key: 'personal', label: 'Personal', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' },
  { key: 'summary', label: 'Summary', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
  { key: 'skills', label: 'Skills', icon: 'M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' },
  { key: 'experience', label: 'Experience', icon: 'M2 7h20v14H2z' },
  { key: 'education', label: 'Education', icon: 'M22 10v6M2 10l10-5 10 5-10 5z' },
  { key: 'certifications', label: 'Certs', icon: 'M12 8a7 7 0 1 0 0 14 7 7 0 0 0 0-14z' },
  { key: 'projects', label: 'Projects', icon: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' },
  { key: 'languages', label: 'Languages', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z' },
];

export default function App() {
  const { state, dispatch } = useResume();
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const [mobileView, setMobileView] = useState('form'); // 'form' | 'preview'

  const TemplateComponent = templates[state.activeTemplate]?.component || ClassicATS;

  const atsScore = useMemo(() => {
    return calculateATSScore(state.resume, state.jobDescription).totalScore;
  }, [state.resume, state.jobDescription]);

  const handlePDF = async () => {
    setExporting(true);
    try { await exportToPDF('resume-preview'); }
    catch (e) { console.error(e); }
    setExporting(false);
  };

  const handleDOCX = async () => {
    setExporting(true);
    try { await exportToDOCX(state.resume); }
    catch (e) { console.error(e); }
    setExporting(false);
  };

  const handleCopy = () => {
    copyResumeToClipboard(state.resume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset? This will clear all current resume data.')) {
      dispatch({ type: 'RESET_RESUME' });
    }
  };

  const scoreColor = atsScore >= 80 ? '#10b981' : atsScore >= 60 ? '#f59e0b' : atsScore >= 40 ? '#f97316' : '#ef4444';

  const renderForm = () => {
    switch (state.activeSection) {
      case 'personal': return <PersonalInfoForm />;
      case 'summary': return <SummaryForm />;
      case 'skills': return <SkillsForm />;
      case 'experience': return <ExperienceForm />;
      case 'education': return <EducationForm />;
      case 'certifications': return <CertificationsForm />;
      case 'projects': return <ProjectsForm />;
      case 'languages': return <LanguagesForm />;
      default: return <PersonalInfoForm />;
    }
  };

  return (
    <div className={`app ${state.darkMode ? 'dark' : ''}`}>
      {/* Top Bar */}
      <header className="topbar" id="topbar">
        <div className="topbar-left">
          <h1 className="topbar-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="logo-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            ResumeForge
          </h1>
        </div>

        <div className="topbar-center">
          {/* Template Selector */}
          <div className="template-selector">
            <select
              className="template-select"
              value={state.activeTemplate}
              onChange={(e) => dispatch({ type: 'SET_TEMPLATE', payload: e.target.value })}
              id="template-select"
            >
              {Object.entries(templates).map(([key, t]) => (
                <option key={key} value={key}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* ATS Score Badge */}
          <div className="ats-score-badge" style={{ '--score-color': scoreColor }}>
            <div className="ats-score-dot" style={{ backgroundColor: scoreColor }}></div>
            ATS: {atsScore}%
          </div>
        </div>

        <div className="topbar-right">
          <button className="topbar-btn" onClick={handlePDF} disabled={exporting} title="Download PDF" id="btn-pdf">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span className="btn-label">PDF</span>
          </button>
          <button className="topbar-btn" onClick={handleDOCX} disabled={exporting} title="Download DOCX" id="btn-docx">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span className="btn-label">DOCX</span>
          </button>
          <button className="topbar-btn" onClick={handleCopy} title="Copy to Clipboard" id="btn-copy">
            {copied ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span className="btn-label">Copied!</span></>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span className="btn-label">Copy</span></>
            )}
          </button>
          <button className="topbar-btn" onClick={handlePrint} title="Print" id="btn-print">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            <span className="btn-label">Print</span>
          </button>

          <div className="topbar-divider"></div>

          <button className="topbar-btn" onClick={() => setShowCoverLetter(true)} title="Cover Letter" id="btn-cover-letter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span className="btn-label">Letter</span>
          </button>
          <button className="topbar-btn" onClick={() => setShowSaveLoad(true)} title="Save / Load" id="btn-save">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            <span className="btn-label">Save</span>
          </button>
          <button className="topbar-btn" onClick={() => dispatch({ type: 'LOAD_SAMPLE' })} title="Load Sample" id="btn-sample">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <span className="btn-label">Sample</span>
          </button>

          <div className="topbar-divider"></div>

          <button className="topbar-btn icon-only" onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })} title="Toggle Dark Mode" id="btn-darkmode">
            {state.darkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <button className="topbar-btn danger icon-only" onClick={handleReset} title="Reset" id="btn-reset">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          </button>
        </div>
      </header>

      {/* Mobile Toggle */}
      <div className="mobile-toggle">
        <button className={`mobile-toggle-btn ${mobileView === 'form' ? 'active' : ''}`} onClick={() => setMobileView('form')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit
        </button>
        <button className={`mobile-toggle-btn ${mobileView === 'preview' ? 'active' : ''}`} onClick={() => setMobileView('preview')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Preview
        </button>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Panel - Form */}
        <aside className={`form-panel ${mobileView === 'form' ? 'mobile-visible' : 'mobile-hidden'}`} id="form-panel">
          {/* Section Navigation */}
          <nav className="section-nav">
            {sectionNav.map((s) => (
              <button
                key={s.key}
                className={`section-nav-btn ${state.activeSection === s.key ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SET_ACTIVE_SECTION', payload: s.key })}
                title={s.label}
              >
                <span className="section-nav-label">{s.label}</span>
              </button>
            ))}
          </nav>

          {/* Form Content */}
          <div className="form-content">
            {renderForm()}
          </div>
        </aside>

        {/* Right Panel - Preview */}
        <section className={`preview-panel ${mobileView === 'preview' ? 'mobile-visible' : 'mobile-hidden'}`} id="preview-panel">
          <div className="preview-container">
            <div className="preview-page" id="resume-preview">
              <TemplateComponent resume={state.resume} />
            </div>
          </div>

          {/* ATS Score Card - Floating */}
          <ATSScoreCard />
        </section>
      </main>

      {/* Modals */}
      {showCoverLetter && <CoverLetterModal onClose={() => setShowCoverLetter(false)} />}
      {showSaveLoad && <SaveLoadModal onClose={() => setShowSaveLoad(false)} />}
    </div>
  );
}
