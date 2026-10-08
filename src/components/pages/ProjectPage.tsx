import { Link } from 'react-router-dom';
import Header from '../Header';

export default function ProjectPage() {
  // Liste de vos projets (à modifier avec vos vrais liens GitHub plus tard)
  const projects = [
    {
      title: "RPG 2D Isométrique",
      description: "Jeu de rôle 2D développé avec des assets en pixel art personnalisés. Gestion des collisions, des tilemaps et des spritesheets.",
      tags: ["Java", "Aseprite", "Paint 3D"],
      link: "#"
    },
    {
      title: "Jeu d'Action 3D",
      description: "Projet de jeu vidéo intégrant la gestion des collisions, l'instanciation de prefabs et le cycle de vie des objets.",
      tags: ["C#", "Unity", "Game Design"],
      link: "#"
    },
    {
      title: "Systèmes de Jeu Roblox",
      description: "Développement de mécaniques de gameplay avancées : système de familiers (pet-following), boutique, et mécaniques de rebirth.",
      tags: ["Luau", "Roblox Studio", "UI/UX"],
      link: "#"
    },
    {
      title: "API REST & Frontend",
      description: "Développement d'une interface utilisateur dynamique et configuration de routes backend pour la gestion des données.",
      tags: ["React", "Node.js", "Express", "TypeScript"],
      link: "#"
    }
  ];

  return (
    <div className="portfolio-container">
      {/* Barre de navigation identique à l'accueil */}
      <Header />

      {/* Contenu principal de la page Projets */}
      <main className="main-content" style={{ alignItems: 'flex-start', paddingTop: '8rem' }}>
        <div className="projects-wrapper">
          <h1 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Mes Projets</h1>
          <p className="description" style={{ marginBottom: '3rem' }}>
            Voici une sélection de mes travaux en développement logiciel et jeux vidéo.
          </p>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link">Voir le code →</a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 Hedi Ben Khalifa. Tous droits réservés.</p>
      </footer>
    </div>
  );
}