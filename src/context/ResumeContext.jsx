import { createContext, useContext, useReducer, useEffect } from 'react';
import { sampleResume, emptyResume } from '../data/sampleResume';

const ResumeContext = createContext();

const STORAGE_KEY = 'resumeforge_data';
const RESUMES_KEY = 'resumeforge_resumes';

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
  }
  return null;
}

function loadResumes() {
  try {
    const saved = localStorage.getItem(RESUMES_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load resumes:', e);
  }
  return [];
}

const initialState = {
  resume: loadFromStorage() || sampleResume,
  savedResumes: loadResumes(),
  activeTemplate: 'classic',
  darkMode: localStorage.getItem('resumeforge_darkmode') === 'true',
  jobDescription: '',
  activeSection: 'personal',
  showCoverLetter: false,
};

function resumeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, resume: { ...state.resume, personalInfo: { ...state.resume.personalInfo, ...action.payload } } };

    case 'UPDATE_SUMMARY':
      return { ...state, resume: { ...state.resume, summary: action.payload } };

    case 'UPDATE_SKILLS':
      return { ...state, resume: { ...state.resume, skills: { ...state.resume.skills, ...action.payload } } };

    case 'ADD_EXPERIENCE':
      return { ...state, resume: { ...state.resume, experience: [...state.resume.experience, action.payload] } };

    case 'UPDATE_EXPERIENCE': {
      const updatedExp = state.resume.experience.map(exp =>
        exp.id === action.payload.id ? { ...exp, ...action.payload } : exp
      );
      return { ...state, resume: { ...state.resume, experience: updatedExp } };
    }

    case 'DELETE_EXPERIENCE':
      return { ...state, resume: { ...state.resume, experience: state.resume.experience.filter(e => e.id !== action.payload) } };

    case 'REORDER_EXPERIENCE':
      return { ...state, resume: { ...state.resume, experience: action.payload } };

    case 'ADD_EDUCATION':
      return { ...state, resume: { ...state.resume, education: [...state.resume.education, action.payload] } };

    case 'UPDATE_EDUCATION': {
      const updatedEdu = state.resume.education.map(edu =>
        edu.id === action.payload.id ? { ...edu, ...action.payload } : edu
      );
      return { ...state, resume: { ...state.resume, education: updatedEdu } };
    }

    case 'DELETE_EDUCATION':
      return { ...state, resume: { ...state.resume, education: state.resume.education.filter(e => e.id !== action.payload) } };

    case 'ADD_CERTIFICATION':
      return { ...state, resume: { ...state.resume, certifications: [...(state.resume.certifications || []), action.payload] } };

    case 'UPDATE_CERTIFICATION': {
      const updatedCert = (state.resume.certifications || []).map(c =>
        c.id === action.payload.id ? { ...c, ...action.payload } : c
      );
      return { ...state, resume: { ...state.resume, certifications: updatedCert } };
    }

    case 'DELETE_CERTIFICATION':
      return { ...state, resume: { ...state.resume, certifications: (state.resume.certifications || []).filter(c => c.id !== action.payload) } };

    case 'ADD_PROJECT':
      return { ...state, resume: { ...state.resume, projects: [...(state.resume.projects || []), action.payload] } };

    case 'UPDATE_PROJECT': {
      const updatedProj = (state.resume.projects || []).map(p =>
        p.id === action.payload.id ? { ...p, ...action.payload } : p
      );
      return { ...state, resume: { ...state.resume, projects: updatedProj } };
    }

    case 'DELETE_PROJECT':
      return { ...state, resume: { ...state.resume, projects: (state.resume.projects || []).filter(p => p.id !== action.payload) } };

    case 'ADD_LANGUAGE':
      return { ...state, resume: { ...state.resume, languages: [...(state.resume.languages || []), action.payload] } };

    case 'UPDATE_LANGUAGE': {
      const updatedLang = (state.resume.languages || []).map(l =>
        l.id === action.payload.id ? { ...l, ...action.payload } : l
      );
      return { ...state, resume: { ...state.resume, languages: updatedLang } };
    }

    case 'DELETE_LANGUAGE':
      return { ...state, resume: { ...state.resume, languages: (state.resume.languages || []).filter(l => l.id !== action.payload) } };

    case 'SET_TEMPLATE':
      return { ...state, activeTemplate: action.payload };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'SET_JOB_DESCRIPTION':
      return { ...state, jobDescription: action.payload };

    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };

    case 'TOGGLE_COVER_LETTER':
      return { ...state, showCoverLetter: !state.showCoverLetter };

    case 'RESET_RESUME':
      return { ...state, resume: { ...emptyResume, skills: { technical: [], tools: [], soft: [] }, experience: [], education: [], certifications: [], projects: [], languages: [] } };

    case 'LOAD_SAMPLE':
      return { ...state, resume: { ...sampleResume } };

    case 'LOAD_RESUME':
      return { ...state, resume: action.payload };

    case 'SAVE_RESUME': {
      const newSaved = {
        id: Date.now().toString(),
        name: action.payload || state.resume.personalInfo?.fullName || 'Untitled Resume',
        resume: { ...state.resume },
        savedAt: new Date().toISOString()
      };
      return { ...state, savedResumes: [...state.savedResumes, newSaved] };
    }

    case 'DELETE_SAVED_RESUME':
      return { ...state, savedResumes: state.savedResumes.filter(r => r.id !== action.payload) };

    default:
      return state;
  }
}

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Persist resume to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.resume));
  }, [state.resume]);

  // Persist saved resumes
  useEffect(() => {
    localStorage.setItem(RESUMES_KEY, JSON.stringify(state.savedResumes));
  }, [state.savedResumes]);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('resumeforge_darkmode', state.darkMode);
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within a ResumeProvider');
  return context;
}
