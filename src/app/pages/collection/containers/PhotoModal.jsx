import React, { useState, useEffect } from 'react'
import { Row, Select } from 'antd'
import styled from '@emotion/styled'
import BasicModal from '@/app/components/normal/BasicModal'

// let socket
// const serverIP = '192.168.1.64'
// const serverPort = '4639'
// const host = `ws://${serverIP}:${serverPort}?id=1&pwd=17052f71cfb14ac4e3de5e9f04b5eaf0`

const { Option } = Select

function PhotoModal({ isVisible, title, closeModal }) {
  // useEffect(() => {
  //   connectSocket()
  //   return () => {
  //     disconnectSocket()
  //   }
  // }, [])

  // const disconnectSocket = () => {
  //   console.log('disconnect')
  //   socket.close()
  //   socket = null
  // }

  // const connectSocket = () => {
  //   socket = new WebSocket(host)
  //   try {
  //     socket.onopen = function (msg) {
  //       console.log('onopen')
  //     }
  //     socket.onmessage = function (msg) {
  //       console.log('onmessage')
  //     }
  //     socket.onclose = function (msg) {
  //       console.log('onclose')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleChange = (value) => {}
  return (
    <BasicModal
      title={title}
      visible={isVisible}
      onCancel={closeModal}
      footer={null}
    >
      <Top>
        <RowItem>
          <Select
            style={{ width: 120, marginRight: 16 }}
            onChange={handleChange}
            defaultValue="pz12434"
          >
            <Option value="pz12434">pz12434</Option>
            <Option value="pz12345">pz12345</Option>
          </Select>
          <div>
            <Label>拍照设备：</Label>
            <Value>连接成功</Value>
          </div>
        </RowItem>
        <CloseBtn>关闭摄像头</CloseBtn>
      </Top>
      <Content>
        <ImgBox>暂无影像</ImgBox>
        <IconWrap>
          <svg className="narrow-icon" aria-hidden="true">
            <use xlinkHref="#icon-enlarge" />
          </svg>
          <svg
            className="narrow-icon"
            aria-hidden="true"
            style={{ marginTop: 12 }}
          >
            <use xlinkHref="#icon-narrow" />
          </svg>
        </IconWrap>
      </Content>
      <Footer>
        <svg className="narrow-icon" aria-hidden="true">
          <use xlinkHref="#icon-left-arrow" />
        </svg>
        <svg className="icon-photographe" aria-hidden="true">
          <use xlinkHref="#icon-photo" />
        </svg>
        <svg className="narrow-icon" aria-hidden="true">
          <use xlinkHref="#icon-right-arrow" />
        </svg>
      </Footer>
    </BasicModal>
  )
}

export default PhotoModal

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const RowItem = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.span`
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
`
const Value = styled.span`
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #52c41a;
`
const CloseBtn = styled.div`
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  border-bottom: 1px solid #333333;
  cursor: pointer;
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 480px;
  height: 320px;
  background: rgba(0, 0, 0, 0.55);
`

const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`
