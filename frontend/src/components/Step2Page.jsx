import { useState } from 'react'

function SqlBlock({ code }) {
  // Simple syntax highlighting
  const lines = code.split('\n').map((line, i) => {
    const isComment = line.trim().startsWith('--')
    const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING',
      'INNER JOIN', 'JOIN', 'ON', 'AS', 'ASC', 'DESC', 'AND', 'OR', 'COUNT', 'SUM', 'YEAR']

    if (isComment) {
      return <div key={i}><span className="sql-comment">{line}</span></div>
    }

    let highlighted = line
    keywords.forEach(kw => {
      highlighted = highlighted.replace(
        new RegExp(`\\b${kw}\\b`, 'g'),
        `__KW__${kw}__KW__`
      )
    })

    const parts = highlighted.split(/(__KW__.*?__KW__)/)
    return (
      <div key={i}>
        {parts.map((part, j) => {
          if (part.startsWith('__KW__')) {
            const word = part.replace(/__KW__/g, '')
            return <span key={j} className="sql-keyword">{word}</span>
          }
          // highlight strings
          const strParts = part.split(/('.*?')/)
          return strParts.map((sp, k) =>
            sp.startsWith("'")
              ? <span key={k} className="sql-string">{sp}</span>
              : <span key={k}>{sp}</span>
          )
        })}
      </div>
    )
  })

  return (
    <div className="sql-block">
      <div className="sql-header">
        <div className="sql-dot red" />
        <div className="sql-dot yellow" />
        <div className="sql-dot green" />
        <span className="sql-label">AI Generated SQL</span>
      </div>
      <div className="sql-code">{lines}</div>
    </div>
  )
}

export default function Step2Page({ scenario, hint, tries, setTries, done, setDone, onNext }) {
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    if (!selected) return
    setLoading(true)
    try {
      const res = await fetch(`/api/scenarios/${scenario.id}/check-answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: selected }),
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

  const getOptionClass = (optId) => {
    if (!feedback) return selected === optId ? 'selected' : ''
    if (optId === feedback.correctAnswer) return 'correct'
    if (optId === selected && !feedback.correct) return 'incorrect'
    return ''
  }

  return (
    <div className="step-page">
      <div className="step-header">
        <div className="step-badge">🔍 Step 2 of 2</div>
        <h2 className="step-title">{scenario.step2.subtitle}</h2>
      </div>

      {/* Progress */}
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: '100%' }} />
      </div>

      {/* Hint */}
      {hint && (
        <div className="hint-panel">
          <span>💡</span>
          <span>{scenario.step2.hint}</span>
        </div>
      )}

      {/* SQL Code */}
      <SqlBlock code={scenario.step2.sqlCode} />

      {/* Question */}
      <p className="question-title">{scenario.step2.question}</p>

      {/* Options */}
      <div className="choice-list">
        {scenario.step2.options.map(opt => (
          <div
            key={opt.id}
            id={`choice-${opt.id}`}
            className={`choice-option ${getOptionClass(opt.id)}`}
            onClick={() => { if (!done) setSelected(opt.id) }}
          >
            <div className="choice-letter">{opt.id}</div>
            <div className="choice-text">{opt.text}</div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`feedback-banner ${feedback.correct ? 'success' : 'error'}`}>
          <span>{feedback.correct ? '✅' : '❌'}</span>
          <span>{feedback.feedback}</span>
        </div>
      )}

      {tries > 0 && !done && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
          Attempt {tries} — Review the SQL query carefully and try again.
        </p>
      )}

      <div className="btn-row">
        {!done ? (
          <button
            id="btn-check-answer"
            className="check-btn"
            onClick={handleCheck}
            disabled={!selected || loading}
          >
            {loading ? 'Checking…' : 'Check Answer'}
          </button>
        ) : (
          <button id="btn-finish" className="btn-primary" onClick={onNext}>
            Finish →
          </button>
        )}
      </div>
    </div>
  )
}
