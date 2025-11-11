

interface PieceProps {
  type: string
  color: string
}

export default function Piece({ type, color }: PieceProps) {
  // Improved color scheme for better visibility
  const pieceColor = color === 'w' ? '#ffffff' : '#4a5568'  // Changed from black to gray
  const accentColor = color === 'w' ? '#f7fafc' : '#718096'  // Light gray for black pieces

  const renderPiece = () => {
    switch (type) {
      case 'p': // Pawn - Taller
        return (
          <group>
            {/* Base */}
            <mesh position={[0, 0.1, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.2, 0.18]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.4} 
                roughness={0.3}
              />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.24, 0.35]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.4} 
                roughness={0.3}
              />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.8, 0]} castShadow>
              <sphereGeometry args={[0.24, 16, 16]} />
              <meshStandardMaterial 
                color={accentColor} 
                metalness={0.5} 
                roughness={0.2}
              />
            </mesh>
          </group>
        )

      case 'r': // Rook - Taller
        return (
          <group>
            {/* Base */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.23, 0.21, 0.22]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.4} 
                roughness={0.3}
              />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.21, 0.21, 0.45]} />
              <meshStandardMaterial 
                color={accentColor} 
                metalness={0.3} 
                roughness={0.4}
              />
            </mesh>
            {/* Battlements */}
            {[...Array(4)].map((_, i) => (
              <mesh 
                key={i}
                position={[Math.cos((i * Math.PI * 2) / 4) * 0.16, 0.85, Math.sin((i * Math.PI * 2) / 4) * 0.16]} 
                castShadow
              >
                <boxGeometry args={[0.07, 0.2, 0.07]} />
                <meshStandardMaterial 
                  color={pieceColor} 
                  metalness={0.5} 
                  roughness={0.2}
                />
              </mesh>
            ))}
          </group>
        )

      case 'n': // Knight - Taller
        return (
          <group>
            {/* Base */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.23, 0.21, 0.22]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.4} 
                roughness={0.3}
              />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.21, 0.21, 0.4]} />
              <meshStandardMaterial 
                color={accentColor} 
                metalness={0.3} 
                roughness={0.4}
              />
            </mesh>
            {/* Neck */}
            <mesh position={[0.06, 0.85, 0]} rotation={[-0.3, 0, 0]} castShadow>
              <cylinderGeometry args={[0.13, 0.16, 0.25]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.5} 
                roughness={0.2}
              />
            </mesh>
            {/* Head */}
            <mesh position={[0.14, 1.05, 0.06]} rotation={[-0.5, 0.2, 0]} castShadow>
              <coneGeometry args={[0.2, 0.3, 8]} />
              <meshStandardMaterial 
                color={accentColor} 
                metalness={0.6} 
                roughness={0.1}
              />
            </mesh>
          </group>
        )

      case 'b': // Bishop - Taller
        return (
          <group>
            {/* Base */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.23, 0.21, 0.22]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.4} 
                roughness={0.3}
              />
            </mesh>
            {/* Main body */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.23, 0.21, 0.45]} />
              <meshStandardMaterial 
                color={accentColor} 
                metalness={0.3} 
                roughness={0.4}
              />
            </mesh>
            {/* Slanted top */}
            <mesh position={[0, 0.9, 0]} castShadow>
              <coneGeometry args={[0.27, 0.4, 16]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.5} 
                roughness={0.2}
              />
            </mesh>
            {/* Top point */}
            <mesh position={[0, 1.25, 0]} castShadow>
              <octahedronGeometry args={[0.1]} />
              <meshStandardMaterial 
                color={color === 'w' ? '#f5f5f5' : '#a0aec0'} 
                metalness={0.7} 
                roughness={0.1}
              />
            </mesh>
          </group>
        )

      case 'q': // Queen - Taller
        return (
          <group>
            {/* Base */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.26, 0.23, 0.22]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.4} 
                roughness={0.3}
              />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.23, 0.45]} />
              <meshStandardMaterial 
                color={accentColor} 
                metalness={0.3} 
                roughness={0.4}
              />
            </mesh>
            {/* Slanted top */}
            <mesh position={[0, 0.9, 0]} castShadow>
              <coneGeometry args={[0.3, 0.5, 16]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.5} 
                roughness={0.2}
              />
            </mesh>
            {/* Crown base */}
            <mesh position={[0, 1.15, 0]} castShadow>
              <sphereGeometry args={[0.16, 8, 8]} />
              <meshStandardMaterial 
                color={color === 'w' ? '#f0f0f0' : '#90a4ae'} 
                metalness={0.6} 
                roughness={0.15}
              />
            </mesh>
            {/* Crown points */}
            {[...Array(7)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 7
              return (
                <mesh 
                  key={i} 
                  position={[Math.cos(angle) * 0.22, 1.45, Math.sin(angle) * 0.22]} 
                  castShadow
                >
                  <coneGeometry args={[0.05, 0.15, 6]} />
                  <meshStandardMaterial 
                    color={pieceColor} 
                    metalness={0.7} 
                    roughness={0.1}
                  />
                </mesh>
              )
            })}
          </group>
        )

      case 'k': // King - Taller
        return (
          <group>
            {/* Base */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.26, 0.23, 0.22]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.4} 
                roughness={0.3}
              />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.23, 0.45]} />
              <meshStandardMaterial 
                color={accentColor} 
                metalness={0.3} 
                roughness={0.4}
              />
            </mesh>
            {/* Upper body */}
            <mesh position={[0, 0.9, 0]} castShadow>
              <coneGeometry args={[0.28, 0.5, 16]} />
              <meshStandardMaterial 
                color={pieceColor} 
                metalness={0.5} 
                roughness={0.2}
              />
            </mesh>
            {/* Collar */}
            <mesh position={[0, 1.15, 0]} castShadow>
              <torusGeometry args={[0.16, 0.04, 8, 16]} />
              <meshStandardMaterial 
                color={color === 'w' ? '#e8e8e8' : '#a0a0a0'} 
                metalness={0.6} 
                roughness={0.15}
              />
            </mesh>
            {/* Crown base */}
            <mesh position={[0, 1.3, 0]} castShadow>
              <cylinderGeometry args={[0.13, 0.15, 0.2]} />
              <meshStandardMaterial 
                color={color === 'w' ? '#f5f5f5' : '#90a4ae'} 
                metalness={0.6} 
                roughness={0.1}
              />
            </mesh>
            {/* Top cross */}
            <mesh position={[0, 1.55, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <boxGeometry args={[0.06, 0.04, 0.2]} />
              <meshStandardMaterial 
                color={color === 'w' ? '#d0d0d0' : '#cbd5e0'} 
                metalness={0.7} 
                roughness={0.05}
              />
            </mesh>
            <mesh position={[0, 1.55, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <boxGeometry args={[0.06, 0.04, 0.2]} />
              <meshStandardMaterial 
                color={color === 'w' ? '#d0d0d0' : '#cbd5e0'} 
                metalness={0.7} 
                roughness={0.05}
              />
            </mesh>
          </group>
        )

      default:
        return null
    }
  }

  return <>{renderPiece()}</>
}