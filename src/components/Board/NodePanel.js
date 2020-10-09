import React, { useState } from 'react'
import { InterfaceContainer } from './BoardStyledComponents'
import './board.css'

export default function NodePanel({ elements, ...props }) {
  const [label, setLabel] = useState('')
  const [error, setError] = useState(false)

  const handleOnSubmit = event => {
    event.preventDefault()
    if (label !== '') {
      const id = elements.length + 1 + ''
      const node = {
        id,
        type: 'default',
        data: { label },
        position: { x: 40, y: 40 }
      }
      const ne = [...elements, node]
      props.add(ne)
      setError(false)
      return
    }
    setError(true)
  }

  return (
    <InterfaceContainer>
      <h1>Nuevo Nodo</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          className='input'
          name='label'
          value={label}
          type='text'
          placeholder='Label'
          onChange={e => setLabel(e.target.value)}
        />
        {error && <small style={{ color: 'red' }}>llenar todos los campos</small>}
        <button className='btn-form' type='submit'>
          Agregar
        </button>
      </form>
    </InterfaceContainer>
  )
}
