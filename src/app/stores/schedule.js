import { makeAutoObservable } from 'mobx'
import http from '../utils/http'

const schedule = makeAutoObservable({
  // 分发日志
  async journalData(values) {
    const res = await http.get('/queryDistributeLog', values)
    if (res.code === 200) {
      return res
    } else {
      message.error(res.message)
    }
  },
  // 重发
  async repeatGetData(values) {
    const res = await http.post('/retry', values)
    if (res.code === 200) {
      return res
    } else {
      message.error(res.message)
    }
  },
})

export default schedule
