import styles from "./HangmanWord.module.css"

type HangmanWordProps = {
  guessedLetters: string[]
  wordToGuess: string
  reveal?: boolean
  shake?: boolean
}

export function HangmanWord({ guessedLetters, wordToGuess, reveal = false, shake = false }: HangmanWordProps) {
  return (
    <div className={`${styles.wordRow} ${shake ? styles.shake : ""}`}>
      {wordToGuess.split("").map((letter, i) => {
        const isGuessed  = guessedLetters.includes(letter)
        const isRevealed = reveal && !isGuessed
        return (
          <span key={i} className={styles.letterBox}>
            <span className={`${styles.letter} ${isGuessed ? styles.letterVisible : ""} ${isRevealed ? styles.letterRevealed : ""}`}>
              {letter}
            </span>
          </span>
        )
      })}
    </div>
  )
}