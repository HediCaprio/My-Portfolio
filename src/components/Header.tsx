import { Link, useNavigate, useOutletContext } from "react-router-dom"
import type{ Context } from "../../types";

const Header = () => {

    const navigate = useNavigate();
    const {authenticatedUser, clearUser} : Context = useOutletContext();
    
  return (
    <>
        <h1 className="aGauche" style={{ color: 'white', position: 'absolute', top: '1.5rem', left: '2rem', margin: 0, fontSize: '1.75rem', fontWeight: 'bold' }}>My Portfolio</h1>
        <header className="navbar" style={{ alignItems: 'center' }}>
            
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/projects" className="nav-link">Projets</Link>
            <Link to="/competences" className="nav-link">Compétences</Link>
            <Link to="/cv" className="nav-link">CV</Link>
            <Link to="/contacts" className="nav-link">Contact</Link>
            <Link to="/jeux/snake" className="nav-link" style={{ color: "#f97316" }}>Jeux</Link>

            {!authenticatedUser && (
              <button 
                className="btn-secondary nav-btn"
                onClick={(e)=>{
                  e.preventDefault();
                  navigate("/login");
              }}>
                Se connecter
              </button>
            )}
            
            {authenticatedUser && (
              <button 
                className="btn-secondary nav-btn"
                onClick={(e)=>{
                  e.preventDefault();
                  clearUser();
                  navigate("/");
              }}>
                Se déconnecter
              </button>
            )}

        </header>
    </>

  );
};

export default Header;
