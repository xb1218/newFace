import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import collectionIcon from '@/app/assets/image/collection-icon.png'
import scheduleIcon from '@/app/assets/image/schedule-icon.png'
import deviceIcon from '@/app/assets/image/device-icon.png'
import usersIcon from '@/app/assets/image/users-icon.png'

const APP_TYPE = {
  collection: {
    name: '信息采集',
    icon: collectionIcon,
  },
  schedule: {
    name: '日程表',
    icon: scheduleIcon,
  },
  device: {
    name: '设备管理',
    icon: deviceIcon,
  },
  users: {
    name: '用户管理',
    icon: usersIcon,
  },
}

const AppCard = ({ app }) => {
  return (
    <Link to={`/public/${app}`}>
      <div className="app-card">
        <img className="app-icon" src={APP_TYPE[app].icon} alt="app" />
        <div className="app-name">{APP_TYPE[app].name}</div>
      </div>
    </Link>
  )
}

AppCard.propTypes = {
  app: PropTypes.string.isRequired,
}

export default AppCard
