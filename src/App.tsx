import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [running, setRunning] = useState(false)
  const [databaseDown, setDatabaseDown] = useState(false)
  const [completed, setCompleted] = useState(0)
  const [failed, setFailed] = useState(0)

  useEffect(() => {
    if (!running) return

    const timer = window.setInterval(() => {
      if (databaseDown) {
        setFailed(count => count + 1)
      } else {
        setCompleted(count => count + 1)
      }
    }, 1500)

    return () => window.clearInterval(timer)
  }, [running, databaseDown])

  const total = completed + failed
  const successRate = total ? Math.round((completed / total) * 100) : 0

  return (
    <main>
      <header>
        <div>
          <span className="eyebrow">DISTRIBUTED SYSTEMS PLAYGROUND</span>
          <h1>TraceTown<span>.</span></h1>
          <p>Watch requests travel. Break a service. See what happens.</p>
        </div>
        <span className="badge">React + TypeScript</span>
      </header>

      <section className="metrics">
        <article>
          <span>Total requests</span>
          <strong>{total}</strong>
        </article>
        <article>
          <span>Completed</span>
          <strong className="green">{completed}</strong>
        </article>
        <article>
          <span>Failed</span>
          <strong className="red">{failed}</strong>
        </article>
        <article>
          <span>Success rate</span>
          <strong>{successRate}%</strong>
        </article>
      </section>

      <section className="playground">
        <div className="section-heading">
          <div>
            <h2>Payment request flow</h2>
            <p>Simulation: one request every 1.5 seconds.</p>
          </div>
          <span className={`status ${running ? 'active' : ''}`}>
            {running ? '● Traffic running' : '● Traffic paused'}
          </span>
        </div>

        <div className="service-map">
          <div className="service">
            <span className="icon">🌐</span>
            <h3>API Gateway</h3>
            <p>Receives requests</p>
          </div>

          <div className={`road ${running ? 'moving' : ''}`}>
            <span />
          </div>

          <div className="service">
            <span className="icon">💳</span>
            <h3>Payment Service</h3>
            <p>Processes payments</p>
          </div>

          <div className={`road ${running ? 'moving' : ''} ${databaseDown ? 'broken' : ''}`}>
            <span />
          </div>

          <div className={`service ${databaseDown ? 'offline' : ''}`}>
            <span className="icon">🗄️</span>
            <h3>Database</h3>
            <p>{databaseDown ? 'Unavailable' : 'Stores transactions'}</p>
          </div>
        </div>

        <div className="controls">
          <button className="primary" onClick={() => setRunning(!running)}>
            {running ? 'Pause traffic' : 'Start traffic'}
          </button>

          <button onClick={() => setDatabaseDown(!databaseDown)}>
            {databaseDown ? 'Restore database' : 'Simulate database failure'}
          </button>

          <button onClick={() => {
            setCompleted(0)
            setFailed(0)
          }}>
            Reset metrics
          </button>
        </div>

        <div className={`notice ${databaseDown ? 'warning' : ''}`} role="status">
          {databaseDown
            ? 'Database is offline. Incoming requests will fail until you restore it.'
            : 'All services are healthy. Start traffic to watch the simulation.'}
        </div>
      </section>

      <footer>TraceTown · Explore backend behavior visually</footer>
    </main>
  )
}