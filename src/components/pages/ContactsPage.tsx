import Header from '../Header';

export default function ContactPage() {
  return (
    <div className="portfolio-container">
      {/* Barre de navigation */}
      <Header/>

      {/* Contenu principal */}
      <main className="main-content" style={{ alignItems: 'flex-start' }}>
        <div className="contact-wrapper">
          <h1 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Me Contacter</h1>
          <p className="description" style={{ marginBottom: '3rem' }}>
            Vous avez une question, une proposition de projet ou une opportunité ? N'hésitez pas à m'envoyer un message !
          </p>

          <div className="contact-grid">
            {/* Carte Email (Ouvre le logiciel mail par défaut) */}
            <a href="mailto:Hedibenkhalifa150@gmail.com" className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>Email</h3>
              <p>Envoyez-moi un message direct</p>
            </a>

            {/* Carte LinkedIn */}
            <a href="https://www.linkedin.com/in/hedi-ben-khalifa-a804a5442/?isSelfProfile=true" target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-icon">💼</div>
              <h3>LinkedIn</h3>
              <p>Mon profil professionnel</p>
            </a>

            {/* Carte GitHub */}
            <a href="https://github.com/votre-pseudo" target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-icon">💻</div>
              <h3>GitHub</h3>
              <p>Découvrez mon code source</p>
            </a>

            {/* Carte Localisation (Non cliquable) */}
            <div className="contact-card location-card">
              <div className="contact-icon">📍</div>
              <h3>Localisation</h3>
              <p>Bruxelles, Belgique</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 Hedi Ben Khalifa. Tous droits réservés.</p>
      </footer>
    </div>
  );
}