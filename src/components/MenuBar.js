import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Menu, Dropdown } from 'semantic-ui-react'
import { AuthContext } from './../context/auth'

import SearchStandard from './../components/SearchStandard'

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substring(1)
  const [activeItem, setActiveItem] = useState(path)
  
  const handleItemClick = (e, { name }) => setActiveItem(name)

  const menuBar = user ? (
    <div className="content-wrapper">
      <div className="menu-content">
        <Menu borderless color="teal" style={{ marginBottom: "0", border: "none" }}>
          <Menu.Menu>
            <Menu.Item
              icon="home"
              active={activeItem === 'goodwill'}
              as={Link}
              to="/"
            />
            <Menu.Item
              content="Companies"
              active={activeItem === 'company'}
              as={Link}
              to="/company"
            />
          </Menu.Menu>
          <Menu.Menu style={{ margin: "0 auto"}}>
            <Menu.Item>
              <SearchStandard />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Menu.Menu>
          <Dropdown icon="user" text={user.username}>
            <Dropdown.Menu direction="left">
              {/* <Dropdown.Header>User Settings</Dropdown.Header> */}
              <Dropdown.Item
                as={Link}
                to="/user"
              >
                Keys & Actions
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/settings"
              >
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                name='logout'
                onClick={logout}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </div>
    </div>
  ) : (
    <div className="content-wrapper">
      <div className="menu-content">
        <Menu borderless color="blue" attached="top" style={{ border: "none" }}>
          <Menu.Item
            icon="chess queen"
            active={activeItem === 'goodwill'}
            as={Link}
            to="/"
          />
          <Menu.Menu position="right">
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </Menu>
      </div>
    </div>
  )
  return menuBar
}