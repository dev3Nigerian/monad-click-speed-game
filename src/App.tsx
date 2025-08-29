import { useState } from 'react'
import { GameComponent } from './components/GameComponent'
import './App.css'

function App() {
  const [score, setScore] = useState(0)

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore)
    // In demo mode, just log the score
    console.log(`Demo score: ${newScore}`)
  }

  return (
    <div className="game-container">
      <div className="user-info">
        <h3>🎮 Demo Mode</h3>
        <p>Welcome to the Monad Click Speed Game!</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          This is a demo version. Scores are not saved to Monad Games ID.
        </p>
      </div>

      <div className="score-display">
        Score: {score}
      </div>

      <GameComponent
        onScoreUpdate={handleScoreUpdate}
        currentScore={score}
      />
    </div>
  )
}

export default App
