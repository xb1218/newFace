import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { matchRoutes, useLocation, useNavigate, Link } from 'react-router-dom'
import { routers, menuRouters as _menuRoutes } from '@/app/routers'
import useStores from '../../../hooks/useStores'
import { Menu } from 'antd'
import cx from 'classnames'
import styled from '@emotion/styled'
import './sidebar.scss'

function Sidebar() {
  const location = useLocation()
  const { auth } = useStores()

  const filterMenuRoutes = _menuRoutes.filter((route) => {
    if (auth.userinfo.role !== 'admin') {
      return route.label !== '用户管理'
    }
    return route
  })

  return (
    <div className="page-sidebar">
      <ul className="page-sidebar-nav">
        {filterMenuRoutes.map((menu) => {
          const menuStyles = cx({
            active: location.pathname.includes(menu.path),
          })
          return (
            <Link to={menu.path} key={menu.path}>
              <li className={menuStyles}>
                <span className={`sidebar-icon sidebar-icon-${menu.icon}`} />
                <span className="sidebar-title">{menu.label}</span>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default observer(Sidebar)

const SidebarWrapper = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 160px;
  margin-top: 12px;
`
