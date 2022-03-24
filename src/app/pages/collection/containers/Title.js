import React from 'react'
import styled from '@emotion/styled'

const Title = (props) => {
  return (
    <TitleCount color={props.color}>
      <span color={props.color}>{props.name}</span>
    </TitleCount>
  )
}
export default Title

const TitleCount = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 500;
  span {
    border-bottom: 3px solid;
    border-bottom-color: ${(props) => props.color || '#5f89ff'};
  }
`
