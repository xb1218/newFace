import React, { useEffect, useState } from 'react'
import { Row, Col, Avatar, Dropdown, Menu, Input, Select, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { delToken } from '../../../utils/token'
import { UserOutlined } from '@ant-design/icons'
import { useAntdTable } from '../../../hooks/useAntdTable'
import { SEARCH_OPTIONS } from '../../../utils/const'
import ChangePasswordModal from '../../normal/ChangePasswordModal'
import SearchMateModal from '../../normal/SearchMateModal'
import useStores from '../../../hooks/useStores'
import useToday from '../../../hooks/useToday'
import dropDownIcon from '../../../assets/image/drop-down-icon.png'
import syncIcon from '../../../assets/image/sync-icon.png'

const { Option } = Select

export default function Header({ showOperate }) {
  const navigate = useNavigate()
  const { users, auth, collection } = useStores()
  const [cgPasswordVisible, setCgPasswordVisible] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectType, setSelectType] = useState('name')

  let UserName = observer(() => (
    <span className="name">{auth.userinfo.name}</span>
  ))
  const {
    tableProps,
    run,
    pagination,
    pagination: { current },
  } = useAntdTable('/couple', {
    manual: true,
  })

  useEffect(() => {
    auth.get_userinfo()
  }, [])

  const searchCoupleUser = async () => {
    await run({ current: 1, pageSize: 10 }, { [selectType]: inputValue })
    setIsVisibleModal(true)
  }

  const menu = (
    <Menu>
      <Menu.Item key="password" onClick={() => setCgPasswordVisible(true)}>
        修改密码
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => logout()}>
        退出登录
      </Menu.Item>
    </Menu>
  )

  const logout = () => {
    delToken()
    navigate('/login')
  }
  return (
    <HeaderStyle>
      <Row className="container" align="middle" justify="space-between">
        <Col>
          <Link to="/public/collection">
            <span className="title">Face ID</span>
          </Link>
        </Col>
        <Col>
          <Row gutter={16}>
            <Row type="flex" justify="end" align="middle">
              {showOperate && (
                <>
                  <Col className="sync-wrapper">
                    <Input.Group compact>
                      <BaseSelect
                        defaultValue="姓名"
                        value={selectType}
                        onChange={(val) => setSelectType(val)}
                      >
                        {SEARCH_OPTIONS.map((item) => (
                          <Option key={item.value} value={item.value}>
                            {item.label}
                          </Option>
                        ))}
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
                  </Col>
                  <Col className="sync-wrapper">
                    <img src={syncIcon} alt="" />
                  </Col>
                </>
              )}
              <AvatarContainer
                icon={<UserOutlined style={{ color: '#5f89ff' }} />}
              />
              <UserName />
              <Dropdown overlay={menu} placement="bottomLeft">
                <DropWrapper>
                  <img src={dropDownIcon} alt="" />
                </DropWrapper>
              </Dropdown>
            </Row>
          </Row>
        </Col>
      </Row>
      {cgPasswordVisible && (
        <ChangePasswordModal cancel={() => setCgPasswordVisible(false)} />
      )}
      {isVisibleModal && (
        <SearchMateModal
          tableProps={tableProps}
          pagination={pagination}
          isVisible={isVisibleModal}
          closeModal={() => setIsVisibleModal(false)}
        />
      )}
    </HeaderStyle>
  )
}

const HeaderStyle = styled.div`
  .container {
    height: 56px;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    position: fixed;
    padding: 0 20px;
    background: white;
    background: #152a66;
    box-shadow: rgb(240, 241, 242) 0px 1px 8px;
  }

  .title {
    font-size: 30px;
    font-weight: bold;
    color: white;
  }

  .name {
    font-size: 16px;
    color: white;
    padding-right: 8px;
    cursor: pointer;
  }
  .sync-wrapper {
    margin-right: 40px;
    cursor: pointer;
  }
`

const AvatarContainer = styled(Avatar)`
  background: white;
  cursor: pointer;
  margin-right: 10px;
`

const DropWrapper = styled.div`
  padding: 0 15px;
`
const BaseSelect = styled(Select)`
  &.ant-select {
    width: 90px;
    .ant-select-selector {
      width: 90px;
      background-color: #e2e2e2;
      border-radius: 14px 0px 0px 14px !important;
    }
  }
`

const BaseInput = styled(Input)`
  &.ant-input-affix-wrapper {
    border-radius: 0px 14px 14px 0px !important;
  }
`
