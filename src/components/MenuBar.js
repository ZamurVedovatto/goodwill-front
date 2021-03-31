import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Menu, Dropdown, Modal } from 'semantic-ui-react'
import { AuthContext } from './../context/auth'

import SearchStandard from './../components/SearchStandard'
import SendMessage from './General/SendMessage'

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substring(1)
  const [activeItem, setActiveItem] = useState(path)
  const [open, setOpen] = React.useState(false)


  const handleItemClick = (e, { name }) => {
    console.log(name)
    setActiveItem(name)
  }

  const menuBar = user ? (
    <div className="content-wrapper">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        closeOnEscape={false}
      >
        <SendMessage open={open} setOpen={setOpen} />
      </Modal>
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
            <Menu.Item
              icon="send"
              name="Enviar Mensagem"
              active={activeItem === 'Enviar Mensagem'}
              onClick={() => setOpen(true)}
            />
          </Menu.Menu>
          <Menu.Menu style={{ margin: "0 auto"}}>
            <Menu.Item>
              <SearchStandard />
            </Menu.Item>
          </Menu.Menu>
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