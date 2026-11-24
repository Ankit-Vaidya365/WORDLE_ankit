import { useState, useEffect } from 'react'
import Game from './components/Game'
import Keyboard from './components/Keyboard'
import {useWordle, MAX_GUESSES} from './hooks/useWordle'
import { getRandomWord} from './data/words'


import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'


import './App.css'

function WordleGame({answer, onPlayAgain}) {
    const{
      turn,
      currentGuess,
      guesses,
      isCorrect,
      usedKeys,
      invalidGuess,
      handleKeyup,
    } = useWordle(answer);

    const gameOver = isCorrect || turn >= MAX_GUESSES;

    useEffect(() => {
      if(gameOver) return;
        
        const onKeydown = (event) => handleKeyup(event.key);
        window.addEventListener('keydown', onKeydown);
        
        return () => window.removeEventListener('keydown', onKeydown);
      }, [gameOver, handleKeyup]
    );

      return(
        <>
          <Game
            guesses={guesses}
            currentGuess={currentGuess}
            turn={turn}
            invalidGuess={invalidGuess}
          />

          <div className={`game-message ${isCorrect ? 'win': gameOver? 'lose': ''}`}>
          {isCorrect && 'You Guessed It!'}
          {!isCorrect && gameOver && `Out of guesses. The word was "${answer.toUpperCase()}".`}
          {gameOver &&(
            <button type="button" className="play-again" onClick={onPlayAgain}>
              PlayAgain
            </button>
          )}
          </div>

          <Keyboard usedKeys={usedKeys} onKeyPress={handleKeyup}/>

        </>
      );
    }
  function App(){
    const [answer, setAnswer]=useState(()=> getRandomWord());
    const startNewGame = () => setAnswer(getRandomWord());
    return(
      <section id="wordle">
        <h1>WORDLE</h1>
        <p>Guess The 5-Letter Word in 6 Tries.</p>
        <WordleGame key={answer} answer={answer} onPlayAgain={startNewGame}/>
      </section>
    );
  }


export default App;