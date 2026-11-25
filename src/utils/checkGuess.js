/**
 * Compares a guess with the answer.
 * @param {string} guess  - the word the player typed
 * @param {string} answer - the secret word
 * @returns {Array<{letter: string, status: 'correct' | 'present' | 'absent'}>}
 */
export function checkGuess(guess, answer) {
    const guessLetters = guess.split('');    // "crane" -> ['c','r','a','n','e']
    const answerLetters = answer.split('');

    // Start by assuming every letter is wrong ('absent' = grey)
    const result = guessLetters.map((letter) => ({ letter, status: 'absent' }));

    // Count how many times each letter appears in the answer.
    // Example: "apple" -> { a: 1, p: 2, l: 1, e: 1 }
    const letterCount = {};
    for (const letter of answerLetters) {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    // PASS 1: exact matches (right letter, right position) -> 'correct' (green)
    for (let i = 0; i < guessLetters.length; i++) {
        if (guessLetters[i] === answerLetters[i]) {
            result[i].status = 'correct';
            letterCount[guessLetters[i]]--;   // that copy of the letter is now used up
        }
    }

    // PASS 2: letters that exist elsewhere in the word -> 'present' (yellow)
    for (let i = 0; i < guessLetters.length; i++) {
        if (result[i].status === 'correct') continue;   // already green, skip it

        const letter = guessLetters[i];
        if (letterCount[letter] > 0) {      // an unused copy still exists in the answer
            result[i].status = 'present';
            letterCount[letter]--;          // use it up so duplicates aren't over-marked
        }
    }

    // Anything still 'absent' stays grey
    return result;
}