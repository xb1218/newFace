import React from 'react'
import { Select } from 'antd'
import nations from './nations'
import styled from '@emotion/styled'

const Option = Select.Option

export default (props) => (
  <BaseSelect {...props}>
    {nations.map((nation) => (
      <Option key={nation}>{nation}</Option>
    ))}
  </BaseSelect>
)

const BaseSelect = styled(Select)`
  &.ant-select {
    height: 26px;
    .ant-select-selector {
      height: 26px !important;
      .ant-select-selection-search-input {
        height: 26px !important;
      }
      .ant-select-selection-item {
        line-height: 26px;
      }
    }
  }
`
