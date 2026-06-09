export default function Sidebar({
  scenarios, activeScenario, page, sidebarSteps,
  getStepStatus, hint, setHint, onReset
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-text">
          <span>Sim</span><span>Lab</span>
        </div>
      </div>

      {activeScenario ? (
        <>
          <div className="sidebar-course">
            <div className="course-label">AI Skills for IT Professionals</div>
            <div className="course-title">{activeScenario.lessonCode}: {activeScenario.title}</div>
            <div className="lesson-title">{activeScenario.title}</div>
          </div>

          <div className="sidebar-steps">
            {sidebarSteps.map((step, i) => {
              const status = getStepStatus(step.key)
              return (
                <div key={step.key} className={`sidebar-step ${status === 'active' ? 'active' : ''}`}>
                  <div className={`step-dot ${status}`}>
                    {status === 'complete' ? '✓' : i + 1}
                  </div>
                  <div className="step-info">
                    <div className="step-name">{step.label}</div>
                    <div className="step-desc">{step.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="sidebar-course">
          <div className="course-label">AI Skills for IT Professionals</div>
          <div className="lesson-title">Choose a scenario to begin</div>
          <div style={{ marginTop: 20 }}>
            {scenarios.map(s => (
              <div key={s.id} style={{
                padding: '8px 10px',
                borderRadius: 8,
                marginBottom: 4,
                fontSize: 12,
                color: 'var(--text-secondary)',
                background: 'var(--bg)',
                fontWeight: 500,
              }}>
                <span style={{ color: 'var(--primary)', marginRight: 6 }}>{s.lessonCode}</span>
                {s.title}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sidebar-bottom">
        {activeScenario && (page === 'step1' || page === 'step2') && (
          <button className="btn-hint" onClick={() => setHint(h => !h)}>
            <span>💡</span> {hint ? 'Hide Hint' : 'View Hint'}
          </button>
        )}
        <button className="btn-reset" onClick={onReset}>
          <span>↺</span> Reset / Home
        </button>
      </div>
    </div>
  )
}
