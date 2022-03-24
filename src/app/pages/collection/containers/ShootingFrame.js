import React from 'react'
import styled from '@emotion/styled'
import shark from '@/app/assets/image/icon-shark.png'

const ShootingFrame = (props) => {
  const { onLayerClick } = props
  return (
    <div>
      {props.title && <div>{props.title}</div>}
      <ShootingCount>
        <CardBox width={props.width} height={props.height}>
          <img
            src={props.src}
            alt=""
            width={props.width}
            height={props.height}
          />
          <CardItem
            className="CardItem"
            width={props.width}
            height={props.height}
          >
            <div className="cardImg" onClick={onLayerClick}>
              <img src={shark} alt="" />
              <span>{props.type === '重采' ? '点击采集' : '点击拍摄'}</span>
            </div>
          </CardItem>
        </CardBox>
        <span onClick={onLayerClick}>{props.type || '重拍'}</span>
      </ShootingCount>
    </div>
  )
}

export default ShootingFrame

const ShootingCount = styled.div`
  display: flex;
  align-items: flex-end;
  > span {
    color: #cccccc;
    border-bottom: 2px solid #ccc;
    cursor: pointer;
    :hover {
      color: #5f89ff;
      border-bottom: 2px solid #5f89ff;
    }
  }
`

const CardBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s;
  margin-right: 5px;
  > img {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background: #f2f4fa;
  }
  &:hover {
    .CardItem {
      top: 0;
    }
  }
`

const CardItem = styled.div`
  position: absolute;
  top: ${(props) => props.height};
  left: 0;
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: top 0.6s;
  cursor: pointer;
  .cardImg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 38px;
      height: 38px;
      margin-bottom: 10px;
    }
    span {
      color: #5f89ff;
    }
  }
`
