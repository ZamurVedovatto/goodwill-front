import React, { useContext, useState } from 'react'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
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
        <Menu borderless secondary size="massive" color="teal" style={{ marginBottom: "0" }}>
          <Menu.Menu>
            <Menu.Item
              icon="chess queen"
              active={activeItem === 'goodwill'}
              as={Link}
              to="/"
            />
          </Menu.Menu>

          <Menu.Menu style={{ margin: "0 auto"}}>
            <Menu.Item>
              <SearchStandard />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        
        <Dropdown icon='user'>
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
              to="/user"
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
      </div>
    </div>
  ) : (
    <div className="content-wrapper">
      <div className="menu-content">

        <Menu borderless secondary size="massive" color="teal">
          <Menu.Item
            icon="chess queen"
            active={activeItem === 'goodwill'}
            as={Link}
            to="/"
          />
          <Menu.Menu position='right'>
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