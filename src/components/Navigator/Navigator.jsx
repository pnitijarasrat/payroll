import { Link, useLocation } from "react-router-dom"
import './Navigator.css'
import {
    HomeOutlined,
    ClockCircleOutlined,
    MoneyCollectOutlined,
    TeamOutlined,
    SnippetsOutlined,
    CalendarOutlined,
    SettingOutlined
} from '@ant-design/icons';

const linkArr = [
    {
        name: "Dashboard",
        path: '/',
        icon: <HomeOutlined />
    },
    {
        name: "Employee",
        path: '/employee',
        icon: <TeamOutlined />
    },
    {
        name: "Attendance",
        path: '/attendance',
        icon: <ClockCircleOutlined />
    },
    {
        name: "Salary",
        path: '/salary',
        icon: <MoneyCollectOutlined />
    },

    {
        name: "Create Document",
        path: '/create-document',
        icon: <SnippetsOutlined />
    },
    {
        name: "Year-End Document",
        path: '/year-end',
        icon: <CalendarOutlined />
    },
    {
        name: "Setting",
        path: '/setting',
        icon: <SettingOutlined />
    },
]

const Navigator = () => {
    const location = useLocation()

    return (
        <nav className="nav">
            <ul>
                {
                    linkArr.map((link) => (
                        <Link to={link.path} key={link.name}>
                            <li className={location.pathname === link.path ? 'nav-selected' : ''}>
                                {link.icon}
                                {link.name}
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Navigator