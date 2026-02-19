const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

let cards = [
  { id: 1, rank: "Ace", suit: "Spades", color: "Black" },
  { id: 2, rank: "King", suit: "Hearts", color: "Red" }
];

app.get("/", (req, res) => {
  res.send("Playing Card API is running");
});

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.get("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(c => c.id === id);

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  res.json(card);
});

app.post("/cards", (req, res) => {
  const { rank, suit, color } = req.body;

  if (!rank || !suit || !color) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newCard = {
    id: cards.length ? cards[cards.length - 1].id + 1 : 1,
    rank,
    suit,
    color
  };

  cards.push(newCard);

  res.status(201).json(newCard);
});

app.put("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(c => c.id === id);

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  const { rank, suit, color } = req.body;

  if (rank) card.rank = rank;
  if (suit) card.suit = suit;
  if (color) card.color = color;

  res.json(card);
});

app.delete("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Card not found" });
  }

  const deletedCard = cards.splice(index, 1);

  res.json({ message: "Card deleted", deletedCard });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
