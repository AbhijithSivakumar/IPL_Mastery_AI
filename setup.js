const fs = require("fs");

const structure = [
    "server/index.js",
    "client/index.html",
    "client/style.css",
    "client/app.js",
    "data/ipl.json",
    ".env"
];

structure.forEach(path => {
    const dir = path.split("/").slice(0, -1).join("/");
    if (dir && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path, "");
});

console.log("✅ Project structure created!");