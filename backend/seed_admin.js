const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');

async function seed() {
  const db = new Database('/Users/hedi/mon-portfolio/backend/database.sqlite');
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  const username = 'Admin@2004';
  const password = await bcrypt.hash('582375892', 10);
  
  try {
    const insert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    insert.run(username, password);
    console.log("Admin créé avec succès !");
  } catch(e) {
    console.log("L'admin existe déjà ou erreur:", e.message);
  }
}
seed();
