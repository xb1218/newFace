import React from 'react'
import { Form, Button, Input, message } from 'antd'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'
import http from '../../utils/http'
import useStores from '../../hooks/useStores'
import useForm from '../../hooks/useForm'
import helpUrl from '../../assets/image/help-icon.png'
import userUrl from '../../assets/image/user.png'
import userActiveUrl from '../../assets/image/user-active.png'
import passwordUrl from '../../assets/image/password.png'
import passwordActiveUrl from '../../assets/image/password-active.png'
import './login.scss'

export default function Login() {
  const navigate = useNavigate()
  const { auth } = useStores()
  const { values, setFiledValue } = useForm({ username: '', password: '' })

  const empty = !values.username || !values.password

  const usernamePreIconClass = cx({
    'username-pre-icon': true,
    active: values.username !== '',
  })

  const passwordPreIcon = cx({
    'password-pre-icon': true,
    active: values.password !== '',
  })

  const loginBtnClass = cx({
    active: !empty,
  })

  const onFinish = async () => {
    const res = await auth.login(values)
    if (res) navigate('/entrance')
  }
  return (
    <div className="login-bg">
      <div className="sys-name">人脸识别系统</div>
      <div className="login-wrapper">
        <div className="login-header">Face ID</div>
        <div className="form-wrapper">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                bordered={false}
                placeholder="请输入用户名"
                prefix={<PrefixUsername className={usernamePreIconClass} />}
                onChange={(e) => setFiledValue('username', e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                bordered={false}
                placeholder="请输入密码"
                prefix={<PrefixPassword className={passwordPreIcon} />}
                onChange={(e) => setFiledValue('password', e.target.value)}
              />
            </Form.Item>
            <Form.Item className="pace">
              <LoginButton
                htmlType="submit"
                disabled={empty}
                className={loginBtnClass}
              >
                登录
              </LoginButton>
              <TipText>
                <TipImage src={helpUrl} alt="" />
                忘记密码请联系管理员
              </TipText>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

const LoginButton = styled(Button)`
  cursor: pointer;
  width: 240px;
  height: 36px;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  background: #5f89ff;
  margin-top: 15px;
  &.ant-btn.active:hover {
    color: #fff;
    background: #5f89ff;
  }
`

const TipText = styled.div`
  text-align: center;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ababab;
  margin-top: 10px;
`

const PrefixUsername = styled.div`
  width: 20px;
  height: 20px;
  background: url(${userUrl}) no-repeat;
  background-size: 100%;
  &.username-pre-icon.active {
    background: url(${userActiveUrl}) no-repeat;
    background-size: 100%;
  }
`

const PrefixPassword = styled.div`
  width: 20px;
  height: 20px;
  background: url(${passwordUrl}) no-repeat;
  background-size: 100%;
  &.password-pre-icon.active {
    background: url(${passwordActiveUrl}) no-repeat;
    background-size: 100%;
  }
`

const TipImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`
