type HangmanWordProps = {
    guessedLetters: string[]
    wordtoGuess: string
}

export function HangmanWord({ guessedLetters, wordtoGuess}:HangmanWordProps){
    const word = "tite"
    return (
    <div style={{
        display: "flex",
        gap: "0.25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",

        }} 
    >{wordtoGuess.split("").map((letter, index) => (
        <span key={index} style={{
            borderBottom: "0.1em solid black",
        }}>
            {guessedLetters.includes(letter) ? letter : "_"}
        </span>
    ))}

    </div>

    )
}