import { meshBounds } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import Piece from './Piece'
interface SquareProps {
  position: string
  piece: any
  isSelected: boolean
  isPossibleMove?: boolean  // Add this
  onClick: (square: string) => void
}

function getSquarePosition(square: string): [number, number, number] {
  const file = square.charCodeAt(0) - 97  // 0-7 for a-h
  const rank = parseInt(square[1])        // 1-8
  const x = file - 3.5
  const z = -(rank - 4.5)  // Flip Z and center properly
  return [x, 0, z]
}

export default function Square({ position, piece, isSelected, isPossibleMove, onClick }: SquareProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [x, y, z] = getSquarePosition(position)
  
  const file = position.charCodeAt(0) - 97
  const rank = parseInt(position[1])
  const isLight = (file + rank) % 2 === 0
 /////////  Handling the click Passes square 
  const handleClick = () => {
    onClick(position)
  }

  return (
    <group position={[x, y, z]}>
      {/* Board Square */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        raycast={meshBounds}
      >
        <boxGeometry args={[0.95, 0.1, 0.95]} />
        <meshStandardMaterial 
          color={isLight ? '#f0d9b5' : '#b58863'}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      {/* Highlight for selected square */}
      {isSelected && (
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.01]} />
          <meshStandardMaterial color="#ffeb3b" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Highlight for valid move */}
      {isPossibleMove && (
        <mesh position={[0, 0.055, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.01]} />
          <meshStandardMaterial color="#4caf50" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Highlight for hover */}
      {hovered && !isSelected && !isPossibleMove && (
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.01]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      )}

      {/* Render piece if exists */}
      {piece && (
        <Piece 
          type={piece.type} 
          color={piece.color}
        />
      )}
    </group>
  )
}