import './Form.css'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0
}

const PromotionForm = ({ id }) => {

  const [values, setValues] = useState(id ? null : initialValue)
  const history = useHistory()

  useEffect(()=>{
    if(id) {
      axios.get(`http://localhost:8000/promotions/${id}`)
        .then( response => {
          setValues(response.data)
        })
    }
  }, [])

  function onChange(ev) {
    const { name, value } = ev.target
    setValues({ ...values, [name]: value })
  }

  function onSubmit(ev){
    ev.preventDefault()
    const method = id ? 'put' : 'post'
    const url = id 
      ? `http://localhost:8000/promotions/${id}`
      : 'http://localhost:8000/promotions'

    axios[method](url, values)
      .then( response => {
        history.push('/')
      })
  }

  return(
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>

      {!values
        ? (<div>Carregando...</div>)
        : (
          <form onSubmit={onSubmit}>
            <div className="promotion-form__group">
              <label htmlFor="title">Título</label>
              <input id='title' type="text" name='title' value={values.title} onChange={onChange} />
            </div>
            <div className="promotion-form__group">
              <label htmlFor="url">Link</label>
              <input id='url' type="text" name='url' value={values.url} onChange={onChange} />
            </div>
            <div className="promotion-form__group">
              <label htmlFor="imageUrl">Image (Url)</label>
              <input id='imageUrl' type="text" name='imageUrl' value={values.imageUrl} onChange={onChange} />
            </div>
            <div className="promotion-form__group">
              <label htmlFor="price">Preço</label>
              <input id='price' type="number" name='price' value={values.price} onChange={onChange} />
            </div>
            <div>
              <button type='submit'>Salvar</button>
            </div>
          </form>
        )
      }

    </div>
  )
}

export default PromotionForm