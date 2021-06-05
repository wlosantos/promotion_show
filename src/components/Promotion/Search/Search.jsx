import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PromotionCard from '../Card/Card'

const PromotionSearch = () => {

  const [promotions, setPromotions] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/promotions?_embed=comments')
      .then((response) => setPromotions(response.data))
  }, [])

  return(
    <div>
      { promotions.map((promotion) => <PromotionCard promotion={promotion} /> )}
    </div>
  )
}

export default PromotionSearch