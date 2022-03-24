import React, { useState, useEffect } from 'react'
import { DatePicker, message } from 'antd'
import moment from 'moment'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import ProgressShow from './Progress'
import AbnormalItem from './AbnormalItem'
import JournalTiltle from './JournalTiltle'
import useStore from '../../../hooks/useStores'
import { JOURNAL_DATA } from '../../../utils/const'
import '../schedule.scss'
const JournalDate = (props) => {
  const [transmission, setTransmission] = useState([]) //传输记录
  const [abnormal, setAbnormal] = useState([]) //异常记录
  const [retryData, setRetryData] = useState([]) //异常重试参数
  const [dispense, setDispense] = useState([]) //分发中
  const [date, setDate] = useState(moment(props.date, 'YYYY-MM-DD'))
  const { schedule } = useStore()
  let timer
  useEffect(() => {
    getJournamData(date)
    return () => {
      clearInterval(timer)
    }
  }, [date])
  // 获取日程表日志
  const getJournamData = async (dates) => {
    let res = await schedule.journalData({ date: dates ?? date })
    handleJournalData(res.data)
    handleAbnormalData(res.data.distributeException)
  }
  // 处理数据，传输记录,分发中
  const handleJournalData = (data, type) => {
    let judleData = JSON.parse(JSON.stringify(JOURNAL_DATA))
    let penndingData = JSON.parse(JSON.stringify(JOURNAL_DATA))
    // 处理传输记录
    judleData.map((item, index) => {
      switch (item.title) {
        case '取卵':
          item.total = data.opu[1]
          item.transmitted = data.opu[0]
          break
        default:
          let type = item.title.toLowerCase()
          item.total = data[type][1]
          item.transmitted = data[type][0]
      }
      return judleData
    })
    // 处理分发中记录
    penndingData.forEach((item, index) => {
      item.total = data[index]
      return penndingData
    })
    setTransmission(judleData)
    setDispense(penndingData)
  }
  // 处理数据，异常记录的分发
  const handleAbnormalData = (data) => {
    let tempArr = []
    var newArr = []
    let retry = []
    data.forEach((i, index) => {
      retry.push({ date, coupleId: i.coupleId })
      if (tempArr.indexOf(i.operationType) === -1) {
        newArr.push({
          title: i.operationType,
          people: [
            { female: i.femaleName, male: i.maleName, coupleId: i.coupleId },
          ],
        })
        tempArr.push(i.operationType)
      } else {
        newArr[tempArr.indexOf(i.operationType)].people.push({
          female: i.femaleName,
          male: i.maleName,
          coupleId: i.coupleId,
        })
      }
    })
    setAbnormal(newArr)
    setRetryData(retry)
  }
  // 向前或者向后切换日期
  const checkDate = (num) => {
    if (date) {
      let dates = moment(date).subtract(num, 'days').format('YYYY-MM-DD')
      setDate(dates)
    } else {
      message.destroy()
      message.error('请选择日期！')
    }
  }
  // 重试(异常记录分发)
  const retry = async () => {
    await schedule.repeatGetData(retryData)
    timer = setInterval(() => {
      getJournamData(date)
    }, 5000)
  }

  return (
    <div className="scheduleJournal">
      <div className="journalTitle">分发日志</div>
      <div>
        <LeftOutlined onClick={() => checkDate(1)} />
        <DatePicker
          value={(date && moment(date, 'YYYY-MM-DD')) || ''}
          onChange={(date, datestring) => setDate(datestring)}
          bordered={false}
        />
        <RightOutlined onClick={() => checkDate(-1)} />
      </div>
      <div>
        <JournalTiltle name="传输记录" />
        <div>
          {transmission.map((item) => {
            let percent = (item.transmitted / item.total) * 100
            return (
              <ProgressShow
                key={item.title}
                title={item.title}
                total={item.total}
                percent={percent}
                color={item.color}
                transmitted={item.transmitted}
              />
            )
          })}
        </div>
      </div>
      <div className="journalAbnormal">
        <JournalTiltle name="异常记录" />
        <div className="abnormalButton" onClick={() => retry()}>
          重试
        </div>
      </div>
      <div>
        {abnormal.map((item) => (
          <AbnormalItem
            key={item.title}
            children={item.people}
            title={item.title}
          />
        ))}
      </div>
      <div>
        <JournalTiltle name="分发中" />

        <div>
          {dispense.map((item) => {
            return (
              item.total > 0 && (
                <ProgressShow
                  key={item.title}
                  title={item.title}
                  total={item.total}
                  percent={70}
                  color={item.color}
                  status="active"
                />
              )
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default JournalDate
