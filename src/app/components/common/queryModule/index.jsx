import React from 'react'
import { DatePicker, Input, Button, Space, Form, Row, Col, Radio } from 'antd'

function QueryModule({ onSearch }) {
  const [form] = Form.useForm()

  const onFinish = (val) => {
    val.time = val.time?.format().slice(0, 10)
    val.sex = val.sex !== 0 && val.sex !== 1 ? 2 : val.sex
    onSearch(val)
  }

  return (
    <Row justify="space-between">
      <Col>
        <Form
          onFinish={onFinish}
          initialValues={{ sex: 2, cardType: 0 }}
          form={form}
        >
          <Space size={16}>
            <Form.Item name="name" label="姓名" style={{ width: 140 }}>
              <Input placeholder="姓名" allowClear />
            </Form.Item>

            <Form.Item name="sex" label="性别">
              <Radio.Group placeholder="请输入性别">
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
                <Radio value={2}>不限</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="phone" label="电话" style={{ width: 170 }}>
              <Input placeholder="请输入电话" allowClear />
            </Form.Item>

            <Form.Item name="card" label="身份证号">
              <Input placeholder="请输入身份证号" allowClear />
            </Form.Item>

            <Form.Item name="time" label="创建日期">
              <DatePicker placeholder="日期" />
            </Form.Item>
          </Space>
        </Form>
      </Col>
      <Col>
        <Space size={8}>
          <Button
            type="primary"
            onClick={() => {
              form.submit()
            }}
            size="middle"
          >
            查询
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form.resetFields()
            }}
          >
            重置
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default QueryModule
