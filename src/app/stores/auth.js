import { message } from 'antd'
import { action, makeAutoObservable } from 'mobx'
import { saveToken } from '../utils/token'
import http from '../utils/http'

const auth = makeAutoObservable({
  userinfo: {},
  async login(values) {
    const res = await http.post('/auth', values)
    if (res.code === 200) {
      saveToken(res.data.token)
      return res
    } else {
      message.error(res.message)
    }
  },
  async get_userinfo() {
    const res = await http.get('/user/info')
    if (res.code === 200) {
      this.userinfo = res.data
    } else {
      message.error(res.message)
    }
  },
  async change_password(passwordValues) {
    const res = await http.put('/user/password', passwordValues)
    if (res.code === 200) {
      message.success('密码修改成功')
      return res
    } else {
      message.error(res.message)
    }
  },
})

export default auth
