import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../Header';
import type { Context } from '../../../types';

export default function CvPage() {
  const { authenticatedUser }: Context = useOutletContext();
  const isAdmin = authenticatedUser?.username === 'Admin@2004';
  
  const [cvData, setCvData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCv = async () => {
    try {
      const res = await fetch('/api/cv');
      if (res.ok) {
        const data = await res.json();
        setCvData(data.cv);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération du CV", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCv();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert("Veuillez sélectionner un fichier PDF.");
      return;
    }

    // Convertir en base64
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      try {
        const res = await fetch('/api/cv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cvData: base64 })
        });
        if (res.ok) {
          alert("CV mis à jour avec succès !");
          fetchCv();
        } else {
          alert("Erreur lors de la mise à jour du CV.");
        }
      } catch (error) {
        console.error(error);
        alert("Erreur réseau lors de l'upload.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="portfolio-container">
      <Header />

      <main className="main-content" style={{ alignItems: 'flex-start' }}>
        <div className="projects-wrapper" style={{ width: '100%', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Mon CV</h1>
          
          {/* MODE ADMIN : UPLOAD */}
          {isAdmin && (
            <div className="admin-panel animate-fade-in-up" style={{
              background: 'rgba(234, 88, 12, 0.1)',
              border: '1px solid #ea580c',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <h3 style={{ color: '#ea580c', marginTop: 0 }}>🛠️ Mode Administrateur : Modifier le CV (PDF)</h3>
              <input 
                type="file" 
                accept="application/pdf"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <button 
                className="btn-primary" 
                onClick={() => fileInputRef.current?.click()}
                style={{ padding: '0.75rem 2rem' }}
              >
                Uploader un nouveau PDF
              </button>
            </div>
          )}

          {loading ? (
            <p style={{ color: '#94a3b8' }}>Chargement du CV...</p>
          ) : cvData ? (
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <a 
                href={cvData} 
                download="CV_Hedi_Ben_Khalifa.pdf" 
                className="btn-secondary"
                style={{ marginBottom: '2rem', display: 'inline-block' }}
              >
                📥 Télécharger le CV (PDF)
              </a>
              
              <div style={{
                width: '100%', 
                height: '80vh', 
                border: '1px solid #333', 
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                <iframe 
                  src={`${cvData}#toolbar=0`} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none' }}
                  title="CV PDF"
                />
              </div>
            </div>
          ) : (
            <p style={{ color: '#94a3b8', padding: '3rem' }}>Aucun CV n'est disponible pour le moment.</p>
          )}

        </div>
      </main>

      <footer className="footer">
        <p>© 2026 Hedi Ben Khalifa. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
