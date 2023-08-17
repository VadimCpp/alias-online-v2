import React from 'react';
import './card.css';

interface CardProps {
  icon: string;
  label: string;
}

const Card: React.FC<CardProps> = ({ icon, label }) => {
  return (
    <div className="card">
      <p className="card__icon">{icon}</p>
      <p className="card__label">{label}</p>
    </div>  
  );
};

export default Card;
