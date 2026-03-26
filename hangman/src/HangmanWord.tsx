type HangmanWordProps = {
    guessedLetters: string[]
    wordtoGuess: string
    reveal?: boolean
}

export function HangmanWord({ guessedLetters, wordtoGuess, reveal = false }:HangmanWordProps){
    return (
        <div style={{
        display: "flex",
        gap: "0.25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
        }} 
    >{wordtoGuess.split("").map((letter, index) => {
        return (
            <span style={{
                borderBottom: ".1em solid black",
            }}>
            <span key={index} style={{
                visibility: guessedLetters.includes(letter) || reveal
                    ? "visible"
                    : "hidden",
                    color: !guessedLetters.includes(letter) && reveal ? "red" : "black",

            }}>
            {letter}
         </span>
         </span>
        )
    })}

    </div>

    )
}