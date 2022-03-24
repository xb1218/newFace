import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Table } from 'antd'
import styled from '@emotion/styled'
import useStores from '../../../hooks/useStores'
import BasicModal from '@/app/components/normal/BasicModal'

function SearchMateModal({ pagination, tableProps, isVisible, closeModal }) {
  const navigate = useNavigate()
  const [selectData, setSelectData] = useState()
  const { collection } = useStores()

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectData(selectedRowKeys[0])
    },
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      width: 50,
      align: 'center',
      render: (text, record, index) => {
        return <span>{index + 1}</span>
      },
    },
    {
      title: '病历号',
      align: 'center',
      dataIndex: 'medicalRecordNo',
    },
    {
      title: '女方',
      align: 'center',
      dataIndex: 'femaleName',
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
      align: 'center',
      dataIndex: 'femaleIdCard',
    },
    {
      title: '男方',
      align: 'center',
      dataIndex: 'maleName',
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
      align: 'center',
      dataIndex: 'maleIdCard',
    },
  ]

  const getCoupleData = async () => {
    let res = await collection.getCoupleById({ coupleId: selectData })
    if (res.code === 200) {
      navigate('/public/collection')
      closeModal()
    }
  }

  const footerEle = (
    <Row justify="center">
      <Button type="primary" onClick={getCoupleData}>
        确认
      </Button>
    </Row>
  )
  return (
    <>
      <BasicModalWrapper
        title="搜索"
        okText="确认"
        width={830}
        visible={isVisible}
        footer={footerEle}
        onCancel={closeModal}
      >
        <Table
          size="middle"
          scroll={{ y: 600 }}
          columns={columns}
          {...tableProps}
          rowKey={(record) => record.id}
          pagination={{
            ...pagination,
            showTotal: (total) => `共${total}条结果`,
          }}
          rowSelection={{
            type: 'radio',
            ...rowSelection,
            columnWidth: '10%',
          }}
        />
      </BasicModalWrapper>
    </>
  )
}

export default SearchMateModal

const BasicModalWrapper = styled(BasicModal)`
  .ant-modal-body {
    padding-bottom: 0;
  }
`
