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

const ControlPanel = () => {
  const edges = useStoreState(store => store.edges)
  // const elements = useStoreState(store => store.elements)
  const nodes = useStoreState(store => store.nodes)
  const transform = useStoreState(store => store.transform)
  console.log({ edges })

  return (
    <ControlPanelContainer>
      <div>
        <h2 className='title'>
          Zoom & pan transform
          <small>
            {' '}
            [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
          </small>
        </h2>
        <div className='transform'></div>
        <h2 className='title'>Nodes</h2>
        {nodes.map(node => {
          return (
            <div key={node.id}>
              Node {node.id} - x: {node.__rf.position.x.toFixed(2)}, y:{' '}
              {node.__rf.position.y.toFixed(2)}
            </div>
          )
        })}
      </div>

      <div>{/* <pre>{JSON.stringify(state, ' ', 2)}</pre> */}</div>
    </ControlPanelContainer>
  )
}

export default ControlPanel
