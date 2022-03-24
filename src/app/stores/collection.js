import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import http from '../utils/http'

const collection = makeAutoObservable({
  coupleData: {}, // 通过搜索获得的夫妻信息
  coupleId: null, // 夫妻ID
  records: [],
  async create(values) {
    const res = await http.post('/couple', values)
    if (res.code === 200) {
      message.success('创建成功')
      return res
    } else {
      message.error(res.message)
    }
  },
  async update(values) {
    const res = await http.put('/couple/collectionRecord', values)
    if (res.code === 200) {
      message.success('覆盖成功')
      return res
    } else {
      message.error(res.message)
    }
  },
  async updateCard(coupleId, collectionRecordId, values) {
    const res = await http.put(
      `/couple/${coupleId}/card?collectionRecordId=${collectionRecordId}`,
      values
    )
    if (res.code === 200) {
      message.success('更新成功')
      return res
    } else {
      message.error(res.message)
    }
  },
  async clearCoupleData() {
    this.coupleData = {}
  },
  // 根据姓名等查找患者数据
  async getCoupleUser(values) {
    const res = await http.get('/couple', values)
    if (res.code === 200) {
      return res
    } else {
      message.error(res.message)
    }
  },
  // 根据夫妻证件号查夫妻信息（在提交时判断是否有多个夫妻信息）
  async getCoupleFullData(values) {
    const res = await http.get('/couple/card', values)
    if (res.code === 200) {
      return res
    } else {
      message.error(res.message)
    }
  },
  // 根据夫妻id或采集记录id查询夫妻信息
  async getCoupleById(values, gender) {
    const res = await http.get('/collection-record/couple', values)
    if (res.code === 200) {
      if (gender) {
        if (gender === 'female') {
          this.coupleData.femaleMessageDto = {
            ...res.data.femaleMessageDto,
          }
        } else {
          this.coupleData.maleMessageDto = {
            ...res.data.maleMessageDto,
          }
        }
      } else {
        this.coupleData = res.data
      }

      return res
    } else {
      message.error(res.message)
    }
  },

  async beforeSubmit(values) {
    const res = await http.post('/couple/tag', values)
    if (res.code === 200) {
      return res.data
    } else {
      message.error(res.message)
    }
  },
  async getRecords(id) {
    const res = await http.get(`/collection-record?coupleId=${id}`)
    if (res.code === 200) {
      if (res.data.length) {
        this.records = res.data
      }
      return res.data
    } else {
      message.error(res.message)
    }
  },
  async setCoverRecord(record) {
    this.coupleData = record
  },
})

export default collection
