import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { getCurrentDate } from '@/app/utils/common'

const useToday = () => {
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    updateCurrentDate()
  }, [])

  const updateCurrentDate = () => {
    setInterval(() => {
      setCurrentDate(getCurrentDate())
    }, 1000)
  }

  return <CurrentDateWrapper>{currentDate}</CurrentDateWrapper>
}

export default useToday

const CurrentDateWrapper = styled.span`
  color: white;
`
