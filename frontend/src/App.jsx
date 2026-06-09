import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ScenarioSelect from './components/ScenarioSelect'
import IntroPage from './components/IntroPage'
import Step1Page from './components/Step1Page'
import Step2Page from './components/Step2Page'
import CompletePage from './components/CompletePage'
import './index.css'

// page states: 'select' | 'intro' | 'step1' | 'step2' | 'complete'

export default function App() {
  const [scenarios, setScenarios] = useState([])
  const [activeScenario, setActiveScenario] = useState(null)
  const [page, setPage] = useState('select')
  const [hint, setHint] = useState(false)
  const [step1Tries, setStep1Tries] = useState(0)
  const [step2Tries, setStep2Tries] = useState(0)
  const [step1Done, setStep1Done] = useState(false)
  const [step2Done, setStep2Done] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/scenarios')
      .then(r => r.json())
      .then(data => { setScenarios(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const loadScenario = async (id) => {
    setLoading(true)
    const res = await fetch(`/api/scenarios/${id}`)
    const data = await res.json()
    setActiveScenario(data)
    setPage('intro')
    setHint(false)
    setStep1Tries(0)
    setStep2Tries(0)
    setStep1Done(false)
    setStep2Done(false)
    setLoading(false)
  }

  const goBack = () => {
    if (page === 'step2') setPage('step1')
    else if (page === 'step1') setPage('intro')
    else if (page === 'intro') { setPage('select'); setActiveScenario(null) }
    else if (page === 'complete') setPage('step2')
    setHint(false)
  }

  const goForward = () => {
    if (page === 'intro') setPage('step1')
    else if (page === 'step1' && step1Done) setPage('step2')
    else if (page === 'step2' && step2Done) setPage('complete')
    setHint(false)
  }

  const canGoBack = page !== 'select'
  const canGoForward =
    (page === 'intro') ||
    (page === 'step1' && step1Done) ||
    (page === 'step2' && step2Done)

  const getTopbarTitle = () => {
    if (page === 'select') return 'Choose a Scenario'
    if (page === 'intro') return 'Introduction'
    if (page === 'step1') return `Step 1: ${activeScenario?.step1?.subtitle}`
    if (page === 'step2') return `Step 2: ${activeScenario?.step2?.subtitle}`
    if (page === 'complete') return 'Activity Report'
    return ''
  }

  const sidebarSteps = activeScenario ? [
    { key: 'intro', label: 'Introduction', desc: 'Read the overview and click Start to begin.' },
    { key: 'step1', label: 'Step 1/2', desc: activeScenario.step1?.instructions },
    { key: 'step2', label: 'Step 2/2', desc: activeScenario.step2?.instructions },
    { key: 'complete', label: 'Complete', desc: 'Activity complete! Review your report.' },
  ] : []

  const getStepStatus = (key) => {
    if (key === 'intro') return page === 'intro' ? 'active' : (page !== 'select' ? 'complete' : 'pending')
    if (key === 'step1') return page === 'step1' ? 'active' : (step1Done ? 'complete' : 'pending')
    if (key === 'step2') return page === 'step2' ? 'active' : (step2Done ? 'complete' : 'pending')
    if (key === 'complete') return page === 'complete' ? 'active' : 'pending'
    return 'pending'
  }

  return (
    <div className="app-layout">
      <Sidebar
        scenarios={scenarios}
        activeScenario={activeScenario}
        page={page}
        sidebarSteps={sidebarSteps}
        getStepStatus={getStepStatus}
        hint={hint}
        setHint={setHint}
        onReset={() => { setPage('select'); setActiveScenario(null); setHint(false) }}
      />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-nav">
            <button className="nav-arrow" onClick={goBack} disabled={!canGoBack} title="Back">‹</button>
            <button className="nav-arrow" onClick={goForward} disabled={!canGoForward} title="Next">›</button>
          </div>
          <span className="topbar-title">{getTopbarTitle()}</span>
        </div>

        {loading ? (
          <div className="loading-screen">
            <div className="spinner" />
            Loading…
          </div>
        ) : (
          <div className="content-scroll">
            {page === 'select' && (
              <ScenarioSelect scenarios={scenarios} onSelect={id => loadScenario(id)} />
            )}
            {page === 'intro' && activeScenario && (
              <IntroPage scenario={activeScenario} onStart={() => setPage('step1')} />
            )}
            {page === 'step1' && activeScenario && (
              <Step1Page
                scenario={activeScenario}
                hint={hint}
                tries={step1Tries}
                setTries={setStep1Tries}
                done={step1Done}
                setDone={setStep1Done}
                onNext={() => { setPage('step2'); setHint(false) }}
              />
            )}
            {page === 'step2' && activeScenario && (
              <Step2Page
                scenario={activeScenario}
                hint={hint}
                tries={step2Tries}
                setTries={setStep2Tries}
                done={step2Done}
                setDone={setStep2Done}
                onNext={() => { setPage('complete'); setHint(false) }}
              />
            )}
            {page === 'complete' && activeScenario && (
              <CompletePage
                scenario={activeScenario}
                step1Tries={step1Tries}
                step2Tries={step2Tries}
                onTryAgain={() => loadScenario(activeScenario.id)}
                onHome={() => { setPage('select'); setActiveScenario(null) }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
