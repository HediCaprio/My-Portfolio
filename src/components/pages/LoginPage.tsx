import { useNavigate, useOutletContext } from "react-router-dom";
import type { Context } from "../../../types";
import { useState } from "react";
import type { SyntheticEvent } from "react";
import Header from "../Header";

const LoginPage = () => {
  const { loginUser, registerUser }: Context = useOutletContext();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      if (isLogin) {
        await loginUser({ username, password });
      } else {
        if (registerUser) {
          await registerUser({ username, password });
        } else {
          // Fallback if registerUser is not implemented yet
          alert("Fonction d'inscription non implémentée !");
          return;
        }
      }
      navigate("/");
    } catch (err) {
      console.error("LoginPage::error: ", err);
      setErrorMsg("Une erreur est survenue. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="portfolio-container">
      <Header />
      
      <main className="main-content" style={{ marginTop: '5rem' }}>
        <div className="auth-card animate-fade-in-up">
          <h1 className="auth-title">
            {isLogin ? "Connexion" : "Inscription"}
          </h1>
          
          {errorMsg && <p className="auth-error">{errorMsg}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="auth-input"
                placeholder="Votre pseudo"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="auth-submit">
              {isLogin ? "S'authentifier" : "Créer un compte"}
            </button>
          </form>

          <p className="auth-switch">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button 
              type="button" 
              className="btn-switch" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
