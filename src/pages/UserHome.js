import React, { useState, useContext, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Icon, Card , Button, Container, Segment } from 'semantic-ui-react'
import PostForm from './../components/PostForm'
import KeyList from './../components/KeyList'
import { Link } from 'react-router-dom'
import { AuthContext } from './../context/auth'
import { FETCH_POSTS_QUERY } from './../util/graphql'
import KeyAddModal from '../components/KeyAddModal'

export default function UserHome() {
  const { user } = useContext(AuthContext)
  const [action, setAction] = useState(null)
  const { loading, data: { getPosts: posts } = {}} = useQuery(FETCH_POSTS_QUERY)

  const onAddKey = () => {
    (action === null) ? setAction('add-key') : setAction(null)
  }

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
                    <KeyList keys={user.keys} />
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
