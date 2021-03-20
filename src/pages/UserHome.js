import React, { useState, useContext, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Transition, Icon, Card , Button, Form, Accordion } from 'semantic-ui-react'
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
    <Grid columns={1}>
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
                  <div className='ui two buttons' style={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                    <Button color='blue' basic>
                      <Icon name='add' />
                    </Button>
                    <Form>
                      <Accordion as={Form.Field} panels={panels} />
                    </Form>
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
            {user && (
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
          }

          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  )
}
