import React, { useState, useEffect } from 'react';
import './App.css';

// Importación dinámica de todas las imágenes de la carpeta couples
const imagesDict = import.meta.glob('./assets/img/couples/*.png', { eager: true });
const imagePaths = Object.values(imagesDict).map(mod => mod.default);

const Couples = ({ onBack }) => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Inicializar juego
  const shuffleCards = () => {
    // Tomamos las 20 imágenes y las duplicamos
    const shuffledCards = [...imagePaths, ...imagePaths]
      .sort(() => Math.random() - 0.5)
      .map((path) => ({ path, id: Math.random(), matched: false, flipped: false }));
    
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  // Manejar elección
  const handleChoice = (card) => {
    if (!disabled && !card.flipped && !card.matched) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
      
      // Voltear la carta visualmente de inmediato
      setCards(prevCards => {
        return prevCards.map(c => {
          if (c.id === card.id) {
            return { ...c, flipped: true };
          }
          return c;
        });
      });
    }
  };

  // Comparar dos cartas elegidas
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.path === choiceTwo.path) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.path === choiceOne.path) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.id === choiceOne.id || card.id === choiceTwo.id) {
                return { ...card, flipped: false };
              }
              return card;
            });
          });
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Iniciar juego al montar
  useEffect(() => {
    shuffleCards();
  }, []);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  return (
    <div className="game-view">
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>⬅ Volver</button>
        <button className="reset-btn" onClick={shuffleCards}>Reiniciar</button>
      </div>
      
      <div className="memory-grid">
        {cards.map(card => (
          <div 
            key={card.id} 
            className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`}
            onClick={() => handleChoice(card)}
          >
            <div className="card-inner">
              <div className="card-front">
                {/* Parte trasera de la carta (lo que se ve al inicio) */}
                <div className="card-logo">?</div>
              </div>
              <div className="card-back">
                <img src={card.path} alt="card" className="card-img" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Couples;
