import React, { useState } from 'react'
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
  ReactFlowProvider
} from 'react-flow-renderer'

import EdgePanel from './EdgePanel'
import NodePanel from './NodePanel'
import BoardControlPanel from './BoardControlPanel'
import { Container } from './BoardStyledComponents'

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          Welcome to <strong>React Flow!</strong>
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
          This is a <strong>default node</strong>
        </>
      )
    },
    position: { x: 100, y: 100 }
  },
  {
    id: '3',
    data: {
      label: (
        <>
          This one has a <strong>custom style</strong>
        </>
      )
    },
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 }
  },
  {
    id: '4',
    position: { x: 250, y: 200 },
    data: {
      label: (
        <>
          You can find the docs on{' '}
          <a
            href='https://github.com/wbkd/react-flow'
            target='_blank'
            rel='noopener noreferrer'>
            Github
          </a>
        </>
      )
    }
  },
  {
    id: '5',
    data: {
      label: (
        <>
          Or check out the other <strong>examples</strong>
        </>
      )
    },
    position: { x: 250, y: 325 }
  },
  {
    id: '6',
    type: 'output',
    data: {
      label: (
        <>
          An <strong>output node</strong>
        </>
      )
    },
    position: { x: 100, y: 480 }
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Another output node' },
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
  { id: 'e5-6', source: '5', target: '6', type: 'smoothstep', label: 'smooth step edge' },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    label: 'a step edge',
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 }
  }
]

export default () => {
  const connectionLineStyle = { stroke: '#ddd' }
  const snapGrid = [16, 16]

  const [elements, setElements] = useState(initialElements)
  const onElementsRemove = elementsToRemove =>
    setElements(els => removeElements(elementsToRemove, els))
  // connect edges
  const handleOnConnect = params => {
    console.log('handleOnConnect', params)
    // set a new elements object
    setElements(els => addEdge(params, els))
  }

  const onNodeDragStart = (event, node) => console.log('drag start', node)
  const onNodeDragStop = (event, node) => console.log('drag stop', node)

  const onPaneScroll = event => console.log('pane scroll', event)
  const onPaneContextMenu = event => console.log('pane context menu', event)
  const onSelectionDrag = (event, nodes) => console.log('selection drag', nodes)
  const onSelectionDragStart = (event, nodes) => console.log('selection drag start', nodes)
  const onSelectionDragStop = (event, nodes) => console.log('selection drag stop', nodes)

  const onSelectionContextMenu = (event, nodes) => {
    event.preventDefault()
    console.log('selection context menu', nodes)
  }

  const onPaneClick = event => {
    console.log('pane click', event)
    setNodeInterface(false)
    setEdgeInterface(false)
  }

  const [edgeInterface, setEdgeInterface] = useState(false)
  const [nodeInterface, setNodeInterface] = useState(false)
  // on click lister
  const handleOnElementClick = (event, element) => {
    console.log(`handleOnElementClick: ${isNode(element) ? 'node' : 'edge'} click:`, element)
    if (isNode(element)) {
      setNodeInterface(true)
      setEdgeInterface(false)
    }
    if (!isNode(element)) {
      setNodeInterface(false)
      setEdgeInterface(true)
    }
  }

  const onSelectionChange = elements => console.log('selection change', elements)
  const onLoad = reactFlowInstance => {
    console.log('flow loaded:', reactFlowInstance)
    reactFlowInstance.fitView()
  }

  const onMoveEnd = transform => console.log('zoom/move end', transform)

  return (
    <ReactFlowProvider>
      <Container>
        {edgeInterface && <EdgePanel />}

        {nodeInterface && <NodePanel />}

        <ReactFlow
          elements={elements}
          onElementClick={handleOnElementClick}
          onElementsRemove={onElementsRemove}
          onConnect={handleOnConnect}
          onPaneClick={onPaneClick}
          onPaneScroll={onPaneScroll}
          onPaneContextMenu={onPaneContextMenu}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onSelectionDragStart={onSelectionDragStart}
          onSelectionDrag={onSelectionDrag}
          onSelectionDragStop={onSelectionDragStop}
          onSelectionContextMenu={onSelectionContextMenu}
          onSelectionChange={onSelectionChange}
          onMoveEnd={onMoveEnd}
          onLoad={onLoad}
          connectionLineStyle={connectionLineStyle}
          snapToGrid={true}
          snapGrid={snapGrid}>
          <MiniMap
            nodeStrokeColor={n => {
              if (n.style?.background) return n.style.background
              if (n.type === 'input') return '#0041d0'
              if (n.type === 'output') return '#ff0072'
              if (n.type === 'default') return '#1a192b'

              return '#eee'
            }}
            nodeColor={n => {
              if (n.style?.background) return n.style.background

              return '#fff'
            }}
            borderRadius={2}
          />
          <Controls />
          <Background color='#aaa' gap={16} />
        </ReactFlow>
      </Container>
      <BoardControlPanel />
    </ReactFlowProvider>
  )
}
