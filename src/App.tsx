import { useState } from 'react'
import { monadGamesID } from './services/MonadGamesID'
import { GameComponent } from './components/GameComponent'
import { AuthComponent } from './components/AuthComponent'
import './App.css'

interface User {
  id: string
  username: string
  walletAddress: string
}

type GameMode = 'startup' | 'auth' | 'demo' | 'game'

function App() {
  const [gameMode, setGameMode] = useState<GameMode>('startup')
  const [user, setUser] = useState<User | null>(null)
  const [score, setScore] = useState(0)

  const handleStartupChoice = (choice: 'auth' | 'demo') => {
    setGameMode(choice)
    if (choice === 'demo') {
      setUser({
        id: 'demo-user',
        username: 'Demo Player',
        walletAddress: '0x1234567890123456789012345678901234567890'
      })
    }
  }

  const handleLogin = async () => {
    try {
      const user = await monadGamesID.login()
      setUser(user)
      setGameMode('game')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await monadGamesID.logout()
      setUser(null)
      setScore(0)
      setGameMode('startup')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore)
    if (user && user.id !== 'demo-user') {
      // Save to Monad Games ID if authenticated
      monadGamesID.updateUserScore(newScore).catch(console.error)
    } else {
      // Just log for demo mode
      console.log(`Demo score: ${newScore}`)
    }
  }

  const handleBackToStartup = () => {
    setGameMode('startup')
    setUser(null)
    setScore(0)
  }

  // Startup screen
  if (gameMode === 'startup') {
    return (
      <div className="game-container">
        <div className="startup-screen">
          <h1>🎮 Monad Click Speed Game</h1>
          <p>Choose your game mode:</p>

          <div className="mode-selection">
            <button
              className="mode-button auth-button"
              onClick={() => handleStartupChoice('auth')}
            >
              <div className="mode-icon">🔐</div>
              <div className="mode-content">
                <h3>Sign in with Monad Games ID</h3>
                <p>Save scores and compete on leaderboards</p>
              </div>
            </button>

            <button
              className="mode-button demo-button"
              onClick={() => handleStartupChoice('demo')}
            >
              <div className="mode-icon">🎯</div>
              <div className="mode-content">
                <h3>Play Demo Mode</h3>
                <p>Try the game instantly without signing in</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Authentication screen
  if (gameMode === 'auth') {
    return (
      <div className="game-container">
        <div className="auth-screen">
          <button className="back-button" onClick={handleBackToStartup}>
            ← Back to Menu
          </button>
          <AuthComponent onLogin={handleLogin} />
        </div>
      </div>
    )
  }

  // Game screen (both demo and authenticated)
  return (
    <div className="game-container">
      <div className="user-info">
        <h3>🎮 {user?.id === 'demo-user' ? 'Demo Mode' : `Welcome, ${user?.username}!`}</h3>
        {user?.id !== 'demo-user' && (
          <p>Wallet: {user?.walletAddress.slice(0, 6)}...{user?.walletAddress.slice(-4)}</p>
        )}
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          {user?.id === 'demo-user'
            ? 'This is a demo version. Scores are not saved to Monad Games ID.'
            : 'Your scores are automatically saved to Monad Games ID!'
          }
        </p>
        <div className="user-actions">
          {user?.id !== 'demo-user' && (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          )}
          <button onClick={handleBackToStartup} className="menu-button">Main Menu</button>
        </div>
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
