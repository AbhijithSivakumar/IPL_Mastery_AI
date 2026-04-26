const API = "http://localhost:3000";

// AI
async function askAI() {
    const question = document.getElementById("question").value;

    const res = await fetch(`${API}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
    });

    const data = await res.json();
    document.getElementById("answer").innerText = data.answer;
}

function askSample(q) {
    document.getElementById("question").value = q;
    askAI();
}

// Teams
async function loadTeams() {
    const res = await fetch(`${API}/teams`);
    const teams = await res.json();

    const container = document.getElementById("teams");
    container.innerHTML = "";

    teams.forEach(team => {
        const div = document.createElement("div");
        div.className = `team-card ${team.id}`;

        div.innerHTML = `
            <h3>${team.name}</h3>
            <button onclick="loadPlayers('${team.id}')">Players</button>
            <div id="p-${team.id}"></div>
        `;

        container.appendChild(div);
    });
}

// Players
async function loadPlayers(id) {
    const res = await fetch(`${API}/players/${id}`);
    const players = await res.json();

    const el = document.getElementById(`p-${id}`);
    el.innerHTML = "";

    players.forEach(p => {
        el.innerHTML += `
            <div class="player-card">
                <h4>${p.name}</h4>
                <p>${p.role}</p>
                <p>Runs: ${p.runs}</p>
                <p>Wickets: ${p.wickets}</p>
            </div>
        `;
    });
}

// Quiz
async function loadQuiz() {
    const res = await fetch(`${API}/quiz`);
    const quiz = await res.json();

    const container = document.getElementById("quiz");
    container.innerHTML = "";

    quiz.forEach(q => {
        container.innerHTML += `
            <div class="quiz-card">
                <p>${q.question}</p>
                ${q.options.map(o =>
            `<button onclick="checkAnswer('${o}','${q.answer}')">${o}</button>`
        ).join("")}
            </div>
        `;
    });
}

function checkAnswer(s, c) {
    alert(s === c ? "✅ Correct!" : "❌ Wrong!");
}