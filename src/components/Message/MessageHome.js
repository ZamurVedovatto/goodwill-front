import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Icon, Transition, Button, Container, Menu, Segment, Image, Modal } from 'semantic-ui-react'
import { AuthContext } from './../../context/auth'
import { FETCH_USER_FOR_MESSAGE_HOME } from './../../util/graphql'
import MessageReceivedCard from './MessageReceivedCard'
import MessageSentCard from './MessageSentCard'
import MessageSend from './../General/MessageSend'
import HomeContent from '../HomeContent'
import Login from '../../pages/Login'

export default function MessageHome() {
  const { user } = useContext(AuthContext)
  const [activeItem, setActiveItem] = useState('feed')
  const [open, setOpen] = React.useState(false)
  
  useEffect(() => {
  }, [activeItem])
  
  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }
  
  const { loading, data: { getMessages: general, getUserReceivedMessages: messages, getUserSentMessages: sentMessages } = {}, refetch} = useQuery(FETCH_USER_FOR_MESSAGE_HOME, {
    variables: {
      userId: user?.id
    }
  })
  
  return (
    (
      !user ? (
        <Login />
      ) : (
        <>
          <Container className="container-wrapper content-tabs-wrapper">
            <Grid>
              <Grid.Column width={16}>
                <Menu fluid tabular>
                  <Menu.Item
                    name='feed'
                    active={activeItem === 'feed'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='Recebidas'
                    active={activeItem === 'Recebidas'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='Enviadas'
                    active={activeItem === 'Enviadas'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    position="right"
                    >
                    <Button
                      floated='right'
                      onClick={() => setOpen(true)}
                      primary
                      >
                      <Icon name='add' style={{margin: 0}} />
                    </Button>
                  </Menu.Item>
                </Menu>
              </Grid.Column>
      
              {/* ADD KEY */}
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                closeOnEscape={false}
              >
                <MessageSend setOpen={setOpen} refetch={refetch} user={user} />
              </Modal>
      
      
              {/* FEED */}
              { (activeItem === 'feed') && (
                  loading ? (
                    <Segment loading>
                      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Segment>
                  ) :
                  (
                    <Grid.Column width={16}>
                      <HomeContent loading={loading} messages={general} />
                    </Grid.Column>
                  )
                )
              }
      
              {/* RECEBIDAS */}
              {
                (activeItem === 'Recebidas') &&
                  <Grid.Column width={16}>
                  {
                    loading ? (
                      <Segment loading>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                      </Segment>
                    ) : (
                      <>
                        <Transition.Group>
                          {
                            messages && messages.map(message => (
                              <Grid.Column key={message.id} style={{ marginBottom: "1rem" }}>
                                {/* <pre>
                                  {JSON.stringify(message, null, 2)}
                                </pre> */}
                                <MessageReceivedCard message={message} />
                              </Grid.Column>
                            ))
                          }
                        </Transition.Group>
                        <Segment>
                          Você fez o que podia até aqui.
                        </Segment>
                      </>
                    )
                  }
                </Grid.Column>
              }
      
              {/* ENVIADAS */}
              {
                (activeItem === 'Enviadas') &&
                  <Grid.Column width={16}>
                  {
                    loading ? (
                      <Segment loading>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                      </Segment>
                    ) : (
                      <>
                        <Transition.Group>
                          {
                            sentMessages && sentMessages.map(message => (
                              <Grid.Column key={message.id} style={{ marginBottom: "1rem" }}>
                                <MessageSentCard message={message} />
                              </Grid.Column>
                            ))
                          }
                        </Transition.Group>
                        <Segment>
                          Você fez o que podia até aqui.
                        </Segment>
                      </>
                    )
                  }
                </Grid.Column>
              }
            </Grid>
          </Container>
        
        </>
      )
    )
  )
}
