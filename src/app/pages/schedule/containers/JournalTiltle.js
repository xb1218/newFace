import React from 'react'
import styled from '@emotion/styled'

const JournalTitle = (props) => {
  return (
    <CircleTitle>
      <Circle />
      <span>{props.name}</span>
    </CircleTitle>
  )
}
export default JournalTitle

const Circle = styled.div`
  width: 10px;
  height: 10px;
  background: rgba(95, 137, 255, 0.2);
  border: 1px solid #5f89ff;
  margin-right: 4px;
  border-radius: 50%;
`
const CircleTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`
