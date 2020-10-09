// change elements
import React from 'react'
export const initialElements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          <strong>Inicio</strong>
        </>
      )
    },
    position: { x: 250, y: 0 }
  },
  {
    id: '2',
    data: {
      label: (
        <>
          <strong>Entrevista</strong>
        </>
      )
    },
    position: { x: 100, y: 100 }
  },
  {
    id: '3',
    data: {
      label: <>Confirmacion</>
    },
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 }
  },
  {
    id: '4',
    position: { x: 250, y: 200 },
    data: {
      label: <>Seguimiento</>
    }
  },
  {
    id: '5',
    data: {
      label: <>Api 1</>
    },
    position: { x: 250, y: 325 }
  },
  {
    id: '7',
    type: 'output',
    data: { label: <>Fin del Segumiento</> },
    position: { x: 400, y: 450 }
  },
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'animated edge' },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    arrowHeadType: 'arrowclosed',
    label: 'edge with arrow head'
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    label: 'Fin',
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 }
  }
]
