import Row from './Row';
import { MAX_GUESSES } from '../data/words';   // 6

export default function Game({ guesses, currentGuess, turn, invalidGuess }) {
    return (
        <div className="board">   {/* matches the .board rule in App.css */}
            {Array.from({ length: MAX_GUESSES }).map((_, index) => {
                const isCurrentRow = index === turn;   // the row being typed in
                return (
                    <Row
                        key={index}
                        guess={guesses[index]}                             // finished row, or null
                        currentGuess={isCurrentRow ? currentGuess : null}  // typed letters, active row only
                        isInvalid={isCurrentRow && invalidGuess}           // shake the active row only
                    />
                );
            })}
        </div>
    );
}