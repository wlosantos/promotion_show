import React from 'react'
import './Card.css'

const PromotionCard = ({promotion}) => (
  <div className='promotion-card'>
    <figure>
      <img src={promotion.imageUrl} alt='mochila' className='promotion-card__image' />
    </figure>
    <div className='promotion-card__info'>
      <h1>{promotion.title}</h1>
      <span>R$ {promotion.price}</span>
      <footer className='promotion-card__footer'>
        {promotion.comments.length > 0 && (
          <div className='promotion-card__comment'>"{promotion.comments[0].comment}"</div>
        )}
        <div className='promotion-card__comments-count'>{promotion.comments.length} Comentário(s)</div>
        <a href={promotion.url} target="_blank" className='promotion-card__link'>IR PARA O SITE</a>
      </footer>
    </div>
  </div>
)

export default PromotionCard