import React from 'react'
import styled from '@emotion/styled'
import { useStoreState, useStoreActions } from 'react-flow-renderer'

export const ControlPanelContainer = styled.div`
  width: 100%;
  height: 400px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: row;
`

export const PanelColumn = styled.div`
  border-right: 1px solid #eee;
  padding: 2%;
`

const ControlPanel = props => {
  const edges = useStoreState(store => store.edges)
  // const elements = useStoreState(store => store.elements)
  const nodes = useStoreState(store => store.nodes)
  const transform = useStoreState(store => store.transform)

  return (
    <ControlPanelContainer>
      <PanelColumn>
        <h2 className='title'>Nodes</h2>
        {nodes.map(node => {
          return (
            <div key={node.id}>
              Node {node.id} - x: {node.__rf.position.x.toFixed(2)}, y:{' '}
              {node.__rf.position.y.toFixed(2)}
            </div>
          )
        })}
      </PanelColumn>
      <PanelColumn>
        <h2 className='title'>Edges</h2>
        {edges.map(edge => (
          <p key={edge.id}>
            Edge id: {edge.id},source: {edge.source},target: {edge.target},type: {edge.type}
          </p>
        ))}
      </PanelColumn>
      <PanelColumn>
        <h2 className='title'>Zoom & pan transform</h2>
        <p>
          [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
        </p>
      </PanelColumn>
    </ControlPanelContainer>
  )
}

export default ControlPanel
