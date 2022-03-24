import React, { useState } from 'react'
import {
  Drawer,
  Form,
  Input,
  Radio,
  Select,
  Checkbox,
  Row,
  Space,
  Tree,
  Button,
} from 'antd'
import styled from '@emotion/styled'
import doctorPhote from '@/app/assets/image/doctor-default.png'
import { ROLE_OPTIONS } from '@/app/utils/const'
import { CaretDownOutlined } from '@ant-design/icons'
import useStores from '../../../hooks/useStores'
import CheckboxCollapse from '../ChecxboxCollapse'
const { Option } = Select

export default function AddUserDrawer({ visible, onClose, callback }) {
  const layout = { labelCol: { span: 7 } }
  const [userForm] = Form.useForm()
  const {
    users,
    users: { treeData, devices },
  } = useStores()

  const [expandedKeys, setExpandedKeys] = useState(['0'])
  const [checkedKeys, setCheckedKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue, info) => {
    setCheckedKeys(checkedKeysValue)
    const turned = turnNodes(info.checkedNodes)
    userForm.setFieldsValue({
      userDervices: turned,
    })
  }

  const onSelect = (selectedKeysValue) => {
    setSelectedKeys(selectedKeysValue)
  }

  const onFinish = async () => {
    const userValues = userForm.getFieldValue()
    await users.create(userValues)
    onClose()
    callback()
  }

  const getAreaIdByDevieId = (target) => {
    let selected = ''
    devices.forEach((origin) => {
      origin.devices.forEach((device) => {
        if (device.id === target) {
          selected = origin.areaId
        }
      })
    })
    return selected
  }
  const turnNodes = (checkedNodes) => {
    let turned = []
    checkedNodes.forEach((item) => {
      if (!item.children) {
        turned.push({
          areaId: getAreaIdByDevieId(item.key),
          deviceId: item.key,
        })
      }
    })
    return turned
  }
  return (
    <DrawerContainer
      width={250}
      placement="right"
      forceRender={true}
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <SubTitle>新增用户</SubTitle>
      <Form {...layout} form={userForm} onFinish={onFinish}>
        <Form.Item
          name="role"
          label="角色"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select placeholder="请选择角色">
            {ROLE_OPTIONS.map((role) => (
              <Option key={role.value} value={role.value}>
                {role.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="姓名" />
        </Form.Item>
        <Form.Item
          name="loginName"
          label="用户名"
          rules={[
            { required: true, message: '请输入用户名' },
            {
              pattern: new RegExp(/^[0-9a-zA-Z]{1,}$/, 'g'),
              message: '用户名只能包含数字及英文',
            },
          ]}
        >
          <Input placeholder="工号" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="电话"
          rules={[{ required: true, message: '请输入电话' }]}
        >
          <Input placeholder="电话" />
        </Form.Item>
        <Tip>
          <label>*</label>
          注：初始密码为<span>工号+手机后四位</span>
        </Tip>
        <Form.Item label="现场照">
          <img src={doctorPhote} alt="" />
        </Form.Item>
        <SubmitWrapper>
          <SubmitBtn htmlType="submit" type="primary" size="middle">
            提交
          </SubmitBtn>
        </SubmitWrapper>
      </Form>
      <CheckboxContainer>
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeData}
        />
      </CheckboxContainer>
    </DrawerContainer>
  )
}

const SubTitle = styled.div`
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-bottom: 20px;
  border-bottom: 3px solid #5f89ff;
  width: fit-content;
`
const Tip = styled.div`
  margin-bottom: 10px;
  transform: scale(0.83, 0.83);
  margin-left: 17px;
  label {
    color: red;
  }
  span {
    color: #ff8d56;
  }
`
const DrawerContainer = styled(Drawer)`
  .ant-drawer-body {
    padding: 18px 18px 32px 18px;
  }
  .ant-form-item {
    margin-bottom: 10px;
  }
`

const CheckboxContainer = styled.div``

const SubmitWrapper = styled.div`
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 250px;
  margin-right: 20px;
  text-align: center;
  right: -20px;
  z-index: 999;
`

const SubmitBtn = styled(Button)`
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
