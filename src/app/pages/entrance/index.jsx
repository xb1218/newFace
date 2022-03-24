import { Fragment } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react'
import AppCard from './containers/AppCard'
import Header from '../../components/common/header'
import entranceBg from '../../assets/image/entrance_bg.png'
import useStores from '../../hooks/useStores'
import { ENTRANCE_APPS } from '../../utils/const'
import './entrance.scss'

function Entrance() {
  const { auth } = useStores()

  const filter_apps = ENTRANCE_APPS.filter((app) => {
    if (auth.userinfo.role !== 'admin') {
      return app !== 'users'
    }
    return app
  })

  return (
    <Fragment>
      <Header showOperate={false} />
      <AppsContainer>
        {filter_apps.map((app) => (
          <AppCard key={app} app={app} />
        ))}
      </AppsContainer>
    </Fragment>
  )
}

export default observer(Entrance)

const AppsContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  height: calc(100vh - 56px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e7f0;
  background-image: url(${entranceBg});
  background-repeat: no-repeat;
  background-size: cover;

  span {
    display: inline-block;
    width: 150px;
    height: 150px;
    line-height: 150px;
    border-radius: 75px;
    font-size: 20px;
    border: 1px solid #1aaff8;
  }
  a {
    z-index: 999;
  }
`
const BacImg = styled.img`
  position: fixed;
  bottom: 0;
  right: 0;
`
