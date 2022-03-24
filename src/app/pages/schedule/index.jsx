import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import moment from 'moment'
import { Space, Divider, Button, DatePicker, Table, Drawer } from 'antd'
import { useAntdTable } from '../../hooks/useAntdTable'
import JournalDate from './containers/Journal'
import addBtn from '@/app/assets/image/add-btn.png'
import Journal from '@/app/assets/image/icon-journal.png'
import { SEARCH_ITEM } from '@/app/utils/const'

import './schedule.scss'

const SerchTable = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('取卵')
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [drawer, setDrawer] = useState(false)
  const queryData = {
    operationDate: date,
    operationType: title,
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      render: (text, record, index) => {
        return <span>{index + 1}</span>
      },
    },
    {
      title: '手术台分组',
      dataIndex: 'operationGroup',
      align: 'center',
    },
    {
      title: '医生分组',
      dataIndex: 'doctorGroup',
      align: 'center',
    },
    {
      title: '病历号',
      dataIndex: 'medicalRecordNo',
      align: 'center',
    },
    {
      title: '女方',
      dataIndex: 'femaleName',
      align: 'center',
      render: (text, record) => {
        return (
          <>
            <p>{text}</p>
            <p>{record.femalePhone}</p>
          </>
        )
      },
    },
    {
      title: '证件号',
      dataIndex: 'femaleCard',
      align: 'center',
    },
    {
      title: '男方',
      dataIndex: 'maleName',
      align: 'center',
      render: (text, record) => {
        return (
          <>
            <p>{text}</p>
            <p>{record.malePhone}</p>
          </>
        )
      },
    },
    {
      title: '证件号',
      dataIndex: 'maleCard',
      align: 'center',
    },
  ]
  const { tableProps, run, pagination } = useAntdTable('/querySchedule', {
    manual: true,
  })

  useEffect(() => {
    run({ current: 1, pageSize: 10 }, queryData)
  }, [run])
  // 查询日程表数据
  const searchSchedule = async (obj) => {
    await run({ current: 1, pageSize: 10 }, obj || queryData)
  }
  // 打开日志
  const openJurnal = () => {
    setDrawer(true)
  }
  // 关闭日志
  const closeDrawer = () => {
    setDrawer(false)
  }
  // 跳转到信息采集页面
  const jumpCollection = () => {
    navigate('/public/collection')
  }
  // 前天昨天明天的日期切换
  const checkDate = (num) => {
    let operationDate =
      date && moment(date).subtract(num, 'days').format('YYYY-MM-DD')
    searchSchedule({ ...queryData, operationDate })
  }
  return (
    <div className="schedule">
      <div className="scheduleTitle">
        <div className="scheduleSearch">
          <Space size={30} split={<Divider type="vertical" />}>
            {SEARCH_ITEM.map((item) => (
              <div
                key={item}
                className={title === item ? 'checkedTitle' : ''}
                onClick={() => {
                  setTitle(item)
                  searchSchedule({ ...queryData, operationType: item })
                }}
              >
                {item}
              </div>
            ))}
          </Space>
        </div>
        <div className="scheduleDaily">
          <Icon>
            <img src={Journal} alt="" onClick={openJurnal} />
          </Icon>
        </div>
      </div>
      <div className="scheduleSurname">
        <div>
          <Space size={16}>
            <SearchButton onClick={() => checkDate(2)} disabled={!date}>
              前
            </SearchButton>
            <SearchButton onClick={() => checkDate(1)} disabled={!date}>
              昨
            </SearchButton>
            <SearchPicker
              value={(date && moment(date, 'YYYY-MM-DD')) || ''}
              onChange={(date, datestring) => {
                setDate(datestring)
                searchSchedule({ ...queryData, operationDate: datestring })
              }}
            />
            <SearchButton onClick={() => checkDate(-1)} disabled={!date}>
              明
            </SearchButton>
          </Space>
        </div>
        <div>
          <AddBtn onClick={jumpCollection}>
            <img src={addBtn} alt="" />
          </AddBtn>
        </div>
      </div>
      <Table
        size="middle"
        className="scheduleTable"
        columns={columns}
        {...tableProps}
        rowKey={(record) => record.id}
        pagination={{
          ...pagination,
          showTotal: (total) => `共${total}条结果`,
        }}
      />
      <Drawer
        width={240}
        title={false}
        placement="right"
        closable={false}
        onClose={closeDrawer}
        visible={drawer}
      >
        <JournalDate date={date} />
      </Drawer>
    </div>
  )
}
export default SerchTable

const SearchButton = styled(Button)`
  width: 26px;
  height: 26px;
  padding: 0;
  line-height: 26px;
  text-align: center;
`
const SearchPicker = styled(DatePicker)`
  height: 26px;
`
const AddBtn = styled.div`
  width: 26px;
  height: 26px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`
const Icon = styled.div`
  padding: 9px 14px;
  text-align: center;
  img {
    cursor: pointer;
    width: 26px;
    height: 26px;
  }
`
