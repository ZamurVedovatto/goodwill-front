import React, { useContext, useEffect } from 'react'
import { useQuery, useLazyQuery } from "@apollo/client"
import { Grid, Icon, Card , Button, Container } from 'semantic-ui-react'
import KeyList from './../components/KeyList'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from './../context/auth'
import { FETCH_KEYS_QUERY } from './../util/graphql'

export default function UserHome() {
  const history = useHistory();
  const { context, user } = useContext(AuthContext)

  useEffect(() => {
    refetch();
  }, []);

  const { loading, data: { getKeys: keys } = {}, refetch} = useQuery(FETCH_KEYS_QUERY, {
    update(proxy) {
      context.setKeys(keys)
    },
    variables: {
      userId: user.id
    }
  })


  return (
    <Container className="container-wrapper">
      <Grid columns={1}>
        <Grid.Column width={16}>
          <Grid.Row>
            {user && (
              <Grid.Column>
                <Card fluid>
                  <Card.Content extra>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                      <Button as={Link} to={"/user/addkey"}>
                        <Icon name='add' style={{margin: 0}} />
                      </Button>
                    </div>
                  </Card.Content>
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
    </Container>
  )
}
