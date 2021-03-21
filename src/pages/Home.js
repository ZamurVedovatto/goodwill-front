import React, { useState, useContext, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Image, Segment, Transition, Icon, Card , Button, Form, Accordion, Container } from 'semantic-ui-react'

import HomeContent from './../components/HomeContent'
import PostCard from './../components/PostCard'
import KeyCard from './../components/KeyCard'
import PostForm from './../components/PostForm'
import KeyList from './../components/KeyList'

import { AuthContext } from './../context/auth'
import { FETCH_POSTS_QUERY } from './../util/graphql'
import bgImg from './../assets/bg.png'


export default function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data: { getPosts: posts } = {}} = useQuery(FETCH_POSTS_QUERY)

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
          (user && posts) && (
          <Grid.Column width={16}>
            <HomeContent posts={posts} />
          </Grid.Column>
          )
        }
        {/* <Grid.Column width={10}>
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
        </Grid.Column> */}
      </Grid>
    
    </Container>
  )
}
