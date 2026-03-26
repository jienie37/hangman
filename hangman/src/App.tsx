import { useCallback, useEffect, useState } from 'react'
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"


function App(){
  const [wordtoGuess, setWordtoGuess] = useState(() => {
    return words[Math.floor(Math.random()*words.length)]})

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordtoGuess.includes(letter))
  
  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordtoGuess.split("").every(letter => guessedLetters.includes(letter))




  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key);
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  console.log(wordtoGuess)    
  return <div
  style={{
    maxWidth : "800px",
    display : "flex",
    flexDirection : "column",
    gap : "2rem",
    margin : "0 auto",
    alignItems: "center"

  }}> <div
  style={{
    fontSize: "10",
    textAlign
    : "center"
  }}>
    
    {isWinner && "You Win!"}
    {isLoser && "You Lose!"}
  </div>
  
  <HangmanDrawing numberofGuesses={incorrectLetters.length} />
  <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordtoGuess={wordtoGuess} />
  <div style={{alignSelf: "stretch"}}>
    <Keyboard 
    disabled={isWinner || isLoser}
    activeLetter={guessedLetters.filter(letter => wordtoGuess.includes(letter))} 
      inactiveLetter={incorrectLetters} 
      addGuessedLetter={addGuessedLetter} />
  </div>
 

  
  </div>
}

export default App
