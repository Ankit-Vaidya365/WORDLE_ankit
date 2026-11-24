import Row from './Row';
import {MAX_GUESSES} from '../hooks/useWordle';

export default function Game({guesses, currentGuess, turn, invalidGuess}){
    return(
        <div className="game">
            {Array.from({ length: MAX_GUESSES }).map((_, index) => {
                const isCurrentRow = index === turn;
                return(
                    <Row
                        key={index}
                        guess={guesses[index]}
                        currentGuess={isCurrentRow ? currentGuess : null}
                        isInvalid={isCurrentRow && invalidGuess}
                    />
                )
            })}
        </div>
    );
}