import './Form.css'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import useApi from '../../Utils/useApi'

const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0
}

const PromotionForm = ({ id }) => {

  const [values, setValues] = useState(id ? null : initialValue)
  const history = useHistory()
  const [load] = useApi({
    url: `http://localhost:8000/promotions/${id}`,
    method: 'get',
    onCompleted: (response) => {
      setValues(response.data)
    }
  })

  const [save, saveInfo] = useApi({
    url: id 
      ? `http://localhost:8000/promotions/${id}`
      : 'http://localhost:8000/promotions',
    method: id ? 'put' : 'post',
    data: values,
    onCompleted: (response) => {
      if(!response.error)
        history.push('/')
    }
  })

  useEffect(()=>{
    if(id) {
      load()
    }
  }, [id])

  function onChange(ev) {
    const { name, value } = ev.target
    setValues({ ...values, [name]: value })
  }

  function onSubmit(ev){
    ev.preventDefault()
    save()
  }

  return(
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>

      {!values
        ? (<div>Carregando...</div>)
        : (
          <form onSubmit={onSubmit}>
            {saveInfo.loading && <span>Sanvando dados...</span>}
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