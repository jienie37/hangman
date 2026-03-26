import type { useEffect } from "react";


const head = (
    <div style={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        border: "10px solid black",
        position: "absolute",
        top: "50px",
        right: "-30px"
    }} />
)
const body = <div style={{
    width: "10px",
    height: "100px",
    background: "black",
    position: "absolute",
    top: "120px",
    right: "0"
}} />

const rightArm = <div style={{
    width: "10px",
    height: "70px",
    background: "black",
    position: "absolute",
    top: "165px",
    right: "-10px",
    rotate: "-130deg",
    transformOrigin: "top left"
}} />

const leftArm = <div style={{
    width: "10px",
    height: "70px",
    background: "black",
    position: "absolute",
    top: "160px",
    right: "-10px",
    rotate: "130deg",
    transformOrigin: "top left"
}} />

const rightLeg = <div style={{
    width: "10px",
    height: "100px",
    background: "black",
    position: "absolute",
    top: "200px",
    right: "-33px",
    rotate: "-45deg"
}} />

const leftLeg = <div style={{
    width: "10px",
    height: "100px",
    background: "black",
    position: "absolute",
    top: "200px",
    right: "33px",
    rotate: "45deg"

}} />
const bodyParts = [head, body, rightArm, leftArm, rightLeg, leftLeg]

type HangmanDrawingProps = {
    numberofGuesses: number
}

export function HangmanDrawing( {numberofGuesses}: HangmanDrawingProps) {
    return <div style={{ position: "relative" }}>

        {bodyParts.slice(0, numberofGuesses)}

        <div style={{height: "50px", width: "10px", background: "black", marginLeft: "100px", top: "10px", right: "0", position: "absolute" }}/>
        <div style={{height: "10px", width: "200px", background: "black", marginLeft: "100px"}}/>
        <div style={{height: "400px", width: "10px", background: "black", marginLeft: "100px"}}/>
        <div style={{height: "10px", width: "300px", background: "black"}}/>
    
    </div>
    
}