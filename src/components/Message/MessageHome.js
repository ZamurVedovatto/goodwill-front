import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Icon, Transition, Button, Container, Menu, Segment, Image, Modal } from 'semantic-ui-react'
import { AuthContext } from './../../context/auth'
import { FETCH_USER_FOR_MESSAGE_HOME } from './../../util/graphql'
import MessageReceivedCard from './MessageReceivedCard'
import MessageSentCard from './MessageSentCard'
import MessageSend from './../General/MessageSend'
import HomeContent from '../HomeContent'

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
    <Container className="container-wrapper">
      <Grid>
        <Grid.Column width={16}>
          <Grid.Row>
            <Button
              floated='right'
              onClick={() => setOpen(true)}
              >
              <Icon name='add' style={{margin: 0}} />
            </Button>
          </Grid.Row>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
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
          </Menu>
        </Grid.Column>

        {/* ADD KEY */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          closeOnEscape={false}
        >
          <MessageSend setOpen={setOpen} refetch={refetch} />
        </Modal>


        {/* FEED */}
        { (activeItem === 'feed') && (
            !user || loading ? (
              <Segment loading>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Segment>
            ) :
            (
              <Grid.Column width={12}>
                <HomeContent loading={loading} messages={general} />
              </Grid.Column>
            )
          )
        }


        {/* RECEBIDAS */}
        {
          (activeItem === 'Recebidas') &&
            <Grid.Column width={12}>
            {
              !user || loading ? (
                <Segment loading>
                  <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>
              ) : (
                <>
                  <Transition.Group>
                    {
                      user && messages && messages.map(message => (
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
            <Grid.Column width={12}>
            {
              !user || loading ? (
                <Segment loading>
                  <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>
              ) : (
                <>
                  <Transition.Group>
                    {
                      user && sentMessages && sentMessages.map(message => (
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
  )
}
