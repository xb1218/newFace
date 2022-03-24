import React, { useState } from 'react'
import { message } from 'antd'
import md5 from 'js-md5'
import styled from '@emotion/styled'
import Title from './Title'
import ShootingFrame from './ShootingFrame'
import PhotoModal from './PhotoModal'
import { PHOTO_TITLE_MAP, SEX_MAP } from '@/app/utils/const'
import female from '@/app/assets/image/photo-female.png'
import male from '@/app/assets/image/photo-male.png'
import all from '@/app/assets/image/photo-all.png'

const getCollectionPhotoIP = 'http://192.168.1.64:3639/apiv1/getidinfo'

const PhotoCollection = (props) => {
  const [isPhotoModal, setIsPhotoModal] = useState(false)
  const [gender, setGender] = useState('female')
  const {
    maleIDPhoto,
    femaleIDPhoto,
    maleDailyPhoto,
    femaleDailyPhoto,
    setPicture,
    setMachineIDInfo,
  } = props

  const config = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'text/plain',
    }),
    body: JSON.stringify({
      sign: md5('{}'),
    }),
  }

  const getCollectionPhoto = (gender) => {
    return fetch(getCollectionPhotoIP, config)
      .then((data) => data.json())
      .then((res) => {
        if (res.retcode === '0') {
          return message.warning(res.msg)
        }
        if (res.retcode === '1') {
          if (res.data.sex !== SEX_MAP.get(gender)) {
            return message.error('您采集的身份证性别有误')
          }
          setMachineIDInfo(res.data, gender)
          setPicture(gender, res.data)
        } else {
          message.error(res.msg)
        }
      })
  }

  const showModal = async (gender) => {
    await setGender(gender)
    setIsPhotoModal(true)
  }

  const closeModal = () => {
    setIsPhotoModal(false)
  }

  return (
    <div>
      <PhotoItem>
        <Title name="女方" color="#FF9898" />
        <ShootCount>
          <ShootingFrame
            title="采身份证"
            type="重采"
            src={
              femaleIDPhoto ? `data:image/jpg;base64,${femaleIDPhoto}` : female
            }
            onLayerClick={() => getCollectionPhoto('female')}
            width="110px"
            height="130px"
          />
          <ShootingFrame
            title="拍现场照"
            src={
              femaleDailyPhoto
                ? `data:image/jpg;base64,${femaleDailyPhoto}`
                : female
            }
            onLayerClick={() => showModal('female')}
            closeModal={closeModal}
            width="110px"
            height="130px"
          />
        </ShootCount>
      </PhotoItem>
      <PhotoItem>
        <Title name="男方" />
        <ShootCount>
          <ShootingFrame
            title="采身份证"
            type="重采"
            src={maleIDPhoto ? `data:image/jpg;base64,${maleIDPhoto}` : male}
            onLayerClick={() => getCollectionPhoto('male')}
            width="110px"
            height="130px"
          />
          <ShootingFrame
            title="拍现场照"
            src={
              maleDailyPhoto ? `data:image/jpg;base64,${maleDailyPhoto}` : male
            }
            onLayerClick={() => showModal('male')}
            closeModal={closeModal}
            width="110px"
            height="130px"
          />
        </ShootCount>
      </PhotoItem>
      <PhotoItem>
        <Title name="合照" />
        <ShootAll>
          <ShootingFrame
            src={all}
            onLayerClick={() => showModal('all')}
            closeModal={closeModal}
            width="160px"
            height="106px"
          />
        </ShootAll>
      </PhotoItem>
      {isPhotoModal && (
        <PhotoModal
          isVisible={isPhotoModal}
          title={`拍照-${PHOTO_TITLE_MAP.get(gender)}现场照片`}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}
export default PhotoCollection
const ShootCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const PhotoItem = styled.div`
  margin-bottom: 20px;
`
const ShootAll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
