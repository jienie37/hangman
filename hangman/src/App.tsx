import { useCallback, useEffect, useRef, useState } from 'react'
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import { wordCategories, categoryEmoji, type CategoryKey } from "./wordCategories"
import styles from "./App.module.css"

type GameMode = "classic" | "hard" | "blitz"

const MODE_CONFIG: Record<GameMode, { lives: number; label: string; description: string; emoji: string }> = {
  classic: { lives: 6, label: "Classic", description: "6 lives",        emoji: "🎭" },
  hard:    { lives: 4, label: "Hard",    description: "4 lives",        emoji: "💀" },
  blitz:   { lives: 4, label: "Blitz",   description: "4 lives + 60s",  emoji: "⚡" },
}

function getRandomWord(category: CategoryKey): string {
  const list = wordCategories[category]
  return list[Math.floor(Math.random() * list.length)]
}

export default function App() {
  const [darkMode,        setDarkMode]        = useState(true)
  const [screen,          setScreen]          = useState<"menu" | "game">("menu")
  const [gameMode,        setGameMode]        = useState<GameMode>("classic")
  const [category,        setCategory]        = useState<CategoryKey>("random")
  const [wordToGuess,     setWordToGuess]     = useState("")
  const [guessedLetters,  setGuessedLetters]  = useState<string[]>([])
  const [score,           setScore]           = useState({ wins: 0, losses: 0, streak: 0 })
  const [timeLeft,        setTimeLeft]        = useState(60)
  const [hintUsed,        setHintUsed]        = useState(false)
  const [shakeWord,       setShakeWord]       = useState(false)

  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null)
  const scoreUpdated = useRef(false)

  const maxGuesses      = MODE_CONFIG[gameMode].lives
  const incorrectLetters = guessedLetters.filter(l => !wordToGuess.includes(l))
  const isLoser  = incorrectLetters.length >= maxGuesses || (gameMode === "blitz" && screen === "game" && timeLeft <= 0)
  const isWinner = wordToGuess.length > 0 && wordToGuess.split("").every(l => guessedLetters.includes(l))
  const isGameOver = isWinner || isLoser

  /* ---- dark/light body class ---- */
  useEffect(() => {
    document.body.classList.toggle("light-mode", !darkMode)
  }, [darkMode])

  /* ---- blitz countdown ---- */
  useEffect(() => {
    if (screen !== "game" || gameMode !== "blitz" || isGameOver) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); return 0 }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [screen, gameMode, isGameOver])

  /* ---- score update (once per game) ---- */
  useEffect(() => {
    if (isGameOver && !scoreUpdated.current) {
      scoreUpdated.current = true
      if (isWinner) setScore(s => ({ ...s, wins: s.wins + 1, streak: s.streak + 1 }))
      else          setScore(s => ({ ...s, losses: s.losses + 1, streak: 0 }))
    }
  }, [isGameOver, isWinner])

  /* ---- add guessed letter ---- */
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isGameOver) return
    setGuessedLetters(curr => [...curr, letter])
    if (!wordToGuess.includes(letter)) {
      setShakeWord(true)
      setTimeout(() => setShakeWord(false), 600)
    }
  }, [guessedLetters, isGameOver, wordToGuess])

  /* ---- physical keyboard ---- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(e.key)
    }
    document.addEventListener("keypress", handler)
    return () => document.removeEventListener("keypress", handler)
  }, [addGuessedLetter])

  /* ---- hint (reveal 1 letter, costs 1 life) ---- */
  function useHint() {
    if (hintUsed || isGameOver || incorrectLetters.length >= maxGuesses - 1) return
    const unguessed = wordToGuess.split("").filter(l => !guessedLetters.includes(l))
    if (!unguessed.length) return
    const hint    = unguessed[Math.floor(Math.random() * unguessed.length)]
    const penalty = "abcdefghijklmnopqrstuvwxyz".split("").find(
      l => !wordToGuess.includes(l) && !guessedLetters.includes(l)
    )
    setHintUsed(true)
    setGuessedLetters(curr => penalty ? [...curr, hint, penalty] : [...curr, hint])
  }

  /* ---- helpers ---- */
  function startGame() {
    scoreUpdated.current = false
    setWordToGuess(getRandomWord(category))
    setGuessedLetters([])
    setHintUsed(false)
    setTimeLeft(60)
    setScreen("game")
  }

  function restartGame() {
    scoreUpdated.current = false
    setWordToGuess(getRandomWord(category))
    setGuessedLetters([])
    setHintUsed(false)
    setTimeLeft(60)
  }

  const timerPercent = (timeLeft / 60) * 100

  /* ======================================================= MENU */
  if (screen === "menu") {
    return (
      <div className={styles.menuContainer}>
        <div className={styles.menuCard}>

          <div className={styles.menuTitle}>
            <span>HANG</span><span className={styles.titleAccent}>MAN</span>
          </div>
          <p className={styles.menuSub}>Guess the word before the man is hanged!</p>

          {(score.wins > 0 || score.losses > 0) && (
            <div className={styles.scoreBoard}>
              <div className={styles.scoreItem}>
                <span className={styles.scoreNumber}>{score.wins}</span>
                <span className={styles.scoreLabel}>Wins</span>
              </div>
              <div className={`${styles.scoreItem} ${styles.scoreDivider}`} />
              <div className={styles.scoreItem}>
                <span className={styles.scoreNumber}>{score.losses}</span>
                <span className={styles.scoreLabel}>Losses</span>
              </div>
              {score.streak > 1 && (
                <>
                  <div className={`${styles.scoreItem} ${styles.scoreDivider}`} />
                  <div className={styles.scoreItem}>
                    <span className={styles.scoreNumber}>{score.streak} 🔥</span>
                    <span className={styles.scoreLabel}>Streak</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Mode selection */}
          <div className={styles.settingsSection}>
            <h3 className={styles.settingsLabel}>Game Mode</h3>
            <div className={styles.modeGrid}>
              {(Object.entries(MODE_CONFIG) as [GameMode, typeof MODE_CONFIG[GameMode]][]).map(([mode, cfg]) => (
                <button
                  key={mode}
                  className={`${styles.modeCard} ${gameMode === mode ? styles.modeCardActive : ""}`}
                  onClick={() => setGameMode(mode)}
                >
                  <span className={styles.modeEmoji}>{cfg.emoji}</span>
                  <span className={styles.modeName}>{cfg.label}</span>
                  <span className={styles.modeDesc}>{cfg.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category selection */}
          <div className={styles.settingsSection}>
            <h3 className={styles.settingsLabel}>Category</h3>
            <div className={styles.categoryGrid}>
              {(Object.keys(wordCategories) as CategoryKey[]).map(cat => (
                <button
                  key={cat}
                  className={`${styles.catChip} ${category === cat ? styles.catChipActive : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  <span>{categoryEmoji[cat]}</span>
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>

          <button className={styles.startButton} onClick={startGame}>START GAME</button>

          <button className={styles.themeToggle} onClick={() => setDarkMode(d => !d)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
    )
  }

  /* ======================================================= GAME */
  return (
    <div className={styles.gameContainer}>

      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.backButton} onClick={() => setScreen("menu")}>← Menu</button>
        <div className={styles.badges}>
          <span className={styles.badge}>{MODE_CONFIG[gameMode].emoji} {MODE_CONFIG[gameMode].label}</span>
          <span className={styles.badge}>{categoryEmoji[category]} {category}</span>
        </div>
        <div className={styles.topScore}>
          <span title="Wins">🏆 {score.wins}</span>
          <span title="Losses">💀 {score.losses}</span>
          {score.streak > 1 && <span title="Streak">🔥 {score.streak}</span>}
        </div>
      </div>

      {/* Blitz timer */}
      {gameMode === "blitz" && (
        <div className={styles.timerWrap}>
          <div className={styles.timerBar}>
            <div
              className={`${styles.timerFill} ${timeLeft <= 10 ? styles.timerFillDanger : ""}`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
          <div className={`${styles.timerLabel} ${timeLeft <= 10 ? styles.timerLabelDanger : ""}`}>
            ⏱ {timeLeft}s
          </div>
        </div>
      )}

      {/* Lives */}
      <div className={styles.lives}>
        {Array.from({ length: maxGuesses }).map((_, i) => (
          <span key={i} className={i < incorrectLetters.length ? styles.heartLost : styles.heartAlive}>
            ❤️
          </span>
        ))}
      </div>

      {/* Game over overlay */}
      {isGameOver && (
        <div className={styles.overlay}>
          <div className={styles.overlayCard}>
            <div className={styles.overlayEmoji}>{isWinner ? "🎉" : "💀"}</div>
            <h2 className={styles.overlayTitle}>{isWinner ? "You Win!" : "Game Over!"}</h2>
            {isLoser && (
              <p className={styles.overlayReveal}>
                The word was: <strong>{wordToGuess.toUpperCase()}</strong>
              </p>
            )}
            {isWinner && score.streak > 1 && (
              <p className={styles.overlayStreak}>🔥 {score.streak} win streak!</p>
            )}
            <div className={styles.overlayActions}>
              <button className={styles.playAgainBtn} onClick={restartGame}>🔄 Play Again</button>
              <button className={styles.menuOutlineBtn} onClick={() => setScreen("menu")}>Menu</button>
            </div>
          </div>
        </div>
      )}

      {/* Hangman drawing */}
      <HangmanDrawing numberofGuesses={incorrectLetters.length} maxGuesses={maxGuesses} />

      {/* Word display */}
      <HangmanWord
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
        reveal={isLoser}
        shake={shakeWord}
      />

      {/* Hint */}
      {!hintUsed && !isGameOver && incorrectLetters.length < maxGuesses - 1 && (
        <button className={styles.hintButton} onClick={useHint}>
          💡 Hint <span className={styles.hintCost}>(-1 life)</span>
        </button>
      )}

      {/* Keyboard */}
      <div className={styles.keyboardArea}>
        <Keyboard
          activeLetter={guessedLetters.filter(l => wordToGuess.includes(l))}
          inactiveLetter={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          disabled={isGameOver}
        />
      </div>
    </div>
  )
}
