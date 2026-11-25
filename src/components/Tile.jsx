export default function Tile({ letter, status }) {
    // status is 'correct', 'present', 'absent', or undefined (not checked yet).
    // Result examples: "tile", "tile correct". App.css turns these into colors.
    const className = `tile ${status ? status : ''}`.trim()

    return (
        <div className={className}>{letter}</div>
    )
}