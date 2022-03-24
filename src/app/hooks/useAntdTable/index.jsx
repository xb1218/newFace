import useRequest from '@ahooksjs/use-request'
import http from '../../utils/http'

export function useAntdTable(toPoint, options, method) {
  // 获取data
  const getTableData = async ({ current = 1, pageSize = 10 }, formData) => {
    const params = {
      offset: current,
      limit: pageSize,
      ...formData,
    }
    const res =
      method === 'post'
        ? await http.post(toPoint, params)
        : await http.get(toPoint, params)
    return {
      total: res.data.totalCount,
      list: res.data.result,
    }
  }

  // useRequest
  const result = useRequest(getTableData, {
    paginated: true,
    ...options,
  })

  return {
    ...result, //data、error、loading、paginated
  }
}
