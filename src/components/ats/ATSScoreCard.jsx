import { useState, useMemo } from 'react';
import { useResume } from '../../context/ResumeContext';
import { calculateATSScore, extractKeywordsFromJD, suggestKeywordsForRole } from '../../utils/atsScorer';

export default function ATSScoreCard() {
  const { state, dispatch } = useResume();
  const [showDetails, setShowDetails] = useState(false);
  const [showJD, setShowJD] = useState(false);
  const [activeTab, setActiveTab] = useState('tips'); // 'tips' | 'keywords' | 'jd'

  const atsResult = useMemo(() => {
    return calculateATSScore(state.resume, state.jobDescription);
  }, [state.resume, state.jobDescription]);

  const extractedKeywords = useMemo(() => {
    if (!state.jobDescription) return null;
    return extractKeywordsFromJD(state.jobDescription);
  }, [state.jobDescription]);

  const suggestedKeywords = useMemo(() => {
    return suggestKeywordsForRole(state.resume.personalInfo?.jobTitle || '');
  }, [state.resume.personalInfo?.jobTitle]);

  const scoreColor = atsResult.totalScore >= 80 ? 'score-excellent' :
                     atsResult.totalScore >= 60 ? 'score-good' :
                     atsResult.totalScore >= 40 ? 'score-fair' : 'score-poor';

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (atsResult.totalScore / 100) * circumference;

  const tips = atsResult.suggestions;
  const totalTips = (tips.critical?.length || 0) + (tips.improvements?.length || 0) + (tips.proTips?.length || 0);

  // Check if suggested keywords are already in resume
  const resumeText = JSON.stringify(state.resume).toLowerCase();
  const checkKeywordInResume = (kw) => resumeText.includes(kw.toLowerCase());

  return (
    <div className="ats-score-card" id="ats-score-card">
      {/* Score Circle */}
      <div className="ats-score-circle-wrapper" onClick={() => setShowDetails(!showDetails)}>
        <svg className="ats-score-svg" viewBox="0 0 100 100">
          <circle className="ats-score-bg" cx="50" cy="50" r="40" />
          <circle
            className={`ats-score-ring ${scoreColor}`}
            cx="50" cy="50" r="40"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="ats-score-value">
          <span className="ats-score-number">{atsResult.totalScore}</span>
          <span className="ats-score-label">ATS</span>
        </div>
      </div>

      {/* Details Panel */}
      {showDetails && (
        <div className="ats-details-panel">
          <h4 className="ats-details-title">ATS Score Breakdown</h4>

          <div className="ats-breakdown">
            {Object.entries(atsResult.breakdown).map(([key, value]) => {
              if (value === null) return null;
              const labels = {
                sectionCompleteness: 'Section Completeness',
                skillsCount: 'Skills Coverage',
                experienceFormatting: 'Experience Quality',
                actionVerbs: 'Action Verbs',
                resumeLength: 'Resume Length',
                keywordsMatch: 'Keywords Match'
              };
              return (
                <div key={key} className="ats-breakdown-item">
                  <div className="ats-breakdown-label">
                    <span>{labels[key]}</span>
                    <span className="ats-breakdown-value">{value}%</span>
                  </div>
                  <div className="ats-breakdown-bar">
                    <div
                      className={`ats-breakdown-fill ${value >= 80 ? 'fill-excellent' : value >= 60 ? 'fill-good' : value >= 40 ? 'fill-fair' : 'fill-poor'}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tab Navigation */}
          <div className="ats-tabs">
            <button className={`ats-tab ${activeTab === 'tips' ? 'active' : ''}`} onClick={() => setActiveTab('tips')}>
              Tips {totalTips > 0 && <span className="ats-tab-badge">{totalTips}</span>}
            </button>
            <button className={`ats-tab ${activeTab === 'keywords' ? 'active' : ''}`} onClick={() => setActiveTab('keywords')}>
              Keywords
            </button>
            <button className={`ats-tab ${activeTab === 'jd' ? 'active' : ''}`} onClick={() => setActiveTab('jd')}>
              Job Match
            </button>
          </div>

          {/* Tips Tab */}
          {activeTab === 'tips' && (
            <div className="ats-tips-panel">
              {tips.critical?.length > 0 && (
                <div className="ats-tip-group">
                  <h6 className="ats-tip-group-title critical">🚨 Critical Issues</h6>
                  {tips.critical.map((tip, i) => (
                    <div key={i} className="ats-tip-item critical">
                      <span className="ats-tip-icon">{tip.icon}</span>
                      <span className="ats-tip-text">{tip.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {tips.improvements?.length > 0 && (
                <div className="ats-tip-group">
                  <h6 className="ats-tip-group-title improvement">💡 Improvements</h6>
                  {tips.improvements.map((tip, i) => (
                    <div key={i} className="ats-tip-item improvement">
                      <span className="ats-tip-icon">{tip.icon}</span>
                      <span className="ats-tip-text">{tip.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {tips.proTips?.length > 0 && (
                <div className="ats-tip-group">
                  <h6 className="ats-tip-group-title pro">⭐ Pro Tips</h6>
                  {tips.proTips.map((tip, i) => (
                    <div key={i} className="ats-tip-item pro">
                      <span className="ats-tip-icon">{tip.icon}</span>
                      <span className="ats-tip-text">{tip.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {totalTips === 0 && (
                <div className="ats-perfect-score">
                  <span className="ats-perfect-icon">🎉</span>
                  <p>Your resume looks great! All ATS checks passed.</p>
                </div>
              )}
            </div>
          )}

          {/* Keywords Tab */}
          {activeTab === 'keywords' && (
            <div className="ats-keywords-panel">
              <p className="ats-keywords-desc">
                Suggested keywords for <strong>{state.resume.personalInfo?.jobTitle || 'your role'}</strong>:
              </p>

              {Object.keys(suggestedKeywords).length > 0 ? (
                Object.entries(suggestedKeywords).map(([category, keywords]) => (
                  <div key={category} className="ats-keyword-group">
                    <h6 className="ats-keyword-group-title">
                      {category === 'Must-Have Skills' ? '🔴' : category === 'Recommended' ? '🟡' : '🟢'} {category}
                    </h6>
                    <div className="ats-keyword-tags">
                      {keywords.map((kw, i) => {
                        const inResume = checkKeywordInResume(kw);
                        return (
                          <span
                            key={i}
                            className={`ats-keyword-tag ${inResume ? 'matched' : 'missing'}`}
                            title={inResume ? 'Already in your resume ✓' : 'Missing from your resume — consider adding it'}
                          >
                            {kw}
                            {inResume ? ' ✓' : ' +'}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <p className="ats-keywords-desc">Add a job title to get keyword suggestions.</p>
              )}

              {Object.keys(suggestedKeywords).length > 0 && (
                <div className="ats-keyword-summary">
                  {(() => {
                    const allSuggested = Object.values(suggestedKeywords).flat();
                    const matched = allSuggested.filter(checkKeywordInResume).length;
                    return (
                      <p className="ats-keyword-match-summary">
                        You have <strong>{matched}/{allSuggested.length}</strong> suggested keywords. 
                        {matched < allSuggested.length / 2 
                          ? ' Add more to improve your ATS match rate.'
                          : matched < allSuggested.length 
                            ? ' Good coverage! Add a few more for best results.'
                            : ' Excellent keyword coverage! 🎉'}
                      </p>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Job Description Tab */}
          {activeTab === 'jd' && (
            <div className="ats-jd-panel">
              <p className="ats-keywords-desc">Paste a job description to check how well your resume matches:</p>
              <textarea
                className="form-textarea"
                value={state.jobDescription}
                onChange={(e) => dispatch({ type: 'SET_JOB_DESCRIPTION', payload: e.target.value })}
                placeholder="Paste the full job description here..."
                rows={6}
              />
              {extractedKeywords && extractedKeywords.keywords.length > 0 && (
                <div className="ats-keywords-found">
                  <h6>
                    Keywords Found: {extractedKeywords.keywords.filter(kw => checkKeywordInResume(kw)).length}/{extractedKeywords.keywords.length} matched
                  </h6>
                  <div className="ats-keyword-tags">
                    {extractedKeywords.keywords.map((kw, i) => {
                      const isMatched = checkKeywordInResume(kw);
                      return (
                        <span key={i} className={`ats-keyword-tag ${isMatched ? 'matched' : 'missing'}`}>
                          {kw}
                          {isMatched ? ' ✓' : ' ✗'}
                        </span>
                      );
                    })}
                  </div>
                  {extractedKeywords.additionalInfo?.length > 0 && (
                    <div className="ats-jd-extras">
                      <h6>Other Requirements:</h6>
                      <div className="ats-keyword-tags">
                        {extractedKeywords.additionalInfo.map((info, i) => (
                          <span key={i} className="ats-keyword-tag info">{info}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {state.jobDescription && (!extractedKeywords || extractedKeywords.keywords.length === 0) && (
                <p className="ats-keywords-desc" style={{ marginTop: '10px' }}>No matching keywords found. Try pasting a more detailed job description.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
