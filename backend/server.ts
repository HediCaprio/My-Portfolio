import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Database from 'better-sqlite3';

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'votre_cle_secrete_super_securisee'; // À changer en prod

// Middleware
app.use(cors());
app.use(express.json());

// Base de données locale SQLite
const db = new Database('database.sqlite');

// Initialisation des tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    tags TEXT,
    link TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    name TEXT
  )
`);

// --- ROUTES : AUTHENTIFICATION ---

app.post('/auths/register', async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username et password requis." });
  }

  try {
    const userExist = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (userExist) {
      return res.status(409).json({ error: "Cet utilisateur existe déjà." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    insert.run(username, hashedPassword);

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ username, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de l'inscription." });
  }
});

app.post('/auths/login', async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username et password requis." });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
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

// --- ROUTES : PROJETS ---

app.get('/api/projects', (req: Request, res: Response) => {
  try {
    const projects = db.prepare('SELECT * FROM projects').all();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des projets." });
  }
});

app.post('/api/projects', (req: Request, res: Response) => {
  const { title, description, tags, link } = req.body;
  try {
    const insert = db.prepare('INSERT INTO projects (title, description, tags, link) VALUES (?, ?, ?, ?)');
    const info = insert.run(title, description, tags, link);
    res.json({ id: info.lastInsertRowid, title, description, tags, link });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'ajout du projet." });
  }
});

app.delete('/api/projects/:id', (req: Request, res: Response) => {
  try {
    const del = db.prepare('DELETE FROM projects WHERE id = ?');
    del.run(req.params.id);
    res.json({ message: "Projet supprimé." });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression du projet." });
  }
});

// --- ROUTES : COMPÉTENCES ---

app.get('/api/skills', (req: Request, res: Response) => {
  try {
    const skills = db.prepare('SELECT * FROM skills').all();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des compétences." });
  }
});

app.post('/api/skills', (req: Request, res: Response) => {
  const { category, name } = req.body;
  try {
    const insert = db.prepare('INSERT INTO skills (category, name) VALUES (?, ?)');
    const info = insert.run(category, name);
    res.json({ id: info.lastInsertRowid, category, name });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'ajout de la compétence." });
  }
});

app.delete('/api/skills/:id', (req: Request, res: Response) => {
  try {
    const del = db.prepare('DELETE FROM skills WHERE id = ?');
    del.run(req.params.id);
    res.json({ message: "Compétence supprimée." });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression de la compétence." });
  }
});


// --- SERVIR LE FRONTEND (React) ---
const frontendPath = path.join(__dirname, '../dist');
app.use(express.static(frontendPath));

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur Backend (TypeScript) démarré sur http://localhost:${PORT}`);
});
