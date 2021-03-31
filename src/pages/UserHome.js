import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from "@apollo/client"
import { Grid, Icon, Card , Button, Container, Tab, Menu, Segment, Image } from 'semantic-ui-react'
import KeyList from './../components/KeyList'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from './../context/auth'
import { FETCH_USER_KEYS_QUERY } from './../util/graphql'
import AddKey from '../components/Key/AddKey'

export default function UserHome() {
  const history = useHistory();
  const { context, user } = useContext(AuthContext)
  const [activeItem, setActiveItem] = useState('Chaves Próprias')

  useEffect(() => {
    // setLoading(true)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 500);
  }, [activeItem])

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  useEffect(() => {
    refetch();
  }, []);

  const { loading, data: { getUserKeys: keys } = {}, refetch} = useQuery(FETCH_USER_KEYS_QUERY, {
    update(proxy) {
      context.setKeys(keys)
    },
    variables: {
      userId: user.id
    }
  })


  return (
    <Container className="container-wrapper">
      <Grid>
        <Grid.Column width={16}>
          <Grid.Row>
            <Button
              floated='right'
              name='Adicionar Chave'
              active={activeItem === 'Adicionar Chave'}
              onClick={handleItemClick}
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
              name='Chaves Próprias'
              active={activeItem === 'Chaves Próprias'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='Chaves Institucionais'
              active={activeItem === 'Chaves Institucionais'}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>
        {
          (activeItem === 'Adicionar Chave') && <AddKey />
        }
          {
          (activeItem === 'Chaves Institucionais') &&
          <span>Chaves Institucionais</span>
        }
        {
          (activeItem === 'Chaves Próprias') &&
            <Grid.Column width={12}>
              {
                loading ? (
                  <Segment loading>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                  </Segment>
                ) : (
                  <Grid columns={1}>
                    <Grid.Column width={16}>
                      <Grid.Row>
                        {user && (
                          <Grid.Column>
                            <Card fluid>
                              <Card.Content>
                                <Card.Header>Keys</Card.Header>
                                <Card.Meta>Texto aqui</Card.Meta>
                                <Card.Description>
                                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                </Card.Description>
                              </Card.Content>
                              <Card.Content>
                                {
                                  (loading || !keys || !user) ? (
                                    <span>loading</span>
                                  ) : (
                                    <KeyList keys={keys} user={user} refetch={refetch} />
                                  )
                                }
                              </Card.Content>
                            </Card>
                          </Grid.Column>
                        )}
                      </Grid.Row>
                    </Grid.Column>
                  </Grid>
                )
              }
            </Grid.Column>
        }
      </Grid>
    </Container>
  )
}
