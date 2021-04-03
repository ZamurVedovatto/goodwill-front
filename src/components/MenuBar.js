import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Menu, Dropdown, Modal, Icon, Label } from 'semantic-ui-react'
import { AuthContext } from './../context/auth'

import SearchStandard from './../components/SearchStandard'

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substring(1)
  const [activeItem, setActiveItem] = useState(path)


  const handleItemClick = (e, { name }) => {
    console.log(name)
    setActiveItem(name)
  }

  const menuBar = user ? (
    <div className="content-wrapper">
      <div className="menu-content">
        <Menu borderless color="teal" style={{ marginBottom: "0", border: "none", boxShadow: "none", width: "100%", alignItems: "center" }}>
          <Menu.Menu>
            <Menu.Item
              icon="home"
              name="Feed"
              active={activeItem === 'Feed'}
              onClick={handleItemClick}
              as={Link}
              to="/"
            />
            <Menu.Item
              icon="building"
              name="Serviços"
              active={activeItem === 'Serviços'}
              onClick={handleItemClick}
              as={Link}
              to="/company"
            />
          </Menu.Menu>
          {/* <Menu.Menu style={{ margin: "0 auto"}}>
            <Menu.Item>
              <SearchStandard />
            </Menu.Item>
          </Menu.Menu> */}

          <Menu.Menu position='right'>
            <Menu.Item
              name="messages"
              active={activeItem === 'messages'}
              onClick={handleItemClick}
              as={Link}
              to="/messages"
            >
              <Icon name='mail' />
              <Label color='blue'>
                22
              </Label>
            </Menu.Item>
            <Menu.Item>
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
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    </div>
  ) : (
    <div className="content-wrapper">
      <div className="menu-content">
        <Menu borderless color="blue" attached="top" style={{ border: "none", boxShadow: "none" }}>
          <Menu.Item
            icon="chess queen"
            active={activeItem === 'goodwill'}
            as={Link}
            to="/"
          />
          <Menu.Menu position="right">
            <Menu.Item
              name='acessar'
              active={activeItem === 'acessar'}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name='Criar Conta'
              active={activeItem === 'Criar Conta'}
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