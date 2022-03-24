import React from 'react'
import { Empty } from 'antd'
import Title from './Title'
import styled from '@emotion/styled'
import useStores from '@/app/hooks/useStores'
import moment from 'moment'

const CollectionRecord = ({ records, cb }) => {
  const { collection } = useStores()
  return (
    <RecordCount>
      <Title name="采集记录" />
      {!records.length && (
        <EmptyWrapper>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </EmptyWrapper>
      )}
      <Containers>
        {records.length > 0 &&
          records.map((record, index) => (
            <div key={index}>
              <CircleTitle onClick={() => cb(record)}>
                <Circle />
                <span>{record.artWay}</span>
                <span>{moment(record.createTime).format('YYYY-MM-DD')}</span>
              </CircleTitle>
              <Certificates>
                <span>照片:</span>
                <span>2</span>
                <Photo>
                  <PhotoCircle />
                  <span>女方证件照</span>
                  <span>1</span>
                </Photo>
                <Photo>
                  <PhotoCircle />
                  <span>男方证件照</span>
                  <span>1</span>
                </Photo>
              </Certificates>
              {/* <Certificates>
              <span>证照:</span>
              <span>{item.idTotal}</span>
              {item.id &&
                item.id.map((itemp) => (
                  <Photo key={itemp.type}>
                    <PhotoCircle />
                    <span>{itemp.type}</span>
                    <span>{itemp.num}</span>
                  </Photo>
                ))}
            </Certificates> */}
            </div>
          ))}
      </Containers>
    </RecordCount>
  )
}
export default CollectionRecord

const RecordCount = styled.div``

const Circle = styled.div`
  width: 10px;
  height: 10px;
  background: rgba(95, 137, 255, 0.2);
  border: 1px solid #5f89ff;
  margin-right: 4px;
  border-radius: 50%;
`
const CircleTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  cursor: pointer;
  > span {
    color: #5f89ff;
    font-weight: 500;
    font-size: 14px;
    margin-right: 8px;
  }
`
const PhotoCircle = styled.div`
  width: 8px;
  height: 8px;
  border: 1px solid #a8a8a8;
  border-radius: 50%;
`
const Photo = styled.div`
  display: flex;
  align-items: center;
  color: #a8a8a8;
  > span {
    margin: 4px 8px;
  }
`
const Certificates = styled.div`
  margin: 0px 14px;
  > span {
    display: inline-block;
    margin: 5px 10px 5px 0px;
  }
`
const Containers = styled.div`
  overflow: auto;
`
const EmptyWrapper = styled.div`
  margin-top: 100px;
`
