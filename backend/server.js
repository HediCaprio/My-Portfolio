const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'votre_cle_secrete_super_securisee'; // À changer en prod

// Middleware
app.use(cors());
app.use(express.json());

// Base de données locale SQLite
const db = new Database('database.sqlite');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// --- ROUTE : INSCRIPTION ---
app.post('/auths/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username et password requis." });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExist = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (userExist) {
      return res.status(409).json({ error: "Cet utilisateur existe déjà." });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insérer dans la BDD
    const insert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    insert.run(username, hashedPassword);

    // Générer un token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });

    res.json({ username, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de l'inscription." });
  }
});

// --- ROUTE : CONNEXION ---
app.post('/auths/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username et password requis." });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ username, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la connexion." });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur Backend démarré sur http://localhost:${PORT}`);
});
