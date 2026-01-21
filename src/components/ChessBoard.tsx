import { Chess } from 'chess.js'
import { useEffect, useState } from 'react'
import Square from './Square'
import type { PieceType } from '../types'

const API_BASE = "";

const makeMove = async (from: string, to: string) => {
  try {
    const res = await fetch(`${API_BASE}/api/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to }),
    });

    const data = await res.json();
    console.log("✅ API response:", data);
  } catch (err) {
    console.error("❌ API error:", err);
  }
};


interface ChessBoardProps {
  onPieceCaptured: (piece: PieceType) => void
  onCheckmate?: () => void // ✅ new callback
  resetKey?: number
}

export default function ChessBoard({
  onPieceCaptured,
  onCheckmate,
  resetKey = 0
}: ChessBoardProps) {
  const [game] = useState(() => new Chess())
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [boardState, setBoardState] = useState(0)
  const [validMoves, setValidMoves] = useState<string[]>([])

  // ✅ Reset game when resetKey changes
  useEffect(() => {
    game.reset()
    setSelectedSquare(null)
    setValidMoves([])
    setBoardState(0)
    console.log('Board reset to starting position')
  }, [resetKey, game])

  const handleSquareClick = (square: string) => {
    const piece = game.get(square as any)

    // ✅ Select your own piece
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square)
      try {
        const moves = game.moves({ square: square as any, verbose: true })
        setValidMoves(moves.map((m: any) => m.to))
      } catch {
        console.error('Error getting moves')
      }
      return
    }

    // ✅ Move to another square
    if (selectedSquare) {
      try {
        const move = game.move({
          from: selectedSquare as any,
          to: square as any,
          promotion: 'q'
        })

        if (move) {
          makeMove(move.from, move.to); 
          // 1️⃣ Handle capture first
          if (move.captured) {
            const capturedPiece = move.captured.toLowerCase() as PieceType
            onPieceCaptured(capturedPiece)
          }
        
          // 2️⃣ Update state after move
          setSelectedSquare(null)
          setValidMoves([])
          setBoardState(prev => prev + 1)
        
          // 3️⃣ Checkmate detection must come *after* move is finalized
          setTimeout(() => {
            if (game.isCheckmate()) {
              console.log('✅ Checkmate detected!')
              if (onCheckmate) onCheckmate()
            }
          }, 100) // small delay ensures chess.js updates board state fully
        }
        
      } catch {
        console.log('Invalid move')
        setTimeout(() => {
          setSelectedSquare(null)
          setValidMoves([])
        }, 1000)
      }
    }
  }

  const squares = []
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const file = String.fromCharCode(97 + col)
      const rank = 8 - row
      const square = `${file}${rank}` as any
      const piece = game.get(square)

      squares.push(
        <Square
          key={`${square}-${boardState}`}
          position={square}
          piece={piece}
          isSelected={selectedSquare === square}
          isPossibleMove={validMoves.includes(square)}
          onClick={handleSquareClick}
        />
      )
    }
  }

  return <group>{squares}</group>
}
