import React, { Component } from 'react'
import { Button, Modal, Row } from 'antd'
import styled from '@emotion/styled'
import './basicModal.scss'

function BasicModal(props) {
  const { title, visible, footer, ...rest } = props
  return (
    <Modal {...rest} visible={visible} title={title} footer={footer}>
      {props.children}
    </Modal>
  )
}

export default BasicModal
