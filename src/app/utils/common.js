import moment from 'moment'

export const isRequestEmpty = (value) => {
  switch (toString.call(value)) {
    case '[object Null]':
      return true
    case '[object Undefined]':
      return true
    case '[object String]':
      return value.trim() === ''
    default:
      return false
  }
}

export const getType = (object) => {
  let type = typeof object
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString
    .call(object)
    .replace(/^\[object (\S+)\]$/, '$1')
}

export const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) return new Data(obj)
  if (obj.constructor === RegExp) return new RegExp(obj)
  if (hash.has(obj)) return hash.get(obj)

  let allDesc = Object.getOwnPropertyDescriptor(obj)
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  hash.set(obj, cloneObj)

  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== 'function'
        ? deepClone(obj[key], hash)
        : obj[key]
  }
  return cloneObj
}

function timePadStart(date) {
  return date.toString().padStart(2, '0')
}

export const getCurrentDate = () => {
  const day = new Date()
  const week = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  const str = `${timePadStart(day.getMonth() + 1)}月${timePadStart(
    day.getDate()
  )}日 ${week[day.getDay()]} ${timePadStart(day.getHours())}:${timePadStart(
    day.getMinutes()
  )}:${timePadStart(day.getSeconds())}`

  return str
}

export const processTreeData = (originData) => {
  let root = [{ title: '分发设备', key: '0' }]
  const child = originData.map((origin) => {
    return {
      title: origin.areaName,
      key: origin.areaId,
      children: origin.devices.map((device) => {
        return {
          title: device.deviceNo,
          key: device.id,
        }
      }),
    }
  })
  root[0].children = child
  return root
}

export const getIDValidity = (date) => {
  let reg = /([^-]+)$/
  return date ? moment(date.match(reg)[0]).format('YYYY-MM-DD') : ''
}

export const removeChinese = (date) => {
  if (date !== '' && date !== null) {
    let reg = /[\u4e00-\u9fa5]/g
    let str = date.replace(reg, '-')
    return str.substr(0, str.length - 1)
  } else {
    return ''
  }
}
