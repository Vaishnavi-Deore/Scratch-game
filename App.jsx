import React, { useState } from 'react';
import './App.css';

const App = () => {
  const playgroundWidth = '100vw';  
  const playgroundHeight = '100vh';  
  
  const [cat1, setCat1] = useState({ x: 50, y: 50, rotation: 0, directionX: 1, directionY: 1 });
  const [cat2, setCat2] = useState({ x: 200, y: 200, rotation: 0, directionX: -1, directionY: -1 });
  const stepSize = 10;

  const checkCollision = (cat1, cat2) => {
    const distance = Math.sqrt(
      (cat1.x - cat2.x) ** 2 + (cat1.y - cat2.y) ** 2
    );
    return distance < 60;
  };

  const keepInBounds = (cat, playgroundWidth, playgroundHeight) => {
    return {
      x: Math.max(0, Math.min(cat.x, window.innerWidth - 60)),  
      y: Math.max(0, Math.min(cat.y, window.innerHeight - 60)), 
      rotation: cat.rotation,
      directionX: cat.directionX,
      directionY: cat.directionY,
    };
  };

  const moveCat = (cat, setCat, direction) => {
    let newCat = { ...cat };

    switch (direction) {
      case 'up':
        newCat.y = cat.y - stepSize * cat.directionY;
        break;
      case 'down':
        newCat.y = cat.y + stepSize * cat.directionY;
        break;
      case 'left':
        newCat.x = cat.x - stepSize * cat.directionX;
        break;
      case 'right':
        newCat.x = cat.x + stepSize * cat.directionX;
        break;
      case 'rotate':
        newCat.rotation = (cat.rotation + 30) % 360;
        break;
      default:
        break;
    }

    newCat = keepInBounds(newCat, playgroundWidth, playgroundHeight);

    const newCat1 = cat === cat1 ? newCat : cat1;
    const newCat2 = cat === cat2 ? newCat : cat2;

    if (checkCollision(newCat1, newCat2)) {
      setCat1((prev) => ({
        ...prev,
        directionX: -prev.directionX,
        directionY: -prev.directionY,
      }));
      setCat2((prev) => ({
        ...prev,
        directionX: -prev.directionX,
        directionY: -prev.directionY,
      }));
    } else {
      setCat(newCat);
    }
  };

  return (
    <div className="app">
      <Sidebar
        onMove={(direction) => moveCat(cat1, setCat1, direction)}
        onMove2={(direction) => moveCat(cat2, setCat2, direction)}
      />
      <div className="playground" style={{ width: playgroundWidth, height: playgroundHeight }}>
        <Cat
          style={{
            top: cat1.y,
            left: cat1.x,
            transform: `rotate(${cat1.rotation}deg)`,
          }}
        />
        <Cat
          style={{
            top: cat2.y,
            left: cat2.x,
            transform: `rotate(${cat2.rotation}deg)`,
          }}
        />
      </div>
    </div>
  );
};

const Sidebar = ({ onMove, onMove2 }) => {
  return (
    <div className="sidebar">
      <h3>Controls</h3>
      <div className="controls">
        <h4>Cat 1</h4>
        <button onClick={() => onMove('up')}>Move Up</button>
        <button onClick={() => onMove('down')}>Move Down</button>
        <button onClick={() => onMove('left')}>Move Left</button>
        <button onClick={() => onMove('right')}>Move Right</button>
        <button onClick={() => onMove('rotate')}>Rotate</button>

        <h4>Cat 2</h4>
        <button onClick={() => onMove2('up')}>Move Up</button>
        <button onClick={() => onMove2('down')}>Move Down</button>
        <button onClick={() => onMove2('left')}>Move Left</button>
        <button onClick={() => onMove2('right')}>Move Right</button>
        <button onClick={() => onMove2('rotate')}>Rotate</button>
      </div>
    </div>
  );
};

const Cat = ({ style }) => (
  <div className="cat" style={style}>
    🐱
  </div>
);

export default App;
