import styled from '@emotion/styled'

export const Container = styled.div`
  width: 100%;
  height: 600px;
`

export const InterfaceContainer = styled.div`
  position: fixed;
  width: 200px;
  height: 300px;
  right: 0;
  top: 0;
  z-index: 10;
  padding: 2%;
  border: 1px solid #eee;
  background: #ffffff;
`
export const ControlPanelContainer = styled.div`
  width: 100%;
  min-height: 380px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: row;
`

export const PanelColumn = styled.div`
  border-right: 1px solid #eee;
  padding: 2%;
`
export const BoardButton = styled.button`
  background: #fefefe;
  border-bottom: 1px solid #eee;
  padding: 5px;

  position: fixed;
  left: 8;
  top: 8;
  z-index: 10;
`
