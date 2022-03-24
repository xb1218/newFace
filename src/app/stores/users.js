import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { processTreeData } from '../utils/common'
import http from '../utils/http'

const users = makeAutoObservable({
  detail: {},
  devices: [],
  treeData: [],
  async enable(record) {
    const res = await http.put(`/user/${record.id}/enable`)
    if (res.code === 200) {
      message.success('启用成功')
      return res
    }
    message.error(res.message)
  },
  async disable(record) {
    const res = await http.put(`/user/${record.id}/disable`)
    if (res.code === 200) {
      message.success('禁用成功')
      return res
    }
    message.error(res.message)
  },
  async create(userValues) {
    const res = await http.post('/user', userValues)
    if (res.code === 200) {
      message.success('创建成功')
    } else {
      message.error(res.message)
    }
  },
  async update(id, userValues) {
    const res = await http.put(`/user/${id}`, userValues)
    if (res.code === 200) {
      message.success('修改成功')
    } else {
      message.error(res.message)
    }
  },
  async resetPassword(id) {
    const res = await http.put(`/user/${id}/password`)
    if (res.code === 200) {
      message.success('密码重置成功')
    } else {
      message.error(res.message)
    }
  },
  async getDetail(id) {
    const res = await http.get(`/user/${id}`)
    if (res.code === 200) {
      this.detail = res.data
      return res.data
    } else {
      message.error(res.message)
    }
  },
  async getDevices() {
    const res = await http.get('/area/device/group')
    if (res.code === 200) {
      this.devices = res.data
      this.treeData = processTreeData(res.data)
      return res.data
    } else {
      message.error(res.message)
    }
  },
})

export default users
