type HangmanDrawingProps = {
  numberofGuesses: number
  maxGuesses: number
}

const APPEAR = "svgPartAppear 0.4s cubic-bezier(0.34,1.56,0.64,1)"

const PARTS = [
  /* head */
  <circle key="head" cx="205" cy="73" r="25"
    style={{ stroke: "var(--part-color)", strokeWidth: 8, fill: "none",
      transformBox: "fill-box", transformOrigin: "center", animation: APPEAR }} />,
  /* body */
  <line key="body" x1="205" y1="98" x2="205" y2="185"
    style={{ stroke: "var(--part-color)", strokeWidth: 8, strokeLinecap: "round",
      transformBox: "fill-box", transformOrigin: "center", animation: APPEAR }} />,
  /* right arm */
  <line key="r-arm" x1="205" y1="120" x2="245" y2="162"
    style={{ stroke: "var(--part-color)", strokeWidth: 8, strokeLinecap: "round",
      transformBox: "fill-box", transformOrigin: "top left", animation: APPEAR }} />,
  /* left arm */
  <line key="l-arm" x1="205" y1="120" x2="165" y2="162"
    style={{ stroke: "var(--part-color)", strokeWidth: 8, strokeLinecap: "round",
      transformBox: "fill-box", transformOrigin: "top right", animation: APPEAR }} />,
  /* right leg */
  <line key="r-leg" x1="205" y1="185" x2="245" y2="232"
    style={{ stroke: "var(--part-color)", strokeWidth: 8, strokeLinecap: "round",
      transformBox: "fill-box", transformOrigin: "top left", animation: APPEAR }} />,
  /* left leg */
  <line key="l-leg" x1="205" y1="185" x2="165" y2="232"
    style={{ stroke: "var(--part-color)", strokeWidth: 8, strokeLinecap: "round",
      transformBox: "fill-box", transformOrigin: "top right", animation: APPEAR }} />,
]

export function HangmanDrawing({ numberofGuesses, maxGuesses }: HangmanDrawingProps) {
  const dangerRatio = numberofGuesses / maxGuesses
  const ropeColor = dangerRatio >= 0.66 ? "var(--wrong-color)" : "var(--scaffold-color)"

  return (
    <svg
      viewBox="0 0 300 280"
      width="300"
      height="280"
      style={{ overflow: "visible", flexShrink: 0 }}
    >
      {/* Gallows */}
      <line x1="10"  y1="270" x2="290" y2="270" stroke="var(--scaffold-color)" strokeWidth="8" strokeLinecap="round" />
      <line x1="60"  y1="270" x2="60"  y2="10"  stroke="var(--scaffold-color)" strokeWidth="8" strokeLinecap="round" />
      <line x1="60"  y1="10"  x2="205" y2="10"  stroke="var(--scaffold-color)" strokeWidth="8" strokeLinecap="round" />
      {/* Rope */}
      <line x1="205" y1="10"  x2="205" y2="48"
        stroke={ropeColor} strokeWidth="6" strokeLinecap="round"
        style={{ transition: "stroke 0.4s" }}
      />
      {/* Body parts */}
      {PARTS.slice(0, numberofGuesses)}
    </svg>
  )
}