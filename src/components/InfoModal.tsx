import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion, AnimatePresence } from "framer-motion";

interface InfoModalProps {
  piece: string;
  onClose: () => void;
  isCheckmate?: boolean;
}

interface PieceInfo {
  title: string;
  description: string;
  icon: string;
  links?: { text: string; url: string }[];
}

export default function InfoModal({ piece, onClose, isCheckmate = false }: InfoModalProps) {
  const [info, setInfo] = useState<PieceInfo | null>(null);

  useEffect(() => {
    const fetchPieceInfo = async () => {
      const docRef = doc(db, "pieces", piece);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("🔥 Firestore Data:", data);

        const pieceInfo: PieceInfo = {
          title: data.title,
          description: data.description,
          icon: data.icon,
        };
            /// It is seperating the text and url from Firebase 
        const links: { text: string; url: string }[] = [];
          if (data.linkText && data.linkUrl)
            links.push({ text: data.linkText, url: data.linkUrl });
          if (data.linkText1 && data.linkUrl1)
            links.push({ text: data.linkText1, url: data.linkUrl1 });

          if (links.length > 0) {
            console.log("🧩 Links prepared:", links);
            pieceInfo.links = links;
        }


        setInfo(pieceInfo);
      }
    };

    fetchPieceInfo();
  }, [piece, isCheckmate]);

  if (!info) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          className="bg-gray-800 p-8 rounded-lg max-w-md w-full mx-4 backdrop-blur-lg border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">{info.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-4">{info.title}</h2>
            <p className="text-gray-300 mb-6">{info.description}</p>

            {info.links && info.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mx-2"
              >
                {link.text}
              </a>
            ))}

            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
