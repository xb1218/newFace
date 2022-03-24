import React, { useEffect, useState } from 'react'
import {
  Drawer,
  Checkbox,
  Space,
  Row,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Select,
  Button,
} from 'antd'
import styled from '@emotion/styled'
import moment from 'moment'
import {
  ART_OPTIONS,
  TRANSMIT_DATA_OPTIONS,
  FREQUENCY_OPTIONS,
} from '../../../utils/const'
import useStores from '../../../hooks/useStores'

const { Option } = Select
const CheckboxGroup = Checkbox.Group

export default function DeviceRuleDrawer({
  visible,
  onClose,
  currentRule,
  callback,
}) {
  const layout = { labelCol: { span: 8 } }
  const [ruleForm] = Form.useForm()
  const {
    device: { ruleDetail, setRule, doctorGroups },
  } = useStores()

  const [transCheckedList, setTransCheckedList] = React.useState([])
  const [transIndeterminate, setTransIndeterminate] = React.useState(false)
  const [transCheckAll, setTransCheckAll] = React.useState(false)

  const [artCheckedList, setArtCheckedList] = React.useState([])
  const [artIndeterminate, setArtIndeterminate] = React.useState(false)
  const [artCheckAll, setArtCheckAll] = React.useState(false)

  const [drCheckedList, setDrCheckedList] = React.useState([])
  const [drIndeterminate, setDrIndeterminate] = React.useState(false)
  const [drCheckAll, setDrCheckAll] = React.useState(false)
  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: '请选择时间',
      },
    ],
  }

  useEffect(() => {
    ruleForm.setFieldsValue({
      distributeTime: ruleDetail.distributeTime
        ? moment(ruleDetail.distributeTime, 'HH:mm:ss')
        : '',
      distributeFrequency: ruleDetail.distributeFrequency || '',
    })
    setTransCheckedList(ruleDetail.dataDistributeRules)
    setArtCheckedList(ruleDetail.artDistributeRules)
    setDrCheckedList(ruleDetail.doctorDistributeRules)
  }, [ruleDetail])

  const onDrChange = (list) => {
    setDrCheckedList(list)
    setDrIndeterminate(!!list.length && list.length < doctorGroups.length)
    setDrCheckAll(list.length === doctorGroups.length)
  }

  const onDrAllChange = (e) => {
    setDrCheckedList(e.target.checked ? doctorGroups.map((item) => item) : [])
    setDrIndeterminate(false)
    setDrCheckAll(e.target.checked)
  }

  const onArtChange = (list) => {
    setArtCheckedList(list)
    setArtIndeterminate(!!list.length && list.length < ART_OPTIONS.length)
    setArtCheckAll(list.length === ART_OPTIONS.length)
  }

  const onArtAllChange = (e) => {
    setArtCheckedList(
      e.target.checked ? ART_OPTIONS.map((item) => item.value) : []
    )
    setArtIndeterminate(false)
    setArtCheckAll(e.target.checked)
  }

  const onTransChange = (list) => {
    setTransCheckedList(list)
    setTransIndeterminate(
      !!list.length && list.length < TRANSMIT_DATA_OPTIONS.length
    )
    setTransCheckAll(list.length === TRANSMIT_DATA_OPTIONS.length)
  }

  const onTransAllChange = (e) => {
    setTransCheckedList(
      e.target.checked ? TRANSMIT_DATA_OPTIONS.map((item) => item.value) : []
    )
    setTransIndeterminate(false)
    setTransCheckAll(e.target.checked)
  }

  const onFinish = async () => {
    const ruleValues = ruleForm.getFieldValue()
    const submitValues = {
      ...ruleValues,
      doctorDistributeRules: drCheckedList,
      artDistributeRules: artCheckedList,
      dataDistributeRules: transCheckedList,
      distributeTime: ruleValues['distributeTime'].format('HH:mm:ss'),
    }
    await setRule(currentRule.id, submitValues)
    onClose()
    callback()
  }

  return (
    <DrawerContainer
      width={240}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <SubTitle>设备规则</SubTitle>
      <CheckboxContainer>
        <CheckboxItems>
          <Checkbox
            indeterminate={drIndeterminate}
            checked={drCheckAll}
            onChange={onDrAllChange}
          >
            医生分组
          </Checkbox>
          <IndentRow>
            <CheckboxGroup value={drCheckedList} onChange={onDrChange}>
              <Space direction="vertical">
                {doctorGroups.map((doctor, index) => {
                  return (
                    <Checkbox key={index} value={doctor}>
                      {doctor}
                    </Checkbox>
                  )
                })}
              </Space>
            </CheckboxGroup>
          </IndentRow>
        </CheckboxItems>
        <CheckboxItems>
          <Checkbox
            indeterminate={artIndeterminate}
            checked={artCheckAll}
            onChange={onArtAllChange}
          >
            ART方式
          </Checkbox>
          <IndentRow>
            <CheckboxGroup value={artCheckedList} onChange={onArtChange}>
              <Space direction="vertical">
                {ART_OPTIONS.map((art) => {
                  return (
                    <Checkbox key={art.value} value={art.value}>
                      {art.label}
                    </Checkbox>
                  )
                })}
              </Space>
            </CheckboxGroup>
          </IndentRow>
        </CheckboxItems>
        <CheckboxItems>
          <Checkbox
            indeterminate={transIndeterminate}
            checked={transCheckAll}
            onChange={onTransAllChange}
          >
            传输数据
          </Checkbox>
          <IndentRow>
            <CheckboxGroup value={transCheckedList} onChange={onTransChange}>
              <Space direction="vertical">
                {TRANSMIT_DATA_OPTIONS.map((transmit) => {
                  return (
                    <Checkbox key={transmit.value} value={transmit.value}>
                      {transmit.label}
                    </Checkbox>
                  )
                })}
              </Space>
            </CheckboxGroup>
          </IndentRow>
        </CheckboxItems>
      </CheckboxContainer>
      <SubTitle>分发时间</SubTitle>
      <Form {...layout} form={ruleForm} onFinish={onFinish}>
        <Form.Item
          name="distributeTime"
          label="时间"
          rules={[{ required: true, message: '请选择时间' }]}
        >
          <TimePicker label="TimePicker" {...config} />
        </Form.Item>
        <Form.Item
          name="distributeFrequency"
          label="频次"
          rules={[{ required: true, message: '请选择频次' }]}
        >
          <Select placeholder="请选择频次" allowClear>
            {FREQUENCY_OPTIONS.map((frequeny) => (
              <Option key={frequeny.value} value={frequeny.value}>
                {frequeny.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <SubmitBtn type="primary" htmlType="submit" size="middle">
          提交
        </SubmitBtn>
      </Form>
    </DrawerContainer>
  )
}

const DrawerContainer = styled(Drawer)`
  .ant-drawer-body {
    padding: 18px;
  }
  .ant-form-item {
    margin-bottom: 10px;
  }
`

const SubTitle = styled.div`
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-bottom: 10px;
  border-bottom: 3px solid #5f89ff;
  width: fit-content;
`

const CheckboxContainer = styled.div`
  margin: 20px 0;
`

const CheckboxItems = styled.div``

const IndentRow = styled(Row)`
  margin: 10px 0 10px 24px;
`

const SubmitBtn = styled(Button)`
  position: absolute;
  bottom: 20px;
  left: 80px;
  border-radius: 16px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  border-color: #ff8d56;
  background: #ff8d56;
  &.ant-btn {
    padding: 2.6px 20px;
  }
  &.ant-btn-primary:hover,
  &.ant-btn-primary:focus {
    background: #ff8d56;
    border-color: #ff8d56;
    opacity: 0.8;
  }
`
