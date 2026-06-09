export default function IntroPage({ scenario, onStart }) {
  return (
    <div className="intro-page">
      <div className="intro-hero" style={{ background: scenario.color || '#f0eeff' }}>
        <div className="lesson-badge">{scenario.lessonCode}</div>
        <h1 className="intro-title">{scenario.title}</h1>
      </div>

      <div className="intro-card">
        <p className="intro-desc">{scenario.intro.description}</p>

        <div className="what-label">What You'll Do</div>
        <div>
          {scenario.intro.objectives.map((obj, i) => (
            <div key={i} className="objective-item">
              <span className="obj-icon">→</span>
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-start" onClick={onStart} id="btn-start-activity">
        Start
      </button>
    </div>
  )
}
