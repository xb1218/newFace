import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import {
  Divider,
  Row,
  Button,
  Form,
  Col,
  Input,
  Select,
  DatePicker,
  Tabs,
  Space,
  Drawer,
  message,
  Modal,
} from 'antd'
import useStores from '@/app/hooks/useStores'
import {
  ART_OPTIONS,
  COLLECTION_INFO_CLEAR,
  COLLECTION_CARD_OPTIONS,
  FEMALE_MESSAGE_DTO_INIT,
  MALE_MESSAGE_DTO_INIT,
} from '@/app/utils/const'
import {
  isRequestEmpty,
  getIDValidity,
  removeChinese,
} from '../../utils/common'
import NationSelector from '@/app/components/normal/NationSelector'
import styled from '@emotion/styled'
import BeforeAskModal from '@/app/components/normal/BeforeAskModal'
import { PlusOutlined } from '@ant-design/icons'
import clearIcon from '@/app/assets/image/clear-icon.png'
import registerIcon from '@/app/assets/image/register-icon.png'
import addIcon from '@/app/assets/image/add-icon.png'
import deleteIcon from '@/app/assets/image/delete-icon.png'
import CollectionIcon from '@/app/assets/image/icon-collection.png'
import { useAntdTable } from '@/app/hooks/useAntdTable'
import UpdateMateModal from './containers/UpdateMateModal'
import DocumentCollection from './containers/DocumentCollection'
import CollectionRecord from './containers/CollectionRecord'
import PhotoCollection from './containers/PhotoCollection'
import { useCallbackPrompt } from '../../hooks/useCallbackPrompt'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import './collection.scss'

const { Option } = Select

