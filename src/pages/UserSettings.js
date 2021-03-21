import React, { useState, useContext, useEffect } from 'react'
import { Grid, Image, Container, Menu, Segment, Button, Form, Input, Confirm, Icon } from 'semantic-ui-react'
import { AuthContext } from './../context/auth'
import bgImg from './../assets/bg.png'
import DeleteUserButton from '../components/DeleteUserButton'
import UserProfileForm from '../components/UserProfileForm'

export default function UserSettings() {
  const { user, logout } = useContext(AuthContext)
  const [activeItem, setActiveItem] = useState('edit profile')
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
                    name='edit profile'
                    active={activeItem === 'edit profile'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='change password'
                    active={activeItem === 'change password'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='delete account'
                    active={activeItem === 'delete account'}
                    onClick={handleItemClick}
                  />
                </Menu>
              </Grid.Column>

              <Grid.Column width={12}>
                {
                  activeItem === 'edit profile' && (
                    <Segment>
                      <UserProfileForm user={user} />
                    </Segment>
                  )
                }
                {
                  activeItem === 'change password' && (
                    <Segment>
                      change password
                    </Segment>
                  )
                }
                {
                  activeItem === 'delete account' && (
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