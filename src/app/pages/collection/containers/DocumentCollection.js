import React from 'react'
import styled from '@emotion/styled'
import Title from './Title'
import ShootingFrame from './ShootingFrame'
import people from '@/app/assets/image/photo-poople.png'
import country from '@/app/assets/image/photo-country.png'
import commit from '@/app/assets/image/photo-commit.png'
import other from '@/app/assets/image/photo-other.png'
import merry from '@/app/assets/image/photo-jie.png'

const PhotoCollection = (props) => {
  return (
    <div>
      <Title name="身份证" />
      <ShootCount>
        <ShootingFrame
          title="拍人像面"
          src={people}
          width="128px"
          height="76px"
        />
        <ShootingFrame
          title="拍国徽面"
          type="重拍"
          src={country}
          width="128px"
          height="76px"
        />
      </ShootCount>
      <ShootCount>
        <ShootingFrame
          title="拍人像面"
          src={people}
          width="128px"
          height="76px"
        />
        <ShootingFrame
          title="拍国徽面"
          type="重拍"
          src={country}
          width="128px"
          height="76px"
        />
      </ShootCount>
      <Title name="结婚证" />
      <ShootCount>
        <ShootingFrame src={merry} width="128px" height="170px" />
        <ShootingFrame src={merry} width="128px" height="170px" />
      </ShootCount>
      <DocumentCount>
        <div>
          <Title name="承诺书" />
          <ShootCount>
            <ShootingFrame src={commit} width="128px" height="170px" />
          </ShootCount>
        </div>
        <div>
          <Title name="其他" />
          <ShootCount>
            <ShootingFrame src={other} width="128px" height="170px" />
          </ShootCount>
        </div>
      </DocumentCount>
    </div>
  )
}
export default PhotoCollection
const ShootCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`
const DocumentCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
