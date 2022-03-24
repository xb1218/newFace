import React from 'react'
import styled from '@emotion/styled'
import { Row } from 'antd'

const BaseRow = styled(Row)`
  margin-bottom: 10px;
`

export const BetweenRow = ({ children }) => {
  return (
    <BaseRow type="flex" justify="space-between" align="middle">
      {children}
    </BaseRow>
  )
}

export const CenterRow = ({ children }) => {
  return (
    <Row type="flex" justify="center" align="middle">
      {children}
    </Row>
  )
}
