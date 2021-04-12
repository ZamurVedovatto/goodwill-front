import React, { useState, useContext, useEffect } from 'react'
import { Grid, Image, Container, Menu, Segment, Button, Form, Input, Confirm, Icon } from 'semantic-ui-react'
import { AuthContext } from './../context/auth'
import bgImg from './../assets/bg.png'
import DeleteUserButton from '../components/DeleteUserButton'
import UserProfileForm from '../components/UserProfileForm'
import FormAddress from '../components/User/FormAddress'
import RegisteredAddresses from '../components/User/RegisteredAddresses'


export default function UserSettings() {
  const { user, logout } = useContext(AuthContext)
  const [activeItem, setActiveItem] = useState('editar perfil')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [activeItem])

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  function deleteUserCallback() {
    logout()
  }

  return (
    <Container>
      <Grid columns={1}>
        <Grid.Column width={16}>
          <Grid.Row className="page-title">
            {
              !user && !loading && (
                <Image src={bgImg} fluid rounded />
              )
            }
          </Grid.Row>
        </Grid.Column>
        { 
          user && (
          <Grid.Column width={16}>
            <Grid>
              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  <Menu.Item
                    name='editar perfil'
                    active={activeItem === 'editar perfil'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='endereço'
                    active={activeItem === 'endereço'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='alterar senha'
                    active={activeItem === 'alterar senha'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='remover conta'
                    active={activeItem === 'remover conta'}
                    onClick={handleItemClick}
                  />
                </Menu>
              </Grid.Column>

              <Grid.Column width={12}>
                {
                  activeItem === 'editar perfil' && (
                    <Segment>
                      <UserProfileForm user={user} />
                    </Segment>
                  )
                }
                {
                  activeItem === 'endereço' && (
                    <Segment>
                      <RegisteredAddresses user={user} />
                      <FormAddress user={user} />
                    </Segment>
                  )
                }
                {
                  activeItem === 'alterar senha' && (
                    <Segment>
                      alterar senha
                    </Segment>
                  )
                }
                {
                  activeItem === 'remover conta' && (
                    <Segment loading={loading}>
                      <DeleteUserButton userId={user.id} callback={deleteUserCallback} />
                    </Segment>
                  )
                }
              </Grid.Column>
            </Grid>
          </Grid.Column>
          )
        }
      </Grid>
    </Container>
  )
}