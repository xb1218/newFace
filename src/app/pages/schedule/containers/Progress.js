import React from 'react'
import styled from '@emotion/styled'
import { Progress } from 'antd'

const ProgressShow = (props) => {
  return (
    <div>
      <ProgressTitle>
        <div>{props.title}</div>
        <div>
          <span style={{ color: `${props.color}` }}>{props.transmitted}</span>
          {'transmitted' in props && <span>/</span>}
          <span>{props.total ?? 0}</span>
        </div>
      </ProgressTitle>
      <Progress
        size="small"
        type="line"
        status={props?.status}
        showInfo={false}
        strokeColor={props.color}
        strokeLinecap="square"
        percent={props.percent}
      />
    </div>
  )
}
export default ProgressShow

const ProgressTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0px 0;
`
