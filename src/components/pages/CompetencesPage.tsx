import { Link } from 'react-router-dom';
import Header from '../Header';

export default function CompetencesPage() {
  // Vos compétences organisées par catégories
  const skillsData = [
    {
      category: "Langages de Programmation",
      skills: ["Java", "C#", "C", "TypeScript", "JavaScript", "SQL", "Bash", "Luau", "HTML/CSS"]
    },
    {
      category: "Développement Web & Frameworks",
      skills: ["React", "React Router", "Vite", "Tailwind CSS", "Node.js", "Express.js"]
    },
    {
      category: "Tests & Architecture",
      skills: ["Jest", "JUnit", "Mockito", "Maven"]
    },
    {
      category: "Outils, Environnements & Jeux",
      skills: ["Unity", "Roblox Studio", "Rojo", "Multipass (Ubuntu)", "Git", "VS Code / Cursor"]
    }
  ];

  return (
    <div className="portfolio-container">
      {/* Barre de navigation */}
      <Header/>

      {/* Contenu principal */}
      <main className="main-content" style={{ alignItems: 'flex-start', paddingTop: '8rem' }}>
        <div className="skills-wrapper">
          <h1 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Mes Compétences</h1>
          <p className="description" style={{ marginBottom: '3rem' }}>
            Un aperçu des technologies et outils que j'utilise au quotidien pour concevoir des applications et des jeux.
          </p>

          <div className="skills-container">
            {skillsData.map((section, index) => (
              <div key={index} className="skill-category-card">
                <h3 className="skill-category-title">{section.category}</h3>
                <div className="skill-badges-grid">
                  {section.skills.map((skill, i) => (
                    <span key={i} className="skill-badge">{skill}</span>
                  ))}
                </div>
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