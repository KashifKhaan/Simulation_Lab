import { useState } from 'react'

export default function Step1Page({ scenario, hint, tries, setTries, done, setDone, onNext }) {
  const [prompt, setPrompt] = useState(scenario.step1.starterPrompt)
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/scenarios/${scenario.id}/check-prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setFeedback(data)
      setTries(t => t + 1)
      if (data.correct) setDone(true)
    } catch {
      setFeedback({ correct: false, feedback: 'Could not reach the server. Please try again.' })
    }
    setLoading(false)
  }

  return (
    <div className="step-page">
      <div className="step-header">
        <div className="step-badge">📝 Step 1 of 2</div>
        <h2 className="step-title">{scenario.step1.subtitle}</h2>
      </div>

      {/* Progress */}
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: '50%' }} />
      </div>

      {/* Hint */}
      {hint && (
        <div className="hint-panel">
          <span>💡</span>
          <span>{scenario.step1.hint}</span>
        </div>
      )}

      {/* Table Schema */}
      <div className="table-card">
        <div className="table-header">Table Schema</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Column</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {scenario.step1.tableColumns.map((col, i) => (
              <tr key={i}>
                <td className="col-name">{col.column}</td>
                <td className="col-type">{col.type}</td>
                <td className="col-desc">{col.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Requirements */}
      <div className="req-card">
        <div className="req-title">Requirements:</div>
        <ul className="req-list">
          {scenario.step1.requirements.map((req, i) => (
            <li key={i} className="req-item">
              <span className="req-bullet" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>
        The prompt below is partially complete — edit it to meet all requirements.
      </p>

      {/* Prompt Editor */}
      <div className="prompt-card">
        <div className="prompt-header">✏️ Edit the AI Prompt</div>
        <textarea
          id="prompt-editor"
          className="prompt-textarea"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          disabled={done}
          rows={5}
          spellCheck={false}
        />
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`feedback-banner ${feedback.correct ? 'success' : 'error'}`}>
          <span>{feedback.correct ? '✅' : '❌'}</span>
          <span>{feedback.feedback}</span>
        </div>
      )}

      {/* Tries counter */}
      {tries > 0 && !done && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
          Attempt {tries} — Review the requirements and try again.
        </p>
      )}

      <div className="btn-row">
        {!done ? (
          <button
            id="btn-submit-prompt"
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading || prompt.trim() === scenario.step1.starterPrompt.trim()}
          >
            {loading ? 'Checking…' : 'Submit'}
          </button>
        ) : (
          <button id="btn-next-step" className="btn-primary" onClick={onNext}>
            Next →
          </button>
        )}
      </div>
    </div>
  )
}
