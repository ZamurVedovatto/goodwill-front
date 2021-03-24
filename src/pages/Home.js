import React, { useContext } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Image, Container } from 'semantic-ui-react'

import HomeContent from './../components/HomeContent'
import { AuthContext } from './../context/auth'
import { FETCH_POSTS_QUERY } from './../util/graphql'
import bgImg from './../assets/bg.png'
import PostForm from '../components/PostForm'

export default function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data: { getPosts: posts } = {}} = useQuery(FETCH_POSTS_QUERY)

  return (
    <Container>
      <Grid columns={1}>
        <Grid.Column width={16}>
          <Grid.Row className="page-title bg-img">
            {
              !user && !loading && (
                <Image className="bg-img" src={bgImg} fluid />
              )
            }
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={16}>
          <Grid columns={1}>
            <Grid.Row>
              {user && (
                <Grid.Column>
                  <PostForm />
                </Grid.Column>
              )} 
            </Grid.Row>
          </Grid>
        </Grid.Column>
        { 
          (user && posts) && (
          <Grid.Column width={16}>
            <HomeContent posts={posts} />
          </Grid.Column>
          )
        }
      </Grid>
    </Container>
  )
}
