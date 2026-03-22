const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const FILE = "referrals.json";

// Load referrals
function loadRefs() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

// Save referrals
function saveRefs(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// Get all referrals
app.get("/api/referrals", (req, res) => {
  res.json(loadRefs());
});

// Add referral
app.post("/api/referrals", (req, res) => {
  const refs = loadRefs();
  refs.push(req.body);
  saveRefs(refs);
  res.json({ success: true });
});

// Generate post variations
app.post("/api/generate", (req, res) => {
  const { title, link, reward } = req.body;

  const templates = [
    `🔥 ${reward} FREE - takes 2 minutes\n${link}`,
    `Quick ${reward} bonus, super easy signup:\n${link}`,
    `I just got ${reward} from this:\n${link}`,
    `${reward} free - no effort:\n${link}`
  ];

  res.json(templates);
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));
