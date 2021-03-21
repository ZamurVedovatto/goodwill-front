import React, { useState, useContext, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Transition, Icon, Card , Button, Form, Accordion, Container, Segment } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import PostCard from './../components/PostCard'
import KeyCard from './../components/KeyCard'
import PostForm from './../components/PostForm'
import KeyList from './../components/KeyList'

import { AuthContext } from './../context/auth'

import { FETCH_POSTS_QUERY } from './../util/graphql'

export default function UserHome() {
  const { user } = useContext(AuthContext)
  const { loading, data: { getPosts: posts } = {}} = useQuery(FETCH_POSTS_QUERY)

  const panels = [
    {
      key: 'details',
      title: 'Listar minhas chaves',
      content: {content: user ? <KeyList keys={user.keys}/> : null } ,
    },
  ]

  console.log(user)
  return (
    <Container className="container-wrapper">

      <Grid columns={1}>
        <Grid.Column width={7}>
          <Grid.Row>
            {user && (
              <Grid.Column>
                <Card fluid>
                <Card.Content extra>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <Button>
                      <Icon name='add' />
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
                    <KeyList />
                  </Card.Content>
                </Card>
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={9}>
          <Segment>
            <Grid columns={1}>
              <Grid.Row>
                {user && (
                  <Grid.Column>
                    <PostForm />
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    
    </Container>

  )
}
