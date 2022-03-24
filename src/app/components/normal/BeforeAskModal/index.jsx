import React from 'react'
import BasicModal from '@/app/components/normal/BasicModal'
import { Row, Button, Radio } from 'antd'

const BeforeAskModal = ({ cancel, cb }) => {
  const [type, setType] = React.useState('save')
  const footer = [
    <Row key="confirm" type="flex" justify="center" align="middle">
      <Button type="primary" onClick={() => onSubmit()}>
        确定
      </Button>
    </Row>,
  ]
  const onRadioChange = (e) => {
    setType(e.target.value)
  }

  const onSubmit = () => {
    cb(type)
  }

  return (
    <BasicModal
      title="温馨提示"
      width={300}
      visible={true}
      onCancel={() => cancel()}
      footer={footer}
    >
      <>
        <Row type="flex" justify="center" align="middle">
          <p style={{ marginBottom: 10 }}>基本信息发生改变，是选择</p>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Radio.Group value={type} onChange={onRadioChange}>
            <Radio value="save">新增</Radio>
            <Radio value="update">修改</Radio>
          </Radio.Group>
        </Row>
      </>
    </BasicModal>
  )
}

export default BeforeAskModal
