# ResumeForge — ATS-Friendly Resume Builder

A modern, fully client-side ATS-friendly resume builder built with **React**, **Vite**, and **TailwindCSS v4**. Create, optimize, and export professional resumes that pass Applicant Tracking Systems.

![ResumeForge Screenshot](https://img.shields.io/badge/ATS-Optimized-10b981?style=for-the-badge) ![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### Core Resume Builder
- **8 Editable Sections** — Personal Info, Summary, Skills, Experience, Education, Certifications, Projects, Languages
- **Live Preview** — Real-time rendering as you type
- **4 ATS-Safe Templates** — Classic, Modern, Minimal, Professional
- **Dark Mode** — Toggle between light and dark themes

### ATS Optimization
- **ATS Scoring Engine** — 0-100% score based on completeness, skills, formatting, action verbs, and content length
- **Categorized Tips** — Critical Issues, Improvements, and Pro Tips with actionable advice
- **Role-Based Keyword Suggestions** — Recommends must-have, recommended, and bonus keywords based on your job title
- **Job Description Matching** — Paste a JD to see which keywords you match vs. miss

### AI-Powered Content
- **Summary Generator** — Creates ATS-optimized professional summaries
- **Bullet Point Generator** — Generates role-specific achievement bullets with metrics
- **Cover Letter Generator** — Tailored cover letters from your resume data

### Export Options
- **PDF** — Clean A4 formatted PDF download
- **DOCX** — Professional Word document with proper formatting
- **Clipboard** — Copy resume as plain text
- **Print** — Optimized print stylesheet

### Bonus Features
- **Save/Load** — Multiple resume slots with localStorage persistence
- **Sample Data** — Pre-built example resume to get started
- **Responsive Design** — Mobile-friendly with edit/preview toggle
- **No Backend Required** — 100% client-side, privacy-focused

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Yasi19960923/resume-builder.git
cd resume-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI Framework |
| Vite 8 | Build Tool & Dev Server |
| TailwindCSS v4 | Base Styling |
| html2pdf.js | PDF Generation |
| docx + file-saver | DOCX Export |

## 📁 Project Structure

```
src/
├── App.jsx                          # Main split-panel layout
├── index.css                        # Full design system
├── main.jsx                         # Entry point
├── context/ResumeContext.jsx        # Global state (useReducer + localStorage)
├── components/
│   ├── forms/                       # 8 form components
│   ├── templates/                   # 4 ATS template components
│   ├── ats/ATSScoreCard.jsx         # ATS scoring panel with tabs
│   ├── CoverLetterModal.jsx         # Cover letter generator
│   └── SaveLoadModal.jsx            # Save/load resume slots
├── utils/
│   ├── atsScorer.js                 # Scoring engine + keyword suggestions
│   ├── aiAssistant.js               # AI content generators
│   ├── exportPDF.js                 # PDF export
│   ├── exportDOCX.js                # DOCX export
│   └── clipboard.js                 # Clipboard utility
└── data/
    ├── actionVerbs.js               # 100+ categorized action verbs
    ├── keywords.js                  # Tech keyword database
    └── sampleResume.js              # Sample resume data
```

## 📝 ATS Compatibility Rules

All templates enforce strict ATS compatibility:
- ✅ Single column layout
- ✅ No tables or multi-column structures
- ✅ No icons or images in resume content
- ✅ Standard fonts only (Calibri, Helvetica, Arial)
- ✅ Clean section headers with proper hierarchy
- ✅ Bullet points with action verbs

## 🎨 Templates

| Template | Description |
|----------|-------------|
| **Classic ATS** | Traditional with horizontal rules and uppercase headings |
| **Modern ATS** | Blue accents, dot-separated skills, bordered entries |
| **Minimal ATS** | Ultra-clean with lightweight headings and whitespace |
| **Professional ATS** | Bold headers, shaded sections, gradient dividers |

## 📄 License

MIT License — feel free to use, modify, and distribute.
