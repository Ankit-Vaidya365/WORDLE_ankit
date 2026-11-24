import { useState, useEffect } from 'react'
import Game from './components/Game'
import Keyboard from './components/Keyboard'
import { useWordle, MAX_GUESSES } from './hooks/useWordle'
import { getRandomWord } from './data/words'

import './App.css'

function WordleGame({ answer, onPlayAgain }) {
  const {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    invalidGuess,
    message,
    handleKeyup,
  } = useWordle(answer);

  const gameOver = isCorrect || turn >= MAX_GUESSES;

  useEffect(() => {
    if (gameOver) return;

    const onKeydown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      handleKeyup(event);
    };
    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, [gameOver, handleKeyup]);

  return (
    <>
      <Game
        guesses={guesses}
        currentGuess={currentGuess}
        turn={turn}
        invalidGuess={invalidGuess}
      />

      <div className={`game-message ${isCorrect ? 'win' : gameOver ? 'lose' : ''}`}>
        {message && <span className="error-message">{message}</span>}
        {isCorrect && 'You Guessed It!'}
        {!isCorrect && gameOver && `Out of guesses. The word was "${answer.toUpperCase()}".`}
        {gameOver && (
          <button type="button" className="play-again" onClick={onPlayAgain}>
            Play Again
          </button>
        )}
      </div>

      <Keyboard usedKeys={usedKeys} onKeyPress={handleKeyup} />
    </>
  );
}

function App() {
  const [answer, setAnswer] = useState(() => getRandomWord());
  const startNewGame = () => setAnswer(getRandomWord());
  return (
    <section id="wordle">
      <h1>Wordle</h1>
      <p>Guess the 5-letter word in 6 tries.</p>
      <WordleGame key={answer} answer={answer} onPlayAgain={startNewGame} />
    </section>
  );
}

export default App;