import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Row, Col, Select, Table } from 'antd'
import { observer } from 'mobx-react'
import styled from '@emotion/styled'
import useStores from '@/app/hooks/useStores'
import { PlusOutlined } from '@ant-design/icons'
import BasicModal from '@/app/components/normal/BasicModal'
import { UPDATE_MODAL_COLUMNS, SEARCH_OPTIONS } from '@/app/utils/const'

const { Option } = Select

function UpdateMateModal({
  isVisible,
  closeModal,
  pagination,
  tableProps,
  gender,
  clearCoupleInfo,
  comfirmCb,
  searchRunfunc,
}) {
  const {
    collection,
    collection: { coupleData },
  } = useStores()
  const [selectType, setSelectType] = useState(`${gender}Name`)
  const [inputValue, setInputValue] = useState('')
  const [selectedRowId, setSelectedRowId] = useState('')
  const columns = UPDATE_MODAL_COLUMNS.get(gender)

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowId(selectedRowKeys[0])
    },
  }

  const confirmSubmit = async (gender) => {
    const { data } = await collection.getCoupleById(
      { coupleId: selectedRowId },
      gender
    )
    comfirmCb(data, gender)
  }

  const footerEle = (
    <Row justify="center">
      <Button type="primary" onClick={() => confirmSubmit(gender)}>
        确认
      </Button>
    </Row>
  )

  const searchCoupleUser = async () => {
    await searchRunfunc(
      { current: 1, pageSize: 10 },
      {
        [`${gender}QueryDto`]: {
          [`${selectType}`]: inputValue,
        },
      }
    )
  }

  return (
    <>
      <BasicModalWrapper
        title="更换配偶"
        okText="确认"
        width={580}
        visible={isVisible}
        footer={footerEle}
        onCancel={closeModal}
      >
        <FlexCon id="area">
          <Input.Group compact style={{ marginBottom: 16 }}>
            <BaseSelect
              defaultValue="姓名"
              value={selectType}
              onChange={(val) => setSelectType(val)}
              getPopupContainer={() => document.getElementById('area')}
            >
              <Option value={`${gender}Name`}>姓名</Option>
              <Option value={`${gender}IdCard`}>证件号</Option>
              <Option value={`${gender}Phone`}>手机号</Option>
            </BaseSelect>
            <BaseInput
              style={{ width: '160px' }}
              suffix={
                <svg
                  aria-hidden="true"
                  style={{ width: '16px', height: '16px' }}
                  onClick={searchCoupleUser}
                >
                  <use xlinkHref="#icon-search" />
                </svg>
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={searchCoupleUser}
            />
          </Input.Group>
          <CreateBtn onClick={(e) => clearCoupleInfo(gender)}>
            <PlusOutlined style={{ marginRight: 4 }} />
            新建
          </CreateBtn>
        </FlexCon>
        <Table
          size="middle"
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

export default observer(UpdateMateModal)

const BasicModalWrapper = styled(BasicModal)`
  .ant-modal-body {
    padding-bottom: 0;
  }
`

const CreateBtn = styled.div`
  width: 58px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background: rgba(95, 137, 255, 0.2);
  border-radius: 2px;
  border: 1px dashed #5f89ff;
  color: #5f89ff;
  cursor: pointer;
`

const FlexCon = styled.div`
  display: flex;
`

const BaseSelect = styled(Select)`
  &.ant-select {
    width: 90px;
    .ant-select-selector {
      width: 90px;
      border-radius: 20px 0px 0px 20px !important;
    }
  }
`

const BaseInput = styled(Input)`
  .ant-input-suffix {
    cursor: pointer;
  }
  &.ant-input-affix-wrapper {
    border-radius: 0px 14px 14px 0px !important;
  }
`
