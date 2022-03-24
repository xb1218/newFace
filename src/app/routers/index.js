import { lazy, Suspense } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'
import Layout from '../layout'

const Entrance = lazy(() => import('../pages/entrance'))
const Collection = lazy(() => import('../pages/collection'))
const Schedule = lazy(() => import('../pages/schedule'))
const Device = lazy(() => import('../pages/device'))
const Users = lazy(() => import('../pages/users'))
const Login = lazy(() => import('../pages/login'))

// 懒加载组件包裹
const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={null}>{children}</Suspense>
}

// 路由配置
const routers: RouteObject[] = [
  {
    path: '/public',
    element: <Layout />,
    children: [
      {
        path: 'collection',
        element: lazyLoad(<Collection />),
      },
      {
        path: 'schedule',
        element: lazyLoad(<Schedule />),
      },
      {
        path: 'device',
        element: lazyLoad(<Device />),
      },
      {
        path: 'users',
        element: lazyLoad(<Users />),
      },
    ],
  },
  {
    path: 'entrance',
    element: lazyLoad(<Entrance />),
  },
  {
    path: '/login',
    element: lazyLoad(<Login />),
  },
  { path: '*', element: <Navigate replace to="/login" /> },
]

// sidebar菜单
const menuRouters = [
  {
    path: '/public/collection',
    label: '信息采集',
    icon: 'collection',
  },
  {
    path: '/public/schedule',
    label: '日程表',
    icon: 'schedule',
  },
  {
    path: '/public/device',
    label: '设备管理',
    icon: 'device',
  },
  {
    path: '/public/users',
    label: '用户管理',
    icon: 'users',
  },
]

export { routers, menuRouters }
