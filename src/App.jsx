import { useState, useEffect } from 'react'
import Game from './components/Game'
import Keyboard from './components/Keyboard'
import { checkGuess } from './utils/checkGuess'
import { getRandomWord, WORD_LENGTH, MAX_GUESSES } from './data/words'

import './App.css'

// One full game. A new answer creates a brand-new game (see key={answer} in App below).
function WordleGame({ answer, onPlayAgain }) {

  // ===== STATE: everything that changes while playing =====
  const [turn, setTurn] = useState(0);                      // which row we're on (0-5)
  const [currentGuess, setCurrentGuess] = useState('');     // letters typed in the current row
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(null)); // finished rows with colors
  const [isCorrect, setIsCorrect] = useState(false);        // true when the player wins
  const [usedKeys, setUsedKeys] = useState({});             // letter -> status, for keyboard colors
  const [invalidGuess, setInvalidGuess] = useState(false);  // true when Enter is pressed too early
  const [message, setMessage] = useState('');               // alert text shown under the board

  const gameOver = isCorrect || turn >= MAX_GUESSES;        // won, or out of guesses

  // ===== ADD A LETTER =====
  const addLetter = (letter) => {
    setMessage('');                   // hide the alert when the player types again
    setInvalidGuess(false);
    setCurrentGuess((prev) =>
      prev.length < WORD_LENGTH ? prev + letter : prev   // never more than 5 letters
    );
  };

  // ===== DELETE A LETTER =====
  const removeLetter = () => {
    setMessage('');
    setInvalidGuess(false);
    setCurrentGuess((prev) => prev.slice(0, -1));        // drop the last character
  };

  // ===== SUBMIT (when Enter is pressed) =====
  const submitGuess = () => {
    if (gameOver) return;             // game finished, ignore Enter

    // Not 5 letters yet: shake the row and show an alert
    if (currentGuess.length !== WORD_LENGTH) {
      setInvalidGuess(true);
      setMessage(
        currentGuess.length === 0
          ? 'Please enter a word first!'   // nothing typed
          : 'Not enough letters!'          // 1-4 letters typed
      );
      return;                         // stop here, don't use up a turn
    }

    // Get the color of every letter, e.g. [{ letter: 'c', status: 'absent' }, ...]
    const formattedGuess = checkGuess(currentGuess, answer);

    // Save this finished row at the current turn position
    setGuesses((prev) => {
      const next = [...prev];         // copy the array (React needs a new array to re-render)
      next[turn] = formattedGuess;
      return next;
    });

    // Update the keyboard colors: correct beats present, present beats absent
    setUsedKeys((prev) => {
      const next = { ...prev };
      formattedGuess.forEach(({ letter, status }) => {
        const current = next[letter];
        if (status === 'correct') {
          next[letter] = 'correct';
        } else if (status === 'present' && current !== 'correct') {
          next[letter] = 'present';
        } else if (status === 'absent' && !current) {
          next[letter] = 'absent';
        }
      });
      return next;
    });

    if (currentGuess === answer) setIsCorrect(true);   // exact match = win
    setTurn((prev) => prev + 1);                       // move to the next row
    setCurrentGuess('');                               // clear the typed letters
  };

  // ===== ONE HANDLER FOR BOTH KEYBOARDS =====
  // Receives an event from the laptop keyboard, or { key } from the on-screen keyboard.
  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      submitGuess();
    } else if (key === 'Backspace') {
      removeLetter();
    } else if (/^[a-zA-Z]$/.test(key)) {      // one single letter, upper or lower case
      addLetter(key.toLowerCase());           // store lowercase so it matches the answer
    }
  };

  // ===== LISTEN TO THE LAPTOP KEYBOARD =====
  useEffect(() => {
    if (gameOver) return;                     // stop listening when the game ends

    const onKeydown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;  // ignore shortcuts like Ctrl+R
      handleKeyup(event);                     // pass the whole event, not just event.key
    };
    window.addEventListener('keydown', onKeydown);

    // Cleanup: remove the old listener before a new one is added
    return () => window.removeEventListener('keydown', onKeydown);
  }, [gameOver, handleKeyup]);

  // ===== WHAT GETS DRAWN =====
  return (
    <>
      <Game
        guesses={guesses}
        currentGuess={currentGuess}
        turn={turn}
        invalidGuess={invalidGuess}
      />

      {/* Message area: alert, win, lose, and the Play Again button */}
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

      {/* On-screen keyboard: clicking a key calls handleKeyup too */}
      <Keyboard usedKeys={usedKeys} onKeyPress={handleKeyup} />
    </>
  );
}

function App() {
  const [answer, setAnswer] = useState(() => getRandomWord());  // random word, picked once at start
  const startNewGame = () => setAnswer(getRandomWord());        // new word = new game

  return (
    <section id="wordle">
      <h1>Wordle</h1>
      <p>Guess the 5-letter word in 6 tries.</p>
      {/* key={answer}: when the word changes, React throws away the old game and starts fresh */}
      <WordleGame key={answer} answer={answer} onPlayAgain={startNewGame} />
    </section>
  );
}

export default App;