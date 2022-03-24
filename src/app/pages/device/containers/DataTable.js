import React, { useEffect, useState } from 'react'
import { Table, Switch, Row } from 'antd'
import styled from '@emotion/styled'
import { BetweenRow } from '@/app/components/normal/BaseRow'
import { useAntdTable } from '@/app/hooks/useAntdTable'
import AddDeviceDrawer from '@/app/components/normal/AddDeviceDrawer'
import EditDeviceDrawer from '@/app/components/normal/EditDeviceDrawer'
import useStores from '@/app/hooks/useStores'
import DeviceRuleDrawer from '@/app/components/normal/DeviceRuleDrawer'
import addBtn from '@/app/assets/image/add-btn.png'
import editIcon from '@/app/assets/image/edit-icon.png'
import ruleIcon from '@/app/assets/image/rule-icon.png'

const DataTable = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [ruleVisible, setRuleVisible] = useState(false)
  const [currentRule, setCurrentRule] = useState(null)
  const { device } = useStores()

  const {
    tableProps,
    run,
    pagination,
    pagination: { current },
  } = useAntdTable('/device', {
    manual: true,
  })

  useEffect(() => {
    run({ current: 1, pageSize: 10 })
  }, [run])

  const toggleSwitch = async (record) => {
    if (record.state === 1) {
      await device.changeState(record.id, 0)
      run({ current, pageSize: 10 })
    } else {
      await device.changeState(record.id, 1)
      run({ current, pageSize: 10 })
    }
  }
  const showEditDrawer = async (record) => {
    await device.getDetail(record.id)
    setEditVisible(true)
  }
  const columns = [
    {
      title: '编号',
      dataIndex: 'deviceNo',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: '区域',
      dataIndex: 'area',
    },
    {
      title: '位置',
      dataIndex: 'position',
    },
    {
      title: '功能',
      dataIndex: 'deviceType',
    },
    {
      title: '规则',
      dataIndex: 'doctorDistributeRule',
    },
    {
      title: '启用',
      dataIndex: 'state',
      render: (text, record) => {
        return (
          <Switch
            onChange={() => toggleSwitch(record)}
            checked={record.state === 1}
            size="small"
          />
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'operator',
      width: 70,
      render: (text, record) => {
        return (
          <Row type="flex" justify="space-between" align="middle">
            <IconWrapper onClick={() => onRuleClick(record)}>
              <img src={ruleIcon} alt="" />
            </IconWrapper>
            <IconWrapper onClick={() => showEditDrawer(record)}>
              <img src={editIcon} alt="" />
            </IconWrapper>
          </Row>
        )
      },
    },
  ]

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const onRuleClick = async (record) => {
    await device.getRuleDetail(record.id)
    setCurrentRule(record)
    setRuleVisible(true)
  }

  const onEditClose = () => {
    setEditVisible(false)
  }

  const onRuleClose = () => {
    setRuleVisible(false)
  }

  return (
    <WhiteCard>
      <BetweenRow>
        <SubTitle>设备列表</SubTitle>
        <AddBtn onClick={showDrawer}>
          <img src={addBtn} alt="" />
        </AddBtn>
      </BetweenRow>
      <Table
        size="middle"
        columns={columns}
        {...tableProps}
        rowKey={(record) => record.id}
        pagination={{
          ...pagination,
          showTotal: (total) => `共${total}条结果`,
        }}
      />
      <AddDeviceDrawer
        visible={visible}
        onClose={onClose}
        callback={() => run({ current: 1, pageSize: 10 })}
      />
      <EditDeviceDrawer
        visible={editVisible}
        onClose={onEditClose}
        callback={() => run({ current: 1, pageSize: 10 })}
      />
      <DeviceRuleDrawer
        visible={ruleVisible}
        onClose={onRuleClose}
        currentRule={currentRule}
        callback={() => run({ current: 1, pageSize: 10 })}
      />
    </WhiteCard>
  )
}

export default DataTable

const WhiteCard = styled.div`
  background: white;
  margin-bottom: 10px;
  position: relative;
  padding: 14px;
`

const SubTitle = styled.div`
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-bottom: 20px;
  border-bottom: 3px solid #5f89ff;
  width: fit-content;
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

const IconWrapper = styled.div`
  img {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
`
