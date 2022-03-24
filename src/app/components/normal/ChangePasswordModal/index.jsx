import React from 'react'
import { Form, Row, Button, Input, message } from 'antd'
import BasicModal from '../BasicModal'
import useStores from '../../../hooks/useStores'

function ChangePasswordModal({ cancel }) {
  const layout = { labelCol: { span: 4 } }
  const [passwordForm] = Form.useForm()
  const { auth } = useStores()

  const onSubmit = async () => {
    const passwordValues = passwordForm.getFieldValue()
    if (passwordValues.firstPassword !== passwordValues.secondPassword) {
      return message.error('两次输入的新密码不一致，请重新输入')
    }
    if (
      passwordValues.firstPassword.trim() === '' ||
      passwordValues.secondPassword.trim() === ''
    ) {
      return message.error('新密码不能为空')
    }
    await auth.change_password(passwordValues)
    cancel()
  }

  const footer = [
    <Row key="confirm" type="flex" justify="center" align="middle">
      <Button onClick={onSubmit} type="primary">
        确定
      </Button>
    </Row>,
  ]

  return (
    <BasicModal
      title="修改密码"
      visible={true}
      footer={footer}
      onCancel={() => cancel()}
    >
      <Form {...layout} form={passwordForm}>
        <Form.Item label="旧密码" name="originalPassword">
          <Input.Password placeholder="请输入旧密码" />
        </Form.Item>
        <Form.Item label="新密码" name="firstPassword">
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item label="确认新密码" name="secondPassword">
          <Input.Password placeholder="请确认新密码" />
        </Form.Item>
      </Form>
    </BasicModal>
  )
}

export default ChangePasswordModal
