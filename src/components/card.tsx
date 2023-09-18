import React from 'react';
import type { Card } from '../types';
import './card.css';

const Card: React.FC<Card> = (card: Card) => {
  return (
    <div className="card">
      <p className="card__icon">{card.emoji || "?"}</p>
      <p className="card__label">{card?.no || "-"} / {card.en || "-"} / {card.uk || "-"}</p>
    </div>  
  );
};

export default Card;
