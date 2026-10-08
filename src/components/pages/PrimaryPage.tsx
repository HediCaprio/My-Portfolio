import { useNavigate } from 'react-router-dom';
import Header from '../Header';

export default function PrimaryPage() {
  const navigate = useNavigate();

  return (
    <div className="portfolio-container">
      
      {/* Barre de navigation */}
      <Header/>

      {/* Centre de la page */}
      <main className="main-content">
        <div className="hero-content" style={{ marginTop: '4rem' }}>
          
          <span className="hero-greeting animate-fade-in-up">Bonjour, je suis</span>
          
          <h1 className="title title-animate">
            <span className="name-gradient">Hedi Ben Khalifa</span>
          </h1>
          
          {/* Description un peu plus étoffée */}
          <p className="description animate-fade-in-up delay-1">
            Étudiant en développement d'applications à la HE Vinci. <br/>
            Je transforme des idées complexes en expériences numériques intuitives,
            alliant <strong>développement web</strong>, <strong>ingénierie logicielle</strong> et <strong>création de jeux vidéo</strong>.
          </p>

          {/* Les boutons d'action */}
          <div className="cta-container animate-fade-in-up delay-2">
            <button onClick={()=> navigate("/projects")} className="btn-primary">Découvrir mes projets</button>
            <button onClick={()=> navigate("/contacts")} className="btn-secondary">Me contacter</button>
          </div>

          {/* Les badges de compétences */}
          <div className="skills-badges animate-fade-in-up delay-3">
            <span className="badge">React & Node.js</span>
            <span className="badge">C# & Unity</span>
            <span className="badge">Java</span>
            <span className="badge">TypeScript</span>
            <span className="badge">SQL & NoSQL</span>
            <span className="badge">Git & Docker</span>
          </div>

          {/* Nouvelles stats pour remplir la page */}
          <div className="quick-stats animate-fade-in-up delay-4">
            <div className="stat-item">
              <span className="stat-number">+10</span>
              <span className="stat-label">Projets réalisés</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Années d'études</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Langages maîtrisés</span>
            </div>
          </div>

        </div>
      </main>

      {/* Le Footer */}
      <footer className="footer animate-fade-in-up delay-5">
        <p>© 2026 Hedi Ben Khalifa. Tous droits réservés.</p>
      </footer>

    </div>
  );
}
