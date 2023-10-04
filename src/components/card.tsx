import React from 'react';
import type { Card } from '../types';
import './card.css';

const Card: React.FC<Card> = (card: Card) => {
  return (
    <div className="card">
      <p className="card__icon">{card.emoji || "?"}</p>
      <div className="card__label-wrap">
        <p className="card__label">{card.no || "-"}</p>
        <p className="card__label">{card.en || "-"}</p>
        <p className="card__label">{card.uk || "-"}</p>
      </div>
    </div>  
  );
};

export default Card;
