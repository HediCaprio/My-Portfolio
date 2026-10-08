import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../Header';
import type { Context } from '../../../types';

interface Skill {
  id: number;
  category: string;
  name: string;
}

interface GroupedSkills {
  [category: string]: Skill[];
}

export default function CompetencesPage() {
  const { authenticatedUser }: Context = useOutletContext();
  const isAdmin = authenticatedUser?.username === 'Admin@2004';
  
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newName, setNewName] = useState('');

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des compétences", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: newCategory, name: newName })
      });
      if (res.ok) {
        setNewName('');
        // On ne vide pas la catégorie pour permettre l'ajout rapide de plusieurs skills
        fetchSkills();
      }
    } catch (err) {
      console.error("Erreur d'ajout", err);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!isAdmin) return;
    if (!confirm("Supprimer cette compétence ?")) return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      if (res.ok) fetchSkills();
    } catch (err) {
      console.error("Erreur de suppression", err);
    }
  };

  // Grouper les compétences par catégorie
  const groupedSkills: GroupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as GroupedSkills);

  return (
    <div className="portfolio-container">
      <Header/>

      <main className="main-content" style={{ alignItems: 'flex-start', paddingTop: '2rem' }}>
        <div className="skills-wrapper">
          <h1 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Mes Compétences</h1>
          <p className="description" style={{ marginBottom: '3rem' }}>
            Un aperçu des technologies et outils que j'utilise au quotidien pour concevoir des applications et des jeux.
          </p>

          {/* MODE ADMIN : AJOUT */}
          {isAdmin && (
            <div className="admin-panel animate-fade-in-up" style={{
              background: 'rgba(234, 88, 12, 0.1)',
              border: '1px solid #ea580c',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '3rem',
              textAlign: 'left'
            }}>
              <h3 style={{ color: '#ea580c', marginTop: 0 }}>🛠️ Mode Administrateur : Ajouter une compétence</h3>
              <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input 
                  type="text" placeholder="Catégorie (ex: Langages)" required className="auth-input"
                  value={newCategory} onChange={e => setNewCategory(e.target.value)}
                  style={{ flex: 1, minWidth: '200px' }}
                />
                <input 
                  type="text" placeholder="Nom (ex: Python)" required className="auth-input"
                  value={newName} onChange={e => setNewName(e.target.value)}
                  style={{ flex: 1, minWidth: '200px' }}
                />
                <button type="submit" className="auth-submit" style={{ marginTop: 0, width: 'fit-content', padding: '0.75rem 1.5rem' }}>
                  + Ajouter
                </button>
              </form>
            </div>
          )}

          <div className="skills-container">
            {Object.entries(groupedSkills).map(([category, catSkills], index) => (
              <div key={index} className="skill-category-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="skill-category-title">{category}</h3>
                <div className="skill-badges-grid">
                  {catSkills.map((skill) => (
                    <span key={skill.id} className="skill-badge" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {skill.name}
                      {isAdmin && (
                        <button 
                          onClick={() => handleDeleteSkill(skill.id)}
                          title="Supprimer"
                          style={{
                            background: 'none', border: 'none', color: '#ef4444', 
                            cursor: 'pointer', padding: '0', fontSize: '1rem', 
                            lineHeight: '1', marginLeft: '0.25rem'
                          }}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            {skills.length === 0 && <p style={{ color: '#94a3b8' }}>Aucune compétence pour le moment...</p>}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 Hedi Ben Khalifa. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
