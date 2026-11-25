import Tile from './Tile';
import { WORD_LENGTH } from '../data/words';   // 5

export default function Row({ guess, currentGuess, isInvalid }) {

    // CASE 1: this row was already submitted -> show colored tiles.
    // guess looks like [{ letter: 'a', status: 'correct' }, ...]
    if (guess) {
        return (
            <div className="row">
                {guess.map((item, index) => (
                    <Tile key={index} letter={item.letter} status={item.status} />
                ))}
            </div>
        );
    }

    // CASE 2: the row the player is typing in right now
    if (currentGuess != null) {
        const letters = currentGuess.split('');   // "ap" -> ['a', 'p']
        return (
            // the class "invalid" triggers the shake animation in App.css
            <div className={`row${isInvalid ? ' invalid' : ''}`}>
                {Array.from({ length: WORD_LENGTH }).map((_, index) => (
                    // typed letters first, the remaining tiles stay empty
                    <Tile key={index} letter={letters[index] || ''} />
                ))}
            </div>
        );
    }

    // CASE 3: a future row -> 5 empty tiles
    return (
        <div className="row">
            {Array.from({ length: WORD_LENGTH }).map((_, index) => (
                <Tile key={index} letter="" />
            ))}
        </div>
    );
}