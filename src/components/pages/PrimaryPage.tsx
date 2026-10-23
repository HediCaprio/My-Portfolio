import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from '../Header';

function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: -9999, y: -9999 };

    const PARTICLE_COUNT = 80;
    const CONNECT_DISTANCE = 120;
    const MOUSE_RADIUS = 150;

    // Resize canvas to fill the screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 2.5 + 0.5;
        this.baseAlpha = Math.random() * 0.5 + 0.1;
        this.alpha = this.baseAlpha;
      }

      update() {
        // Mouse interaction: push particles away
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * force * 0.8;
          this.vy += Math.sin(angle) * force * 0.8;
          this.alpha = Math.min(1, this.baseAlpha + force * 0.8);
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.05;
        }

        // Damping
        this.vx *= 0.98;
        this.vy *= 0.98;

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(249, 115, 22, ${this.alpha})`;
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = 'rgba(249, 115, 22, 0.3)';
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    // Create particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    // Draw connections between nearby particles
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * 0.15;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(249, 115, 22, ${opacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      // Draw lines from mouse to nearby particles
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const opacity = (1 - dist / MOUSE_RADIUS) * 0.3;
          ctx!.beginPath();
          ctx!.moveTo(mouse.x, mouse.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.strokeStyle = `rgba(251, 146, 60, ${opacity})`;
          ctx!.lineWidth = 0.8;
          ctx!.stroke();
        }
      }
    }

    // Animation loop
    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

export default function PrimaryPage() {
  const navigate = useNavigate();

  return (
    <div className="portfolio-container">
      
      {/* Interactive particle background */}
      <InteractiveParticles />

      {/* Barre de navigation */}
      <Header/>

      {/* Centre de la page */}
      <main className="main-content">
        <div className="hero-content" style={{ marginTop: '0' }}>
          
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
