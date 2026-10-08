import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../Header';
import type { Context } from '../../../types';

interface Project {
  id?: number;
  title: string;
  description: string;
  tags: string;
  link: string;
}

export default function ProjectPage() {
  const { authenticatedUser }: Context = useOutletContext();
  const isAdmin = authenticatedUser?.username === 'Admin@2004';
  
  const [projects, setProjects] = useState<Project[]>([]);
  
  // États pour le formulaire d'ajout
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newLink, setNewLink] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des projets", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const res = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          tags: newTags,
          link: newLink || '#'
        })
      });

      if (res.ok) {
        setNewTitle('');
        setNewDesc('');
        setNewTags('');
        setNewLink('');
        fetchProjects(); // Recharger la liste
      }
    } catch (err) {
      console.error("Erreur d'ajout", err);
    }
  };

  const handleDeleteProject = async (id?: number) => {
    if (!isAdmin || !id) return;
    if (!confirm("Voulez-vous vraiment supprimer ce projet ?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.error("Erreur de suppression", err);
    }
  };

  return (
    <div className="portfolio-container">
      <Header />

      <main className="main-content" style={{ alignItems: 'flex-start', paddingTop: '8rem' }}>
        <div className="projects-wrapper">
          <h1 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Mes Projets</h1>
          <p className="description" style={{ marginBottom: '3rem' }}>
            Voici une sélection de mes travaux en développement logiciel et jeux vidéo.
          </p>

          {/* MODE ADMINISTRATEUR : FORMULAIRE D'AJOUT */}
          {isAdmin && (
            <div className="admin-panel animate-fade-in-up" style={{
              background: 'rgba(234, 88, 12, 0.1)',
              border: '1px solid #ea580c',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '3rem',
              textAlign: 'left'
            }}>
              <h3 style={{ color: '#ea580c', marginTop: 0 }}>🛠️ Mode Administrateur : Ajouter un projet</h3>
              <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                  type="text" placeholder="Titre du projet" required className="auth-input"
                  value={newTitle} onChange={e => setNewTitle(e.target.value)}
                />
                <textarea 
                  placeholder="Description" required className="auth-input" style={{ minHeight: '80px', fontFamily: 'inherit' }}
                  value={newDesc} onChange={e => setNewDesc(e.target.value)}
                />
                <input 
                  type="text" placeholder="Tags (séparés par des virgules)" required className="auth-input"
                  value={newTags} onChange={e => setNewTags(e.target.value)}
                />
                <input 
                  type="text" placeholder="Lien (ex: https://github.com/...)" className="auth-input"
                  value={newLink} onChange={e => setNewLink(e.target.value)}
                />
                <button type="submit" className="auth-submit" style={{ marginTop: '0.5rem', width: 'fit-content', padding: '0.5rem 1.5rem' }}>
                  + Ajouter le projet
                </button>
              </form>
            </div>
          )}

          {/* LISTE DES PROJETS */}
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s`, position: 'relative' }}>
                
                {/* BOUTON SUPPRIMER (Admin seulement) */}
                {isAdmin && (
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    style={{
                      position: 'absolute', top: '10px', right: '10px',
                      background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444',
                      border: '1px solid #ef4444', borderRadius: '4px', cursor: 'pointer',
                      padding: '4px 8px', fontSize: '0.8rem'
                    }}
                  >
                    Supprimer
                  </button>
                )}

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.split(',').map((tag, i) => (
                    <span key={i} className="tag">{tag.trim()}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link" target="_blank" rel="noreferrer">Voir le code →</a>
              </div>
            ))}
            
            {projects.length === 0 && <p style={{ color: '#94a3b8' }}>Aucun projet pour le moment...</p>}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 Hedi Ben Khalifa. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
