import React, { useEffect } from 'react'
import useStores from '../../hooks/useStores'
import DataTable from './containers/DataTable'

export default function Users() {
  const { users } = useStores()
  useEffect(() => {
    users.getDevices()
  }, [])
  return <DataTable />
}
