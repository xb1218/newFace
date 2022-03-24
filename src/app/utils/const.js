import moment from 'moment'

export const ENTRANCE_APPS = ['collection', 'schedule', 'device', 'users']

// 日程表搜索条件
export const SEARCH_ITEM = ['取卵', 'IVF', 'FET', 'AIH', 'AID', '采集']
// 日程表日志
export const JOURNAL_DATA = [
  {
    title: 'AID',
    color: '#E8684A',
  },
  {
    title: 'AIH',
    color: '#F6BD16',
  },
  {
    title: '取卵',
    color: '#5B8FF9',
  },
  {
    title: 'ET',
    color: '#5AD8A6',
  },
  {
    title: 'FET',
    color: '#5D7092',
  },
]

export const ROLE_OPTIONS = [
  { label: '医生', value: 'doctor' },
  { label: '护士', value: 'nurse' },
  { label: '实习生', value: 'intern' },
]

export const USER_ROLE_MAP = new Map([
  ['doctor', '医生'],
  ['nurse', '护士'],
  ['intern', '实习生'],
])

export const ART_OPTIONS = [
  { label: 'IVF', value: 'IVF' },
  { label: 'FET', value: 'FET' },
  { label: 'AIH', value: 'AIH' },
  { label: 'AID', value: 'AID' },
]

export const TRANSMIT_DATA_OPTIONS = [
  { label: '限女方', value: '限女方' },
  { label: '限男方', value: '限男方' },
]

export const FREQUENCY_OPTIONS = [
  { label: '每天', value: '每天' },
  { label: '隔天', value: '隔天' },
  { label: '每个工作日', value: '每个工作日' },
  { label: '每个周末', value: '每个周末' },
]

export const COLLECTION_CARD_OPTIONS = [
  { label: '护照', value: '护照' },
  { label: '军官证', value: '军官证' },
  { label: '港澳通行证', value: '港澳通行证' },
]

export const COLLECTION_INFO_CLEAR = {
  femaleName: '',
  femaleNation: '',
  femaleCardAddress: '',
  femalePhone: '',
  femaleHomtel: '',
  femaleAddress: '',
  femaleIdCard: '',
  femaleCardType: '',
  femaleCardNumber: '',
  femaleIdCardExpiry: '',
  femaleCardExpiry: '',
  femaleBirthdate: '',
  maleName: '',
  maleNation: '',
  maleCardAddress: '',
  malePhone: '',
  maleHomtel: '',
  maleAddress: '',
  maleIdCard: '',
  maleCardType: '',
  maleCardNumber: '',
  maleIdCardExpiry: '',
  maleCardExpiry: '',
  maleBirthdate: '',
  medicalRecordNo: '',
  artWay: '',
  buildDate: moment(new Date(), 'YYYY-MM-DD'),
}

export const SEARCH_OPTIONS = [
  {
    label: '姓名',
    value: 'name',
  },
  {
    label: '手机号',
    value: 'phone',
  },
  {
    label: '证件号',
    value: 'idCard',
  },
  {
    label: '病历号',
    value: 'medicalRecordNo',
  },
]

export const UPDATE_MODAL_COLUMNS = new Map([
  [
    'male',
    [
      {
        title: '姓名',
        dataIndex: 'maleName',
      },
      {
        title: '证件号',
        dataIndex: 'maleIdCard',
      },
      {
        title: '电话',
        dataIndex: 'malePhone',
      },
    ],
  ],
  [
    'female',
    [
      {
        title: '姓名',
        dataIndex: 'femaleName',
      },
      {
        title: '证件号',
        dataIndex: 'femaleIdCard',
      },
      {
        title: '电话',
        dataIndex: 'femalePhone',
      },
    ],
  ],
])

export const FEMALE_MESSAGE_DTO_INIT = {
  femaleName: null,
  femaleNation: null,
  femaleIdCard: null,
  femaleCardAddress: null,
  femaleCardNumber: null,
  femalePhone: null,
  femaleHomtel: null,
  femaleAddress: null,
}

export const MALE_MESSAGE_DTO_INIT = {
  maleName: null,
  maleNation: null,
  maleIdCard: null,
  maleCardAddress: null,
  maleCardNumber: null,
  malePhone: null,
  maleHomtel: null,
  maleAddress: null,
}

export const PHOTO_TITLE_MAP = new Map([
  ['female', '女方'],
  ['male', '男方'],
  ['all', '双方'],
])

export const SEX_MAP = new Map([
  ['famale', '女'],
  ['male', '男'],
])