const Collection = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog)
  const [isVisible, setIsVisible] = useState(false)
  const [beforeAskVisible, setBeforeAskVisible] = useState(false)
  const [femaleCardRows, setFemaleCardRows] = useState(false)
  const [maleCardRows, setMaleCardRows] = useState(false)
  const [checkShow, setCheckShow] = useState(0) // 0代表照片，1代表信息采集
  const [gender, setGender] = useState(null)
  const [recordShow, setRecordShow] = useState(false)
  const [maleDailyPhoto, setMaleDailyPhoto] = useState(null)
  const [femaleDailyPhoto, setFemaleDailyPhoto] = useState(null)
  const [maleIDPhoto, setMaleIDPhoto] = useState(null)
  const [femaleIDPhoto, setFemaleIDPhoto] = useState(null)

  // const [recordData, setRecordData] = useState([
  //   {
  //     title: 'IVF',
  //     date: '2022-02-11',
  //     piciureTotal: 1,
  //     idTotal: 3,
  //     picture: [{ type: '女方证件照', num: 1 }],
  //     id: [
  //       { type: '女方证件照', num: 1 },
  //       { type: '男方证件照', num: 1 },
  //       { type: '女方现场照', num: 1 },
  //     ],
  //   },
  //   {
  //     title: 'FET',
  //     date: '2022-02-11',
  //     piciureTotal: 0,
  //     idTotal: 0,
  //     picture: [],
  //     id: [],
  //   },
  // ])

  const {
    collection,
    collection: { coupleData, records },
  } = useStores()

  const {
    tableProps,
    run,
    pagination,
    pagination: { current },
  } = useAntdTable(
    '/couple/name',
    {
      manual: true,
    },
    'post'
  )

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      buildDate: !form.getFieldsValue().buildDate
        ? moment(new Date(), 'YYYY-MM-DD')
        : moment(form.getFieldsValue().buildDate, 'YYYY-MM-DD'),
      femaleCardType: !form.getFieldsValue().femaleCardType
        ? '护照'
        : form.getFieldsValue().femaleCardType,
      maleCardType: !form.getFieldsValue().maleCardType
        ? '护照'
        : form.getFieldsValue().maleCardType,
    })
    coupleData.coupleId && showCouple(coupleData)
  }, [coupleData])

  const formatCoupleDate = (gender, arr) => {
    let obj = {}
    arr.forEach(
      (item) =>
        (obj[item] = coupleData[`${gender}MessageDto`][item]
          ? moment(coupleData[`${gender}MessageDto`][item], 'YYYY-MM-DD')
          : '')
    )
    return obj
  }

  //将搜索的患者信息进行显示
  const showCouple = (coupleData) => {
    form.setFieldsValue({
      ...coupleData.femaleMessageDto,
      ...coupleData.maleMessageDto,
      ...formatCoupleDate('female', [
        'femaleCardExpiry',
        'femaleIdCardExpiry',
        'femaleBirthdate',
      ]),
      ...formatCoupleDate('male', [
        'maleCardExpiry',
        'maleIdCardExpiry',
        'maleBirthdate',
      ]),
      buildDate: coupleData.buildDate
        ? moment(coupleData.buildDate, 'YYYY-MM-DD')
        : '',
      medicalRecordNo: coupleData.medicalRecordNo,
      artWay: coupleData.artWay,
    })
    setMaleCardRows(coupleData.maleMessageDto.maleCardNumber ? true : false)
    setFemaleCardRows(
      coupleData.femaleMessageDto.femaleCardNumber ? true : false
    )
  }

  const clearCoupleInfo = async (gender) => {
    if (gender === 'female') {
      coupleData.femaleMessageDto = {
        ...[FEMALE_MESSAGE_DTO_INIT],
      }
    } else {
      coupleData.maleMessageDto = {
        ...MALE_MESSAGE_DTO_INIT,
      }
    }
    await form.setFieldsValue(
      gender === 'female' ? FEMALE_MESSAGE_DTO_INIT : MALE_MESSAGE_DTO_INIT
    )
    setIsVisible(false)
  }

  const comfirmCb = (data, gender) => {
    if (gender === 'female') {
      form.setFieldsValue({
        ...data.femaleMessageDto,
        ...formatCoupleDate('female', [
          'femaleCardExpiry',
          'femaleIdCardExpiry',
          'femaleBirthdate',
        ]),
      })
      setFemaleCardRows(
        coupleData.femaleMessageDto.femaleCardNumber ? true : false
      )
    } else {
      form.setFieldsValue({
        ...data.maleMessageDto,
        ...formatCoupleDate('male', [
          'maleCardExpiry',
          'maleIdCardExpiry',
          'maleBirthdate',
        ]),
      })
      setMaleCardRows(coupleData.maleMessageDto.maleCardNumber ? true : false)
    }
    setIsVisible(false)
  }

  const showModal = async (gender) => {
    if (!coupleData.coupleId) return message.warning('请填写信息')
    await run(
      { current: 1, pageSize: 10 },
      {
        [`${gender}QueryDto`]: {
          [`${gender}Name`]: '',
        },
      }
    )
    await setGender(gender)
    setIsVisible(true)
  }

  const closeModal = () => {
    setIsVisible(false)
  }

  const formatSubmitDate = (collectionFormdata, arr) => {
    let obj = {}
    arr.forEach(
      (item) =>
        (obj[item] = collectionFormdata[item]
          ? collectionFormdata[item].format('YYYY-MM-DD')
          : '')
    )
    return obj
  }

  const onFinish = async () => {
    const collectionFormdata = form.getFieldsValue()
    if (
      isRequestEmpty(collectionFormdata.femaleName) ||
      isRequestEmpty(collectionFormdata.maleName)
    ) {
      return message.error('姓名为必填项')
    }
    if (
      (isRequestEmpty(collectionFormdata.femaleIdCard) &&
        (isRequestEmpty(collectionFormdata.femaleCardNumber) ||
          isRequestEmpty(collectionFormdata.femaleCardType))) ||
      (isRequestEmpty(collectionFormdata.maleIdCard) &&
        (isRequestEmpty(collectionFormdata.maleCardNumber) ||
          isRequestEmpty(collectionFormdata.maleCardType)))
    ) {
      return message.error('身份证号(证件号及类型)为必填项')
    }

    const submitValues = {
      ...collectionFormdata,
      ...formatSubmitDate(collectionFormdata, [
        'buildDate',
        'femaleIdCardExpiry',
        'femaleCardExpiry',
        'femaleBirthdate',
        'maleIdCardExpiry',
        'maleCardExpiry',
        'maleBirthdate',
      ]),

      // maleSpotImage: maleDailyPhoto,
      // femaleSpotImage: femaleDailyPhoto,
      // maleIdCardImage: maleIDPhoto,
      // femaleIdCardImage: femaleIDPhoto,
    }
    if (coupleData.coupleId) {
      const { femaleName, femaleIdCard, femaleCardNumber } =
        coupleData.femaleMessageDto
      const { maleName, maleIdCard, maleCardNumber } = coupleData.maleMessageDto
      if (
        (coupleData.coupleId &&
          ((femaleIdCard !== collectionFormdata.femaleIdCard &&
            femaleName === collectionFormdata.femaleName) ||
            (maleIdCard !== collectionFormdata.maleIdCard &&
              maleName === collectionFormdata.maleName))) ||
        (femaleCardNumber != collectionFormdata.femaleCardNumber &&
          femaleName === collectionFormdata.femaleName) ||
        (maleCardNumber != collectionFormdata.maleCardNumber &&
          maleName === collectionFormdata.maleName)
      ) {
        // 修改证件号操作
        await collection.updateCard(
          coupleData.coupleId,
          coupleData.id,
          submitValues
        )
        setFemaleCardRows(false)
        setMaleCardRows(false)
        reset()
        setShowDialog(false)
        return
      }
    }

    const res = await collection.beforeSubmit({
      femaleIdCard: collectionFormdata.femaleIdCard,
      femaleCardNumber: collectionFormdata.femaleCardNumber,
      maleIdCard: collectionFormdata.maleIdCard,
      maleCardNumber: collectionFormdata.maleCardNumber,
      collectionRecordId: coupleData.id ? coupleData.id : '',
      buildDate: collectionFormdata['buildDate']
        ? collectionFormdata['buildDate'].format('YYYY-MM-DD')
        : '',
    })

    if (res.tag === 'save') {
      await collection.create(submitValues)
      await collection.clearCoupleData()
      setFemaleCardRows(false)
      setMaleCardRows(false)
      reset()
      setShowDialog(false)
    } else if (res.tag === 'update') {
      await collection.update(submitValues)
      await collection.clearCoupleData()
      setFemaleCardRows(false)
      setMaleCardRows(false)
      reset()
      setShowDialog(false)
    } else {
      setBeforeAskVisible(true)
    }
  }

  const handleBeforeAsk = async (type) => {
    const collectionFormdata = form.getFieldsValue()
    if (
      isRequestEmpty(collectionFormdata.femaleName) ||
      isRequestEmpty(collectionFormdata.maleName)
    ) {
      return message.error('姓名为必填项')
    }

    if (
      (isRequestEmpty(collectionFormdata.femaleIdCard) &&
        (isRequestEmpty(collectionFormdata.femaleCardNumber) ||
          isRequestEmpty(collectionFormdata.femaleCardType))) ||
      (isRequestEmpty(collectionFormdata.maleIdCard) &&
        (isRequestEmpty(collectionFormdata.maleCardNumber) ||
          isRequestEmpty(collectionFormdata.maleCardType)))
    ) {
      return message.error('身份证号(证件号及类型)为必填项')
    }

    const submitValues = {
      ...collectionFormdata,
      ...formatSubmitDate(collectionFormdata, [
        'buildDate',
        'femaleIdCardExpiry',
        'femaleCardExpiry',
        'femaleBirthdate',
        'maleIdCardExpiry',
        'maleCardExpiry',
        'maleBirthdate',
      ]),
    }
    if (type === 'save') {
      await collection.create(submitValues)
      await collection.clearCoupleData()
      reset()
      setFemaleCardRows(false)
      setMaleCardRows(false)
      setBeforeAskVisible(false)
      setShowDialog(false)
    } else {
      await collection.update(submitValues)
      await collection.clearCoupleData()
      reset()
      setFemaleCardRows(false)
      setMaleCardRows(false)
      setBeforeAskVisible(false)
      setShowDialog(false)
    }
  }

  const reset = () => {
    collection.coupleData = {}
    form.setFieldsValue(COLLECTION_INFO_CLEAR)
  }

  const disabledDate = (current) => {
    return current && current > moment().endOf('day')
  }

  const deleteFameleRows = () => {
    form.setFieldsValue({
      femaleCardType: '',
      femaleCardNumber: '',
      femaleCardExpiry: '',
    })
    setFemaleCardRows(false)
  }

  const deleteMaleRows = () => {
    form.setFieldsValue({
      maleCardType: '',
      maleCardNumber: '',
      maleCardExpiry: '',
    })
    setMaleCardRows(false)
  }

  const showRecordDrawer = async () => {
    const res = await collection.getRecords(coupleData.coupleId)
    setRecordShow(true)
  }

  const onRecordClick = async (record) => {
    await collection.setCoverRecord(record)
    showCouple(coupleData)
  }

  const setPicture = (gender, data) => {
    if (gender === 'female') {
      setFemaleDailyPhoto(data.photo)
      setFemaleIDPhoto(data.identityphoto)
    } else {
      setMaleDailyPhoto(data.photo)
      setMaleIDPhoto(data.identityphoto)
    }
  }

  const setMachineIDInfo = (idInfo, gender) => {
    form.setFieldsValue({
      [`${gender}Name`]: idInfo.username,
      [`${gender}IdCard`]: idInfo.identitynumber,
      [`${gender}Nation`]: idInfo.nation,
      [`${gender}CardAddress`]: idInfo.address,
      [`${gender}Birthdate`]: removeChinese(idInfo.birthday)
        ? moment(removeChinese(idInfo.birthday), 'YYYY-MM-DD')
        : '',
      [`${gender}IdCardExpiry`]: getIDValidity(idInfo.validity)
        ? moment(getIDValidity(idInfo.validity), 'YYYY-MM-DD')
        : '',
    })
  }

  return (
    <div className="collection">
      <Modal
        width={320}
        visible={showPrompt}
        maskClosable={false}
        onOk={confirmNavigation}
        onCancel={cancelNavigation}
      >
        <Row>
          <ExclamationCircleIcon />
          页面未保存，您确定离开？
        </Row>
      </Modal>
      <Con>
        <Left>
          <Row style={{ marginBottom: '16px' }} justify="space-between">
            <AddButton type="primary" icon={<PlusOutlined />} onClick={reset}>
              新增采集
            </AddButton>
            <img
              src={clearIcon}
              alt=""
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              onClick={reset}
            />
          </Row>
          <Row type="flex" align="middle" style={{ marginBottom: '20px' }}>
            <Title>基本信息</Title>
            <div>更换：</div>
            <Gender onClick={() => showModal('male')}>男方</Gender>
            <Gender onClick={() => showModal('female')}>女方</Gender>
          </Row>
          <FormStyle
            form={form}
            onValuesChange={(changedValues, allValues) => {
              setShowDialog(true)
            }}
          >
            <div className="collectionCountForm">
              <span className="iconFormLeft">
                <svg className="gender-icon" aria-hidden="true">
                  <use xlinkHref="#icon-female" />
                </svg>
                <RegisterImg src={registerIcon} alt="" title="再次登记" />
              </span>
              <div>
                <div className="collectionRow">
                  <div className="collectionItem">
                    <Form.Item
                      name="femaleName"
                      label="姓名"
                      rules={[{ required: true, message: '请输入姓名' }]}
                    >
                      <BaseInput placeholder="" style={{ width: '80px' }} />
                    </Form.Item>
                  </div>
                  <div className="idCardRow">
                    <div className="collectionRow">
                      <div className="collectionItem">
                        <Form.Item
                          name="femaleIdCard"
                          label="身份证"
                          rules={[
                            { required: true, message: '请输入身份证号' },
                          ]}
                        >
                          <BaseInput style={{ width: 160 }} />
                        </Form.Item>
                        {!femaleCardRows && (
                          <img
                            className="imgAddiD"
                            src={addIcon}
                            alt=""
                            style={{ marginLeft: '2px' }}
                            onClick={() => setFemaleCardRows(true)}
                          />
                        )}
                      </div>
                      <div className="collectionItem">
                        <Form.Item name="femaleIdCardExpiry" label="到期日">
                          <DatePicker
                            style={{ width: '100%', height: '26px' }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    {femaleCardRows && (
                      <div className="collectionItem">
                        <div className="collectionItem">
                          <Form.Item name="femaleCardType" label="">
                            <BaseSelect
                              style={{ marginRight: '2px' }}
                              dropdownMatchSelectWidth={100}
                            >
                              {COLLECTION_CARD_OPTIONS.map((card) => (
                                <Option key={card.value} value={card.value}>
                                  {card.label}
                                </Option>
                              ))}
                            </BaseSelect>
                          </Form.Item>
                          <Form.Item name="femaleCardNumber" label="">
                            <BaseInput />
                          </Form.Item>
                          <img
                            src={deleteIcon}
                            alt=""
                            style={{ margin: '0 0 12px 2px' }}
                            onClick={() => deleteFameleRows()}
                          />
                        </div>
                        <div className="collectionItem">
                          <Form.Item name="femaleIdCardExpiry" label="到期日">
                            <DatePicker
                              style={{ width: '100%', height: '26px' }}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="collectionItem">
                    <Form.Item name="femaleBirthdate" label="出生">
                      <DatePicker style={{ width: '100%', height: '26px' }} />
                    </Form.Item>
                  </div>
                </div>
                <div className="collectionRow">
                  <Form.Item
                    className="collectionItem"
                    name="femaleNation"
                    label="民族"
                  >
                    <NationSelector style={{ width: '80px' }} />
                  </Form.Item>
                  <Form.Item
                    className="collectionItemFlex"
                    name="femaleCardAddress"
                    label="证件地址"
                  >
                    <BaseInput />
                  </Form.Item>
                </div>
                <div className="collectionRow">
                  <Form.Item
                    className="collectionItem"
                    name="femalePhone"
                    label="电话"
                  >
                    <BaseInput />
                  </Form.Item>
                  <Form.Item
                    className="collectionItem"
                    name="femaleHomtel"
                    label="住宅电话"
                  >
                    <BaseInput />
                  </Form.Item>
                </div>
                <div className="collectionRow">
                  <Form.Item
                    className="collectionItemFlex"
                    name="femaleAddress"
                    label="现住址"
                  >
                    <BaseInput />
                  </Form.Item>
                </div>
              </div>
            </div>
            <StyleDivider dashed />
            <div className="collectionCountForm">
              <span className="iconFormLeft">
                <svg className="gender-icon" aria-hidden="true">
                  <use xlinkHref="#icon-male" />
                </svg>
                <RegisterImg src={registerIcon} alt="" title="再次登记" />
              </span>
              <div>
                <div className="collectionRow">
                  <div className="collectionItem">
                    <Form.Item
                      name="maleName"
                      label="姓名"
                      style={{ width: '100%' }}
                      rules={[{ required: true, message: '请输入姓名' }]}
                    >
                      <BaseInput placeholder="" style={{ width: '80px' }} />
                    </Form.Item>
                  </div>
                  <div className="idCardRow">
                    <div className="collectionRow">
                      <div className="collectionItem">
                        <Form.Item
                          name="maleIdCard"
                          label="身份证"
                          rules={[
                            { required: true, message: '请输入身份证号' },
                          ]}
                        >
                          <BaseInput style={{ width: 160 }} />
                        </Form.Item>
                        {!maleCardRows && (
                          <img
                            className="imgAddiD"
                            src={addIcon}
                            alt=""
                            style={{ marginLeft: '2px' }}
                            onClick={() => setMaleCardRows(true)}
                          />
                        )}
                      </div>
                      <div className="collectionItem">
                        <Form.Item name="maleIdCardExpiry" label="到期日">
                          <DatePicker
                            style={{ width: '100%', height: '26px' }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    {maleCardRows && (
                      <div className="collectionItem">
                        <div className="collectionItem">
                          <Form.Item name="femaleCardType" label="">
                            <BaseSelect
                              style={{ marginRight: '2px' }}
                              dropdownMatchSelectWidth={100}
                            >
                              {COLLECTION_CARD_OPTIONS.map((card) => (
                                <Option key={card.value} value={card.value}>
                                  {card.label}
                                </Option>
                              ))}
                            </BaseSelect>
                          </Form.Item>
                          <Form.Item name="maleCardNumber" label="">
                            <BaseInput />
                          </Form.Item>
                          <img
                            src={deleteIcon}
                            alt=""
                            style={{ margin: '0 0 12px 2px' }}
                            onClick={() => deleteMaleRows()}
                          />
                        </div>
                        <div className="collectionItem">
                          <Form.Item name="maleIdCardExpiry" label="到期日">
                            <DatePicker
                              style={{ width: '100%', height: '26px' }}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="collectionItem">
                    <Form.Item name="maleBirthdate" label="出生">
                      <DatePicker style={{ width: '100%', height: '26px' }} />
                    </Form.Item>
                  </div>
                </div>
                <div className="collectionRow">
                  <Form.Item
                    className="collectionItem"
                    name="maleNation"
                    label="民族"
                  >
                    <NationSelector style={{ width: '80px' }} />
                  </Form.Item>
                  <Form.Item
                    className="collectionItemFlex"
                    name="maleCardAddress"
                    label="证件地址"
                  >
                    <BaseInput />
                  </Form.Item>
                </div>
                <div className="collectionRow">
                  <Form.Item
                    className="collectionItem"
                    name="malePhone"
                    label="电话"
                  >
                    <BaseInput />
                  </Form.Item>
                  <Form.Item
                    className="collectionItem"
                    name="maleHomtel"
                    label="住宅电话"
                  >
                    <BaseInput />
                  </Form.Item>
                </div>
                <div className="collectionRow">
                  <Form.Item
                    className="collectionItemFlex"
                    name="maleAddress"
                    label="现住址"
                  >
                    <BaseInput />
                  </Form.Item>
                </div>
                <StyleDivider dashed />
                <div className="collectionRowBetween">
                  <Form.Item
                    name="medicalRecordNo"
                    label="病历号"
                    className="collectionItem"
                  >
                    <BaseInput />
                  </Form.Item>
                  <Form.Item
                    className="collectionItem"
                    name="artWay"
                    label="ART方式"
                  >
                    <BaseSelect style={{ width: '88px' }}>
                      {ART_OPTIONS.map((art) => (
                        <Option key={art.value} value={art.value}>
                          {art.label}
                        </Option>
                      ))}
                    </BaseSelect>
                  </Form.Item>
                  <Form.Item
                    className="collectionItem"
                    name="buildDate"
                    label="建档日期"
                  >
                    <DatePicker
                      disabledDate={disabledDate}
                      style={{ width: '100%', height: '26px' }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </FormStyle>
        </Left>
        <Right>
          <div className="collectionTitle">
            <div className="collectionSearch">
              <Space size={30} split={<Divider type="vertical" />}>
                <div
                  onClick={() => setCheckShow(0)}
                  className={checkShow === 0 ? 'checkedTitle' : ''}
                >
                  照片
                </div>
                <div
                  onClick={() => setCheckShow(1)}
                  className={checkShow === 1 ? 'checkedTitle' : ''}
                >
                  证照采集
                </div>
              </Space>
            </div>
            <div className="collectionDaily">
              <Icon onClick={() => showRecordDrawer()}>
                <img src={CollectionIcon} alt="" />
              </Icon>
            </div>
          </div>
          <div className="collectionCount">
            {/* 照片 */}
            {checkShow === 0 && (
              <PhotoCollection
                setPicture={setPicture}
                maleIDPhoto={maleIDPhoto}
                maleDailyPhoto={maleDailyPhoto}
                femaleDailyPhoto={femaleDailyPhoto}
                femaleIDPhoto={femaleIDPhoto}
                setMachineIDInfo={setMachineIDInfo}
              />
            )}
            {/* 证照采集 */}
            {checkShow === 1 && <DocumentCollection />}
          </div>
        </Right>
        <Drawer
          width={240}
          title={false}
          placement="right"
          closable={false}
          onClose={() => setRecordShow(false)}
          visible={recordShow}
        >
          <CollectionRecord records={records} cb={onRecordClick} />
        </Drawer>
        <FooterBottom type="flex" justify="center" align="middle">
          <SubmitButton type="primary" htmlType="submit" onClick={onFinish}>
            提交
          </SubmitButton>
        </FooterBottom>
      </Con>
      {isVisible && (
        <UpdateMateModal
          gender={gender}
          isVisible={isVisible}
          closeModal={closeModal}
          comfirmCb={comfirmCb}
          tableProps={tableProps}
          pagination={pagination}
          searchRunfunc={run}
          clearCoupleInfo={clearCoupleInfo}
        />
      )}
      {beforeAskVisible && (
        <BeforeAskModal
          cancel={() => setBeforeAskVisible(false)}
          cb={handleBeforeAsk}
        />
      )}
    </div>
  )
}

export default observer(Collection)

const Con = styled.div`
  display: flex;
  height: calc(100vh - 75px);
  position: relative;
`

const Left = styled.div`
  flex: 1;
  padding: 20px;
  overflow: auto;
  padding-bottom: 70px;
  box-shadow: 0px -2px 6px 0px rgba(65, 71, 90, 0.2);
`

const Right = styled.div`
  margin-left: 2px;
  width: 360px;
`

const AddButton = styled(Button)`
  border-radius: 16px;
`

const BaseInput = styled(Input)`
  height: 26px;
`

const StyleDivider = styled(Divider)`
  &.ant-divider-horizontal {
    margin: 0 0 12px 0;
  }
`

const BaseSelect = styled(Select)`
  &.ant-select {
    height: 26px;
    .ant-select-selector {
      height: 26px !important;
      .ant-select-selection-search-input {
        height: 26px !important;
      }
      .ant-select-selection-item {
        line-height: 26px;
      }
    }
  }
`

const Title = styled.div`
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-right: 30px;
  border-bottom: 3px solid;
  border-bottom-color: #5f89ff;
`

const Gender = styled.span`
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #cccccc;
  margin-right: 12px;
  text-decoration: underline;
  cursor: pointer;
`

const FooterBottom = styled(Row)`
  position: fixed;
  bottom: 0;
  height: 52px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px -2px 6px 0px rgba(65, 71, 90, 0.2);
`

const Icon = styled.div`
  padding: 9px 14px;
  text-align: center;
  img {
    cursor: pointer;
    width: 26px;
    height: 26px;
  }
`

const SubmitButton = styled(Button)`
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

const ExclamationCircleIcon = styled(ExclamationCircleOutlined)`
  font-size: 18px;
  color: orange;
  margin-right: 10px;
`
const RegisterImg = styled.img`
  width: 20px;
  cursor: pointer;
  margin: 10px 0 5px 0;
`
const FormStyle = styled(Form)`
  .ant-form-item-label {
    overflow: auto !important;
    width: 58px !important;
  }
  div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(2),
  div:nth-of-type(3) > div > div:nth-of-type(1) > div:nth-of-type(2),
  div:nth-of-type(3) > div > div:nth-of-type(6) > div:nth-of-type(1) {
    .ant-form-item-label {
      overflow: auto !important;
      width: 58px !important;
    }
  }
  div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(2),
  div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(2),
  div:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(2),
  div:nth-of-type(3) > div > div:nth-of-type(3) > div:nth-of-type(2) {
    .ant-form-item-label {
      overflow: auto !important;
      width: 58px !important;
    }
  }
`
