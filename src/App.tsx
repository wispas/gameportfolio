import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei'
import ChessBoard from './components/ChessBoard'
import InfoModal from './components/InfoModal'
import Navbar from './Navbar'
import type { PieceType } from './types'

function App() {
  const [selectedPiece, setSelectedPiece] = useState<PieceType | null>(null)
  const [resetKey, setResetKey] = useState(0)

  // ✅ Triggered when checkmate occurs
  const handleCheckmate = () => {
    console.log('Checkmate detected!')
    setSelectedPiece('k') // Open King modal (“Get in Touch”)
  }

  return (
    <div className="w-screen h-screen relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(white, rgba(255,255,255,0.2) 2px, transparent 2px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <Navbar onReset={() => setResetKey(prev => prev + 1)} />

      <Canvas shadows>
        <color attach="background" args={['#1a1a2e']} />

        <PerspectiveCamera makeDefault position={[8, 6, 8]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.8} />
        <pointLight position={[10, 10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <ChessBoard
            key={resetKey}
            onPieceCaptured={setSelectedPiece}
            onCheckmate={handleCheckmate} // ✅ Added this
          />
        </Suspense>

        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.3}
          scale={20}
          blur={1}
          far={1.5}
        />

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>

      {/* Info Modal */}
      {selectedPiece && (
        <InfoModal piece={selectedPiece} onClose={() => setSelectedPiece(null)} />
      )}

      {/* Instructions Overlay */}
      <div className="absolute top-20 left-4 text-white bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-xl max-w-sm">
        <h2 className="text-2xl font-bold mb-3">How to Play</h2>
        <div className="space-y-2 text-sm">
          <p className="flex items-start gap-2">
            <span>♟️</span>
            <span><strong>Capture pieces</strong> to learn about me!</span>
          </p>
          <p className="flex items-start gap-2">
            <span>♟️</span>
            <span>Each piece reveals different information</span>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-xs">
            <li>Pawn = My Projects</li>
            <li>Rook = About Me</li>
            <li>Knight = Skills</li>
            <li>Bishop = Education</li>
            <li>Queen = Portfolio</li>
            <li>King = Contact</li>
          </ul>
          <p className="text-xs mt-3 pt-3 border-t border-white/20">
            Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
