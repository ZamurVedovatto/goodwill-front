import React, { useState, useContext, useEffect } from 'react'
import { Grid, Image, Container, Menu, Segment, Button, Form, Input, Confirm, Icon } from 'semantic-ui-react'
import { AuthContext } from './../context/auth'
import bgImg from './../assets/bg.png'
import DeleteUserButton from '../components/DeleteUserButton'

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
    // props.history.push('/')
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
                </Menu>
              </Grid.Column>

              <Grid.Column width={12}>
                {
                  loading && (
                    <Segment loading>
                      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Segment>
                  )
                }

                {
                  activeItem === 'edit profile' && (
                    <Segment>
                      <Grid columns="1">
                        <Grid.Row>
                          <Grid.Column width={16}>
                            {user.username}
                          </ Grid.Column>

                          <Grid.Column width={16}>
                            <Form>
                              <Form.Field inline>
                                <label>username</label>
                                <Input placeholder={user.username} />
                              </Form.Field>
                              <Form.Field inline>
                                <label>name</label>
                                <Input placeholder='name' />
                              </Form.Field>
                              <Form.Field inline>
                                <label>email</label>
                                <Input placeholder={user.email} readOnly />
                              </Form.Field>
                              <Form.Field>
                                <Button>Submit</Button>
                              </Form.Field>
                            </Form>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Segment>
                        <DeleteUserButton userId={user.id} callback={deleteUserCallback} />
                      </Segment>
                    </Segment>
                  )
                }

                {
                  activeItem === 'change password' && (
                    <Segment circular floated='right'>
                      change password
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