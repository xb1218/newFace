import React from 'react'
import Female from '@/app/assets/image/female.png'
import Male from '@/app/assets/image/male.png'
import styled from '@emotion/styled'

const AbnormalItem = (props) => {
  return (
    <div>
      <div>{props.title}</div>
      {props.children &&
        props.children.map((item, index) => (
          <PeopleItem key={props.title + index}>
            <IconAbnormal>
              <img src={Female} alt="" />
              {item.female}
            </IconAbnormal>
            <IconAbnormal>
              <img src={Male} alt="" />
              {item.male}
            </IconAbnormal>
          </PeopleItem>
        ))}
    </div>
  )
}
export default AbnormalItem

const IconAbnormal = styled.div`
  text-align: center;
  padding: 4px 20px 4px 0;
  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
`
const PeopleItem = styled.div`
  display: flex;
  align-items: center;
`
