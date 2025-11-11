import express from "express";
import cors from "cors";
import { Chess } from "chess.js";

const app = express();

// ✅ Allow Netlify origin explicitly
const allowedOrigins = [
  "https://visionary-klepon-dd1044.netlify.app/", // your Netlify frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const game = new Chess();

app.get("/api/game", (req, res) => {
  res.json({
    fen: game.fen(),
    turn: game.turn(),
    isCheckmate: game.isCheckmate(),
  });
});

app.post("/api/move", (req, res) => {
  const { from, to } = req.body;
  const move = game.move({ from, to, promotion: "q" });

  if (!move) return res.status(400).json({ error: "Invalid move" });

  res.json({
    move,
    fen: game.fen(),
    isCheckmate: game.isCheckmate(),
  });
});

app.post("/api/reset", (req, res) => {
  game.reset();
  res.json({ message: "Game reset", fen: game.fen() });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Chess API running on port ${PORT}`));
