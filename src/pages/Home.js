import React, { useState, useContext, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Transition, Icon, Card , Button} from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import PostCard from './../components/PostCard'
import KeyCard from './../components/KeyCard'
import PostForm from './../components/PostForm'

import { AuthContext } from './../context/auth'

export default function Home() {
  const { user } = useContext(AuthContext)
  // const { loading, data: { getPosts: posts } = {}} = useQuery(FETCH_POSTS_QUERY)

  console.log(user)
  return (
    <Grid columns={1}>
      <Grid.Column width={16}>
        <Grid.Row className="page-title">
          {
            user ? (
              <h3>Olá, {user.username}.</h3>
            ) : (
              <h3>Olá. Registre-se para desfrutar das funções do sistema.</h3>
            )
          }
          
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width={6}>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Minhas Chaves</Card.Header>
                  <Card.Meta>Texto aqui</Card.Meta>
                  <Card.Description>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button color='teal'>
                      <Icon name='list' />
                    </Button>
                    <Button color='blue'>
                      <Icon name='add' />
                    </Button>
                  </div>
                </Card.Content>
              </Card>

            </Grid.Column>
          )}
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width={10}>
        <Grid columns={1}>
          <Grid.Row>
            {/* {user && (
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            )}
            {loading ? (
              <h1>Loading posts...</h1>
            ) : (
              <Transition.Group>
                {
                  posts && posts.map(post => (
                    <Grid.Column key={post.id} style={{ marginBottom: "2rem" }}>
                      <PostCard post={post} />
                    </Grid.Column>
                  ))
                }
              </Transition.Group>
            )
          } */}


            <Transition.Group>
              {
                user && user.keys && user.keys.map(keyItem => (
                    <Grid.Column key={keyItem.id} style={{ marginBottom: "2rem" }}>
                      <KeyCard keyItem={keyItem} />
                    </Grid.Column>
                  ))
              }
            </Transition.Group>

          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  )
}
