import styles from "./Keyboard.module.css"

const KEYS = "abcdefghijklmnopqrstuvwxyz".split("")

type KeyboardProps = {
  activeLetter: string[]
  inactiveLetter: string[]
  addGuessedLetter: (letter: string) => void
  disabled?: boolean
}

export function Keyboard({ disabled = false, activeLetter, inactiveLetter, addGuessedLetter }: KeyboardProps) {
  return (
    <div className={styles.grid}>
      {KEYS.map(key => {
        const isActive   = activeLetter.includes(key)
        const isInactive = inactiveLetter.includes(key)
        const isDisabled = disabled || isActive || isInactive
        return (
          <button
            key={key}
            disabled={isDisabled}
            onClick={() => addGuessedLetter(key)}
            className={`${styles.key} ${isActive ? styles.correct : ""} ${isInactive ? styles.wrong : ""}`}
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}