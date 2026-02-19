const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data (temporary database)
let cards = [
  { id: 1, suit: "Hearts", value: "A" },
  { id: 2, suit: "Spades", value: "K" }
];

// Root Route
app.get("/", (req, res) => {
  res.send("Playing Card REST API is running 🚀");
});

// GET all cards
app.get("/cards", (req, res) => {
  res.json(cards);
});

// GET single card by ID
app.get("/cards/:id", (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }
  res.json(card);
});

// POST add new card
app.post("/cards", (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ message: "Suit and Value required" });
  }

  const newCard = {
    id: cards.length + 1,
    suit,
    value
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// PUT update card
app.put("/cards/:id", (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  const { suit, value } = req.body;

  if (suit) card.suit = suit;
  if (value) card.value = value;

  res.json(card);
});

// DELETE card
app.delete("/cards/:id", (req, res) => {
  const cardIndex = cards.findIndex(c => c.id === parseInt(req.params.id));

  if (cardIndex === -1) {
    return res.status(404).json({ message: "Card not found" });
  }

  cards.splice(cardIndex, 1);
  res.json({ message: "Card deleted successfully" });
});

// 🔥 IMPORTANT FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
