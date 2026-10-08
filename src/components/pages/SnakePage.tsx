import { useState, useEffect, useRef } from 'react';
import Header from '../Header';

export default function SnakePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Constants
  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400; // 20x20 grid

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 1;
    let dy = 0;
    let currentScore = 0;
    let gameLoop: number;
    let isGameOver = false;

    // Reset game
    setGameOver(false);
    setScore(0);

    const placeFood = () => {
      food = {
        x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
      };
      // Check if food is on snake
      for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) placeFood();
      }
    };

    const draw = () => {
      // Clear canvas (Dark Orange theme)
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Draw Grid lines
      ctx.strokeStyle = '#333';
      for(let i = 0; i < CANVAS_SIZE; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(CANVAS_SIZE, i);
        ctx.stroke();
      }

      // Draw Food
      ctx.fillStyle = '#ef4444'; // Red
      ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);

      // Draw Snake
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#f97316' : '#ea580c'; // Orange
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
      });
    };

    const update = () => {
      if (isGameOver) return;

      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Wall collision
      if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
        isGameOver = true;
        setGameOver(true);
        return;
      }

      // Self collision
      for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          isGameOver = true;
          setGameOver(true);
          return;
        }
      }

      snake.unshift(head);

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        currentScore += 10;
        setScore(currentScore);
        placeFood();
      } else {
        snake.pop();
      }

      draw();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (dy !== 1) { dx = 0; dy = -1; } break;
        case 'ArrowDown': if (dy !== -1) { dx = 0; dy = 1; } break;
        case 'ArrowLeft': if (dx !== 1) { dx = -1; dy = 0; } break;
        case 'ArrowRight': if (dx !== -1) { dx = 1; dy = 0; } break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Start game
    placeFood();
    gameLoop = window.setInterval(update, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearInterval(gameLoop);
    };
  }, [gameOver]); // Restart effect if gameOver changes and we want to restart

  return (
    <div className="portfolio-container">
      <Header />

      <main className="main-content" style={{ alignItems: 'center', paddingTop: '2rem', flexDirection: 'column' }}>
        <h1 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Jeu du Snake</h1>
        <p className="description" style={{ marginBottom: '2rem' }}>
          Score : <strong style={{ color: '#f97316' }}>{score}</strong>
        </p>

        <div style={{ position: 'relative' }}>
          <canvas 
            ref={canvasRef} 
            width={400} 
            height={400} 
            style={{ 
              border: '2px solid #333', 
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(249, 115, 22, 0.1)'
            }}
          />
          
          {gameOver && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(5, 5, 5, 0.8)', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', borderRadius: '8px'
            }}>
              <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Game Over</h2>
              <button 
                className="btn-primary" 
                onClick={() => setGameOver(false)}
              >
                Rejouer
              </button>
            </div>
          )}
        </div>
        
        <p style={{ color: '#94a3b8', marginTop: '2rem', fontSize: '0.9rem' }}>
          Utilisez les flèches directionnelles de votre clavier pour jouer.
        </p>
      </main>

      <footer className="footer">
        <p>© 2026 Hedi Ben Khalifa. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
