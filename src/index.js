import React from 'react'
import { ConfigProvider } from 'antd'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import { Provider } from 'mobx-react'
import stores from './app/stores'
import zhCN from 'antd/lib/locale/zh_CN'

import 'moment/locale/zh-cn'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import './index.css'

render(
  <ConfigProvider locale={zhCN}>
    <Provider {...stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
