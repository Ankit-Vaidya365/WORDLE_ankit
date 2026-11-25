// The three keyboard rows. 'Enter' and 'Backspace' are the special keys.
const KEY_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

export default function Keyboard({ usedKeys, onKeyPress }) {
  return (
    <div className="keyboard">
      {KEY_ROWS.map((row, rowIndex) => (      // ( ) so each row is returned
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => {
            const status = usedKeys[key];     // 'correct' / 'present' / 'absent' / undefined
            const isAction = key === 'Enter' || key === 'Backspace';

            // Builds e.g. "key", "key correct" or "key wide"
            const className = ['key', status || '', isAction ? 'wide' : '']
              .join(' ')
              .trim();

            return (
              <button
                key={key}
                className={className}
                onMouseDown={(e) => e.preventDefault()}  // stops the button keeping focus (avoids double Enter)
                onClick={() => onKeyPress({ key })}      // sends { key } because handleKeyup expects an object
              >
                {key === 'Backspace' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}