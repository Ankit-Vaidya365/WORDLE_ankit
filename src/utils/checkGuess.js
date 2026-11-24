
/**
@param {string} guess - The user's guess input.
@param {string} answer - The correct answer to compare against.
@return {Array<{letter: string, status:'correct' | 'present' | 'absent'}>} - An array of objects representing each letter in the guess and its status.
*/

export function checkGuess(guess, answer) {
    const guessLetters = guess.split('');
    const answerLetters = answer.split('');
    const result = guessLetters.map((letter) => ({letter, status: 'absent'}));
    const letterCount = {};
    for (const letter of answerLetters) {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    for(let i = 0; i < guessLetters.length; i++) {
        if (guessLetters[i] === answerLetters[i]) {
            result[i].status = 'correct';
            letterCount[guessLetters[i]]--;
        }
    }

    for(let i = 0; i < guessLetters.length; i++) {
        if (result[i].status === 'correct') continue;
            const letter = guessLetters[i];
        
        if (letterCount[guessLetters[i]] > 0) {
            result[i].status = 'present';
            letterCount[letter]--;
        }
    }

    return result;
}