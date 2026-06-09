export default function CompletePage({ scenario, step1Tries, step2Tries, onTryAgain, onHome }) {
  const step1Status = step1Tries <= 1 ? 'complete' : 'partial'
  const step2Status = step2Tries <= 1 ? 'complete' : 'partial'
  const score = step1Status === 'complete' && step2Status === 'complete' ? 100
    : step1Status === 'complete' || step2Status === 'complete' ? 75 : 50

  return (
    <div className="complete-page">
      <div className="complete-icon">✓</div>
      <h1 className="complete-title">Activity Complete!</h1>
      <p className="complete-subtitle">{scenario.lessonCode}: {scenario.title}</p>

      <div className="score-circle">
        <span className="score-label">Overall Score</span>
        <span className="score-value">{score}%</span>
      </div>

      <div className="step-results-card">
        <div className="step-results-header">Step Results</div>

        <div className="step-result-row">
          <div>
            <div className="step-result-name">Step 1: Fix the Prompt Used to Generate a SQL code</div>
            <div className="step-result-meta">
              {step1Tries === 1 ? '1st try' : `${step1Tries} tries`}
            </div>
          </div>
          <span className={`status-badge ${step1Status}`}>
            {step1Status === 'complete' ? '✓ Complete' : '~ Complete'}
          </span>
        </div>

        <div className="step-result-row">
          <div>
            <div className="step-result-name">Step 2: Evaluate an SQL Script</div>
            <div className="step-result-meta">
              {step2Tries === 1 ? '1st try' : `${step2Tries} tries`}
            </div>
          </div>
          <span className={`status-badge ${step2Status}`}>
            {step2Status === 'complete' ? '✓ Complete' : '~ Complete'}
          </span>
        </div>
      </div>

      <div className="complete-actions">
        <button id="btn-try-again" className="btn-secondary" onClick={onTryAgain}>
          Try Again
        </button>
        <button id="btn-home" className="btn-primary" onClick={onHome}>
          ← Back to Scenarios
        </button>
      </div>
    </div>
  )
}
