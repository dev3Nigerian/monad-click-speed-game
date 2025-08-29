import { useState, useEffect } from 'react'
import { monadGamesID } from './services/MonadGamesID'
import { GameComponent } from './components/GameComponent'
import { AuthComponent } from './components/AuthComponent'
import './App.css'

interface User {
  id: string
  username: string
  walletAddress: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Initialize Monad Games ID
    const initMonadGamesID = async () => {
      try {
        await monadGamesID.initialize()
        
        // Check if user is already authenticated
        const currentUser = await monadGamesID.getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
        }
      } catch (error) {
        console.error('Failed to initialize Monad Games ID:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initMonadGamesID()
  }, [])

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const user = await monadGamesID.login()
      setUser(user)
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await monadGamesID.logout()
      setUser(null)
      setScore(0)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore)
    // Here you could also save the score to Monad's backend
    if (user) {
      monadGamesID.updateUserScore(newScore).catch(console.error)
    }
  }

  if (isLoading) {
    return (
      <div className="game-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="game-container">
      <h1>🎮 Monad Game</h1>
      
      {!user ? (
        <AuthComponent onLogin={handleLogin} />
      ) : (
        <>
          <div className="user-info">
            <h3>Welcome, {user.username}!</h3>
            <p>Wallet: {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          
          <div className="score-display">
            Score: {score}
          </div>
          
          <GameComponent 
            onScoreUpdate={handleScoreUpdate}
            currentScore={score}
          />
        </>
      )}
    </div>
  )
}

export default App
