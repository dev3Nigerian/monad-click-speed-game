import React from 'react'
import { monadGamesID } from '../services/MonadGamesID'

interface AuthComponentProps {
  onLogin: () => void
}

export const AuthComponent: React.FC<AuthComponentProps> = ({ onLogin }) => {
  const handleMockLogin = async () => {
    try {
      await monadGamesID.mockLogin()
      onLogin()
    } catch (error) {
      console.error('Mock login failed:', error)
    }
  }

  const handleRealLogin = async () => {
    try {
      await monadGamesID.login()
      // Note: This will redirect to Monad auth, so onLogin won't be called immediately
    } catch (error: any) {
      if (error.message === 'Redirect initiated') {
        // This is expected - the redirect is happening
        return
      }
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="auth-section">
      <h2>Welcome to Monad Game!</h2>
      <p>Please sign in to start playing</p>
      
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <button 
          onClick={handleRealLogin}
          style={{ 
            backgroundColor: '#4CAF50', 
            color: 'white',
            padding: '1rem 2rem',
            fontSize: '1.1rem'
          }}
        >
          🔐 Sign in with Monad Games ID
        </button>
        
        <button 
          onClick={handleMockLogin}
          style={{ 
            backgroundColor: '#2196F3', 
            color: 'white',
            padding: '1rem 2rem',
            fontSize: '1.1rem'
          }}
        >
          🎮 Demo Mode (No Auth Required)
        </button>
      </div>
      
      <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
        <p>This game integrates with Monad Games ID for secure authentication and score tracking.</p>
        <p>Use demo mode to try the game without setting up authentication.</p>
      </div>
    </div>
  )
}
