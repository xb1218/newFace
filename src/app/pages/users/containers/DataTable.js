import React, { useEffect, useState } from 'react'
import { Table, Switch, Row, Modal, Button } from 'antd'
import styled from '@emotion/styled'
import { BetweenRow } from '@/app/components/normal/BaseRow'
import AddUserDrawer from '@/app/components/normal/AddUserDrawer'
import EditUserDrawer from '@/app/components/normal/EditUserDrawer'
import { useAntdTable } from '../../../hooks/useAntdTable'
import useStores from '../../../hooks/useStores'
import { USER_ROLE_MAP } from '../../../utils/const'
import addBtn from '@/app/assets/image/add-btn.png'
import editIcon from '@/app/assets/image/edit-icon.png'
import resetIcon from '@/app/assets/image/reset-icon.png'
import warnIcon from '@/app/assets/image/warn-icon.png'
import BasicModal from '../../../components/normal/BasicModal'

const DataTable = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [rowData, setRowData] = useState(null)
  const { users } = useStores()
  const {
    tableProps,
    run,
    pagination,
    pagination: { current },
  } = useAntdTable('/user', {
    manual: true,
  })

  useEffect(() => {
    run({ current: 1, pageSize: 10 })
  }, [run])

  const onResetClick = async (record) => {
    await setRowData(record)
    setModalVisible(true)
  }

  const toggleSwitch = async (record) => {
    if (record.disable) {
      await users.enable(record)
      run({ current, pageSize: 10 })
    } else {
      await users.disable(record)
      run({ current, pageSize: 10 })
    }
  }

  const columns = [
    {
      title: '角色',
      dataIndex: 'role',
      render: (text, record) => {
        return <>{USER_ROLE_MAP.get(text)}</>
      },
    },
    {
      title: '用户名（工号）',
      dataIndex: 'loginName',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '分发设备',
      dataIndex: 'userDervices',
      render: (text, record) => {
        return (
          <span>
            {record.userDervices ? joinStr(record.userDervices) : '-'}
          </span>
        )
      },
    },
    {
      title: '启用',
      dataIndex: 'switch',
      render: (text, record) => {
        return (
          <Switch
            size="small"
            checked={!record.disable}
            onChange={() => toggleSwitch(record)}
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
            <IconWrapper onClick={() => onResetClick(record)}>
              <img src={resetIcon} alt="" />
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

  const handleOk = async () => {
    await users.resetPassword(rowData.id)
    setModalVisible(false)
  }

  const showEditDrawer = async (record) => {
    await users.getDetail(record.id)
    setEditVisible(true)
  }

  const onEditClose = () => {
    setEditVisible(false)
  }

  const joinStr = (userDervices) => {
    return userDervices
      .map((device) => {
        return device.deviceNo
      })
      .join(', ')
  }
  return (
    <WhiteCard>
      <BetweenRow>
        <SubTitle>用户列表</SubTitle>
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
      <BasicModal
        title="重置密码"
        width={400}
        okText="确认"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Row key="confirm" type="flex" justify="center" align="middle">
            <Button onClick={handleOk} type="primary">
              确定
            </Button>
          </Row>,
        ]}
      >
        <Row type="flex" justify="center" align="middle">
          <img src={warnIcon} alt="" />
          该操作将用户<UserName>{rowData?.loginName}</UserName>
          的密码重置为初始密码
        </Row>
      </BasicModal>
      <AddUserDrawer
        visible={visible}
        onClose={onClose}
        callback={() => run({ current: 1, pageSize: 10 })}
      />
      <EditUserDrawer
        visible={editVisible}
        onClose={onEditClose}
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

const UserName = styled.span`
  font-size: 16px;
  color: #ff9e4a;
  margin: 0 5px;
`
