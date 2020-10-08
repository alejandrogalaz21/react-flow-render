import React, { useState } from 'react'
import ReactFlow, {
  removeElements,
  //addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
  ReactFlowProvider
} from 'react-flow-renderer'

import NodePanel from './NodePanel'
import BoardControlPanel from './BoardControlPanel'
import { Container, BoardButton } from './BoardStyledComponents'

import { initialElements } from './elements'

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
    // setElements(els => addEdge(params, els))
    const { source, target } = params
    const edge = { id: `e${source}-${target}`, source, target, animated: true, type: 'step' }
    setElements([...elements, edge])
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
  }

  const [nodeInterface, setNodeInterface] = useState(false)
  // on click lister
  const handleOnElementClick = (event, element) => {
    console.log(`handleOnElementClick: ${isNode(element) ? 'node' : 'edge'} click:`, element)
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
        <BoardButton onClick={() => setNodeInterface(true)}>Agregar</BoardButton>
        {nodeInterface && <NodePanel elements={elements} add={ne => setElements(ne)} />}

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
