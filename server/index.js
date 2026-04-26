const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

const teams = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/teams.json"))
);
const players = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/players.json"))
);

// =====================
// 🔹 AI
// =====================
app.post("/ask", (req, res) => {
    try {
        const q = (req.body.question || "").toLowerCase();

        if (!q) return res.json({ answer: "Ask something about IPL!" });

        // Player
        const player = players.find(p =>
            q.includes(p.name.toLowerCase())
        );
        if (player) {
            return res.json({
                answer: `🏏 ${player.name}
Role: ${player.role}
Matches: ${player.matches}
Runs: ${player.runs}
Wickets: ${player.wickets}`
            });
        }

        // Team
        const team = teams.find(t =>
            q.includes(t.name.toLowerCase())
        );
        if (team) {
            const count = players.filter(p => p.team === team.id).length;
            return res.json({
                answer: `🏆 ${team.name}
Players in DB: ${count}`
            });
        }

        // General
        let answer = "";
        if (q.includes("how many teams")) answer = "IPL has 10 teams.";
        else if (q.includes("ipl") && q.includes("start")) answer = "IPL started in 2008.";
        else if (q.includes("most runs")) answer = "Virat Kohli has most IPL runs.";
        else if (q.includes("most wickets")) answer = "Yuzvendra Chahal leads wickets.";
        else if (q.includes("most titles")) answer = "MI and CSK lead titles.";
        else if (q.includes("highest score")) answer = "Chris Gayle scored 175*.";
        else answer = "Try asking about teams, players, or IPL records.";

        res.json({ answer });

    } catch {
        res.json({ answer: "Error occurred." });
    }
});

// =====================
app.get("/teams", (req, res) => res.json(teams));

app.get("/players/:teamId", (req, res) => {
    res.json(players.filter(p => p.team === req.params.teamId));
});

// =====================
app.get("/quiz", (req, res) => {
    res.json([
        { question: "IPL started?", options: ["2005", "2008", "2012"], answer: "2008" },
        { question: "Most runs?", options: ["Dhoni", "Kohli", "Rohit"], answer: "Kohli" },
        { question: "Most titles?", options: ["CSK", "MI", "RCB"], answer: "MI" },
        { question: "175 score?", options: ["ABD", "Gayle", "Warner"], answer: "Gayle" },
        { question: "Mr IPL?", options: ["Raina", "Dhoni", "Kohli"], answer: "Raina" }
    ]);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));