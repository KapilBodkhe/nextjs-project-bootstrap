"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

// Mock async function to simulate code generation
async function generateCode(prompt: string): Promise<string> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Return sample code based on prompt (mock)
  if (!prompt.trim()) {
    return "Please enter a prompt to generate code."
  }
  if (prompt.toLowerCase().includes("tic-tac-toe")) {
    return `// React Tic-Tac-Toe Game Example
import React, { useState } from "react"

function Square({ value, onClick }) {
  return (
    <button className="w-16 h-16 border border-gray-600 text-2xl font-bold" onClick={onClick}>
      {value}
    </button>
  )
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? "X" : "O"
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  function calculateWinner(squares) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ]
    for (let line of lines) {
      const [a,b,c] = line
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const winner = calculateWinner(squares)
  const status = winner ? \`Winner: \${winner}\` : \`Next player: \${xIsNext ? "X" : "O"}\`

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  )
}
`
  }

  // Default fallback code
  return `// Code generation for prompt: "${prompt}"\n\n// This is a mock response. Replace with real AI API integration.`
}

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    const code = await generateCode(prompt)
    setOutput(code)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 gap-8">
      <h1 className="text-4xl font-bold text-center max-w-3xl">
        World-Class Code Generator
      </h1>
      <p className="text-center max-w-xl text-muted-foreground">
        Enter a prompt describing the code you want, and get excellent code output.
      </p>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        <Textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="font-mono text-sm"
          disabled={loading}
        />
        <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
          {loading ? "Generating..." : "Generate Code"}
        </Button>
      </div>

      {output && (
        <div className="w-full max-w-3xl">
          <label htmlFor="output" className="block mb-2 font-semibold">
            Generated Code:
          </label>
          <Textarea
            id="output"
            value={output}
            readOnly
            rows={20}
            className="font-mono text-sm whitespace-pre overflow-auto"
          />
        </div>
      )}
    </main>
  )
}
