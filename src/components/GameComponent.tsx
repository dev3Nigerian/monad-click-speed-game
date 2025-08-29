import React, { useState, useEffect } from 'react'

interface GameComponentProps {
  onScoreUpdate: (score: number) => void
  currentScore: number
  onGameEnd?: () => void
}

export const GameComponent: React.FC<GameComponentProps> = ({ onScoreUpdate, onGameEnd }) => {
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [clicks, setClicks] = useState(0)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameActive) {
      endGame()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [gameActive, timeLeft])

  const startGame = () => {
    setGameActive(true)
    setTimeLeft(30)
    setClicks(0)
  }

  const endGame = () => {
    setGameActive(false)
    const finalScore = clicks
    onScoreUpdate(finalScore)
    
    if (finalScore > highScore) {
      setHighScore(finalScore)
    }

    // Call the onGameEnd callback to return to startup screen
    if (onGameEnd) {
      onGameEnd()
    }
  }

  const handleClick = () => {
    if (gameActive) {
      setClicks(clicks + 1)
    }
  }

  return (
    <div className="game-area-fullscreen">
      {!gameActive ? (
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
      ) : (
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
    </div>
  )
}
