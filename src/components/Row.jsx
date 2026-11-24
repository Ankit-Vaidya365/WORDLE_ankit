import Tile from './Tile';
// import {useWordle} from '../hooks/useWordle';
import { WORD_LENGTH } from '../hooks/useWordle';


export default function Row({ guess, currentGuess, isInvalid }) {
    if (guess) {
        return (
            <div className="row">
                {guess.map((item, index) => (
                    <Tile key={index} letter={item.letter} status={item.status}/>
                ))}
            </div>
        );
    }



    if(currentGuess != null){
        const letters= currentGuess.split('');
        return(
            <div className={`row${isInvalid ? ' invalid' : ''}`}>
                {/* {Array.from({length: Word_Length}).map((_, index) => ( */}
                    {Array.from({length: WORD_LENGTH}).map((_, index) => (
                    <Tile key={index} letter={letters[index] || ''}/>
                ))}
            </div>
        );
    }

    return(
        <div className='row'>
            {Array.from({length: WORD_LENGTH}).map((_, index) => (
                <Tile key={index} letter=''/>
            ))}
        </div>
    );
}