import { useEffect } from 'react'
import { Drawer, Form, Input, Radio, Button } from 'antd'
import styled from '@emotion/styled'
import useStores from '../../../hooks/useStores'

export default function AddDeviceDrawer({ visible, onClose, callback }) {
  const layout = { labelCol: { span: 8 } }
  const [deviceForm] = Form.useForm()
  const {
    device: { update, detail },
  } = useStores()

  useEffect(() => {
    deviceForm.setFieldsValue({
      deviceNo: detail.deviceNo,
      ip: detail.ip,
      area: detail.area,
      position: detail.position,
      deviceType: detail.deviceType,
      macAddress: detail.macAddress,
    })
  }, [detail])

  const onFinish = async () => {
    const deviceValues = deviceForm.getFieldValue()
    await update(detail.id, deviceValues)
    onClose()
    callback()
  }

  return (
    <DrawerContainer
      width={240}
      placement="right"
      forceRender={true}
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <SubTitle>修改设备</SubTitle>
      <Form {...layout} form={deviceForm} onFinish={onFinish}>
        <Form.Item
          name="deviceNo"
          label="编号"
          rules={[{ required: true, message: '请输入编号' }]}
        >
          <Input placeholder="请输入编号" />
        </Form.Item>
        <Form.Item
          name="ip"
          label="IP地址"
          rules={[{ required: true, message: '请输入IP地址' }]}
        >
          <Input placeholder="请输入IP地址" />
        </Form.Item>
        <Form.Item
          name="area"
          label="区域"
          rules={[{ required: true, message: '请输入区域' }]}
        >
          <Input placeholder="请输入区域" />
        </Form.Item>
        <Form.Item
          name="position"
          label="位置"
          rules={[{ required: true, message: '请输入位置' }]}
        >
          <Input placeholder="请输入位置" />
        </Form.Item>
        <Form.Item
          name="deviceType"
          label="功能"
          rules={[{ required: true, message: '请选择功能' }]}
        >
          <Radio.Group>
            <Radio value="验证">验证</Radio>
            <Radio value="采集">采集</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="macAddress" label="MAC地址">
          <Input placeholder="请输入MAC地址" />
        </Form.Item>
        <SubmitBtn htmlType="submit" type="primary" size="middle">
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
  margin-bottom: 20px;
  border-bottom: 3px solid #5f89ff;
  width: fit-content;
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
