import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Icon, Transition, Button, Container, Menu, Segment, Image, Modal } from 'semantic-ui-react'
import { AuthContext } from './../../context/auth'
import { FETCH_USER_MESSAGES_QUERY } from './../../util/graphql'
import AddKey from './../../components/Key/AddKey'
import MessageReceivedCard from './MessageReceivedCard'
import MessageSentCard from './MessageSentCard'
import MessageSend from './../General/MessageSend'

export default function MessageHome() {
  const { user } = useContext(AuthContext)
  const [activeItem, setActiveItem] = useState('Recebidas')
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
  }, [activeItem])

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  const { loading, data: { getUserReceivedMessages: messages, getUserSentMessages: sentMessages } = {}, refetch} = useQuery(FETCH_USER_MESSAGES_QUERY, {
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
              name='Chaves Favoritas'
              active={activeItem === 'Chaves Favoritas'}
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

        {/* CHAVES FAVORITAS */}
        {
          (activeItem === 'Chaves Favoritas') &&
          <span>Chaves Favoritas</span>
        }
      </Grid>
    </Container>
  )
}
