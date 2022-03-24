import { Fragment } from 'react'
import { Row, Col } from 'antd'
import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import Header from '../components/common/header'
import Sidebar from '../components/common/sidebar'

export default function Layout() {
  return (
    <Fragment>
      <Header showOperate={true} />
      <RowContainer>
        <Col>
          <Sidebar />
        </Col>
        <ColWrapper>
          <Outlet />
        </ColWrapper>
      </RowContainer>
    </Fragment>
  )
}

const RowContainer = styled(Row)`
  background: #f0f1f6;
`

const ColWrapper = styled(Col)`
  flex: 1;
  width: calc(100vw - 160px);
  height: calc(100vh - 70px);
  margin: 68px 0 0 92px;
  background: #fff;
  box-shadow: -4px 0px 5px -2px #f0f1f6;
`
