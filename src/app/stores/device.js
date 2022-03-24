import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import http from '../utils/http'

const device = makeAutoObservable({
  detail: {},
  ruleDetail: {},
  doctorGroups: [],
  async create(deviceValues) {
    const res = await http.post('/device', deviceValues)
    if (res.code === 200) {
      message.success('创建成功')
    } else {
      message.error(res.message)
    }
  },
  async update(id, deviceValues) {
    const res = await http.put(`/device/${id}`, deviceValues)
    if (res.code === 200) {
      message.success('修改成功')
    } else {
      message.error(res.message)
    }
  },
  async getDetail(id) {
    const res = await http.get(`/device/${id}`)
    if (res.code === 200) {
      this.detail = res.data
      return res.data
    } else {
      message.error(res.message)
    }
  },
  async getRuleDetail(id) {
    const res = await http.get(`/device/${id}/rule`)
    if (res.code === 200) {
      this.ruleDetail = res.data
    } else {
      message.error(res.message)
    }
  },
  async setRule(id, values) {
    const res = await http.put(`/device/${id}/rule`, values)
    if (res.code === 200) {
      message.success('设置成功')
      return res.data
    } else {
      message.error(res.message)
    }
  },
  async changeState(id, state) {
    const res = await http.put(`/device/${id}/state`, { state })
    if (res.code === 200) {
      message.success('状态修改成功')
    } else {
      message.error(res.message)
    }
  },
  async drGroups() {
    const res = await http.get('device/rule')
    if (res.code === 200) {
      this.doctorGroups = res.data
    } else {
      message.error(res.message)
    }
  },
})

export default device
