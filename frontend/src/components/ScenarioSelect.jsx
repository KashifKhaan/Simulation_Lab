const ICONS = ['🧑‍💼', '📊', '🔗', '📦', '📈']
const TAGS = [
  ['Employees', 'Filter', 'Sort'],
  ['Aggregation', 'HAVING', 'SUM'],
  ['JOIN', 'Two Tables', 'Date Filter'],
  ['Inventory', 'Comparison', 'Stock'],
  ['Logs', 'COUNT', 'Activity'],
]

export default function ScenarioSelect({ scenarios, onSelect }) {
  return (
    <div className="scenario-grid-page">
      <div className="page-header">
        <h1>AI Prompting SQL Lab</h1>
        <p>Choose a scenario to practice writing AI prompts and evaluating SQL output</p>
      </div>

      <div className="scenario-grid">
        {scenarios.map((s, i) => (
          <div
            key={s.id}
            className="scenario-card"
            onClick={() => onSelect(s.id)}
            style={{ '--card-color': s.color }}
          >
            <div className="card-icon" style={{ fontSize: 32, marginBottom: 14 }}>
              {ICONS[i] || '🗄️'}
            </div>
            <div className="card-badge">
              {s.lessonCode}
            </div>
            <div className="card-title">{s.title}</div>
            <div className="card-desc" style={{ marginTop: 8 }}>
              {s.course}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
              {(TAGS[i] || []).map(tag => (
                <span key={tag} style={{
                  padding: '3px 8px',
                  background: 'var(--primary-bg)',
                  color: 'var(--primary)',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="card-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  )
}
