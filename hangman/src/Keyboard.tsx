import styles from "./Keyboard.module.css"

const keys = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]   

type KeyboardProps = {
    activeLetter: string[]
    inactiveLetter: string[]
    addGuessedLetter: (letter: string) => void
}

export function Keyboard({ activeLetter, inactiveLetter, addGuessedLetter}: KeyboardProps) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
            gap: "0.5rem"
        }}>
            {keys.map(key => {
                const isActive = activeLetter.includes(key)
                const isInactive = inactiveLetter.includes(key)
                return (            
                <button onClick={() => addGuessedLetter(key) } 
                className={`${styles.button} ${isActive ? styles.active : ""} 
                ${isInactive ? styles.inactive : ""}`} 
                disabled={isActive || isInactive}

                key={key} >
                {key}
                </button>
            )})}
        </div>
    )
}