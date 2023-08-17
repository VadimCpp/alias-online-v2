import React from 'react';
import './card.css';

interface CardProps {
  id: number;
  no?: string | null;
  en?: string | null;
  emoji?: string | null;
  ordbokene?: string | null;
  naob?: string | null;
  snl?: string | null;
}

const Card: React.FC<CardProps> = (card) => {
  return (
    <div className="card">
      <p className="card__icon">{card.emoji || "?"}</p>
      <p className="card__label">{card.no || "unknown"}</p>
    </div>  
  );
};

export default Card;
