// Shared settings. Game.jsx, Row.jsx and App.jsx all import these,
// so the numbers are defined in exactly one place.
export const WORD_LENGTH = 5;   // every word has 5 letters
export const MAX_GUESSES = 6;   // player gets 6 tries

// All possible answers (lowercase, 5 letters each)
export const WORDS = [
    'apple',
    'brave',
    'crane',
    'drink',
    'eagle',
    'flame',
    'grape',
    'house',
    'input',
    'joker',
    'knife',
    'lemon',
    'mango',
    'night',
    'ocean',
    'pilot',
    'queen',
    'river',
    'stone',
    'tiger',
    'unity',
    'vivid',
    'water',
    'xenon',
    'yacht',
    'zebra',
];

/**
 * Picks one random word from the list.
 * @returns {string}
 */
export function getRandomWord() {
    // Math.random() gives a number from 0 up to (but not including) 1.
    // Multiplying by the list length and rounding down gives a valid index.
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
}