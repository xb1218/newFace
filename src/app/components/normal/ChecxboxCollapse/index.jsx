import React, { useState } from 'react'
import { Checkbox } from 'antd'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'

const CheckboxCollapse = ({ children, label, expandDefault, onChange }) => {
  const [expand, setExpand] = useState(expandDefault || false)

  return (
    <>
      {expand ? (
        <CaretDownOutlinedWrapper onClick={() => setExpand(false)} />
      ) : (
        <CaretRightOutlinedWrapper onClick={() => setExpand(true)} />
      )}
      <Checkbox.Group onChange={onChange}>
        <Checkbox value={label}>{label}</Checkbox>
      </Checkbox.Group>
      {expand ? children : null}
    </>
  )
}

export default CheckboxCollapse

CheckboxCollapse.propTypes = {
  children: PropTypes.object,
  label: PropTypes.string.isRequired,
}

const CaretDownOutlinedWrapper = styled(CaretDownOutlined)`
  margin-right: 5px;
  cursor: pointer;
`

const CaretRightOutlinedWrapper = styled(CaretRightOutlined)`
  margin-right: 5px;
  cursor: pointer;
`
