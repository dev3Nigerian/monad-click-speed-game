import React, { useState, useEffect } from 'react'

interface GameComponentProps {
  onScoreUpdate: (score: number) => void
  currentScore: number
  onGameEnd?: () => void
}

type GameState = 'menu' | 'playing' | 'results'

export const GameComponent: React.FC<GameComponentProps> = ({ onScoreUpdate, onGameEnd }) => {
  const [gameState, setGameState] = useState<GameState>('menu')
  const [timeLeft, setTimeLeft] = useState(30)
  const [clicks, setClicks] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [finalScore, setFinalScore] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [gameState, timeLeft])

  const startGame = () => {
    setGameState('playing')
    setTimeLeft(30)
    setClicks(0)
  }

  const endGame = () => {
    const score = clicks
    setFinalScore(score)
    setGameState('results')
    onScoreUpdate(score)
    
    if (score > highScore) {
      setHighScore(score)
    }
  }

  const handleClick = () => {
    if (gameState === 'playing') {
      setClicks(clicks + 1)
    }
  }

  const handleBackToStartup = () => {
    // Call the onGameEnd callback to return to startup screen
    if (onGameEnd) {
      onGameEnd()
    }
  }

  const playAgain = () => {
    setGameState('menu')
  }

  return (
    <div className="game-area-fullscreen">
      {gameState === 'menu' && (
        <div className="game-menu">
          <h2>🎮 Click Speed Game</h2>
          <p>Click as fast as you can for 30 seconds!</p>
          <button 
            onClick={startGame}
            className="start-button"
          >
            🚀 Start Game
          </button>
          
          {highScore > 0 && (
            <div className="high-score">
              <p>🏆 High Score: {highScore}</p>
            </div>
          )}
        </div>
      )}

      {gameState === 'playing' && (
        <div className="game-play-area">
          <div className="game-header">
            <div className="timer">
              ⏱️ {timeLeft}s
            </div>
            <div className="clicks-counter">
              Clicks: {clicks}
            </div>
          </div>
          
          <div 
            className="click-target"
            onClick={handleClick}
          >
            👆
          </div>
          
          <button 
            onClick={endGame}
            className="end-game-button"
          >
            End Game
          </button>
        </div>
      )}

      {gameState === 'results' && (
        <div className="game-results">
          <h2>🎉 Game Over!</h2>

          <div className="results-content">
            <div className="score-display-result">
              <h3>Your Score</h3>
              <div className="final-score">{finalScore}</div>
            </div>

            <div className="high-score-result">
              <h3>🏆 High Score</h3>
              <div className="high-score-value">{highScore}</div>
            </div>

            {finalScore === highScore && finalScore > 0 && (
              <div className="new-record">
                🎊 New Record! 🎊
              </div>
            )}
          </div>

          <div className="results-actions">
            <button
              onClick={playAgain}
              className="play-again-button"
            >
              🎮 Play Again
            </button>

            <button
              onClick={handleBackToStartup}
              className="main-menu-button"
            >
              🏠 Main Menu
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
