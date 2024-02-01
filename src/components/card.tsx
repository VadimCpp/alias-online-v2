import React from 'react';
import type { Card } from '../types';
import './card.css';

const Card: React.FC<Card> = (card: Card) => {
  const BASE_URL = (import.meta.env.MODE === 'development') ?
    "./test_images" :
    "https://imagesstorageacc.blob.core.windows.net/smallimages"

  const source = `${BASE_URL}/${card.id}_small.png`
  return (
    <div className="card">
      <img className="card__icon" src={source} />
      <div className="card__label-wrap">
        <p className="card__label">{card.no || "-"}</p>
        <p className="card__label">{card.en || "-"}</p>
        <p className="card__label">{card.uk || "-"}</p>
      </div>
      <p className='card__id'>{card.id}</p>
    </div>  
  );
};

export default Card;
