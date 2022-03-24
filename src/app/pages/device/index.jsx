import React, { useEffect } from 'react'
import useStores from '@/app/hooks/useStores'
import DataTable from './containers/DataTable'

function Device() {
  const { device } = useStores()
  useEffect(() => {
    device.drGroups()
  }, [])
  return <DataTable />
}

export default Device
