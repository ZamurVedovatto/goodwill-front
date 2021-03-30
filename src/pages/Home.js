import React, { useContext } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Image, Container, Segment } from 'semantic-ui-react'

import HomeContent from './../components/HomeContent'
import { AuthContext } from './../context/auth'
import { FETCH_POSTS_QUERY } from './../util/graphql'
import bgImg from './../assets/bg.png'
import StatisticSystem from '../components/General/Statistics'

export default function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data: { getPosts: posts } = {}} = useQuery(FETCH_POSTS_QUERY)

  return (
    <Container>
      <Grid columns={1}>
        {
          !user && !loading && (
              <>
                <Grid.Column width={16}>
                  <Segment color="blue" raised style={{ marginTop: "1rem" }}>
                    <StatisticSystem />
                  </Segment>
                </Grid.Column>
                <Grid.Column width={16} >
                  <Segment className="bg-img" style={{ margin: "0 auto" }}>
                    <Image src={bgImg} fluid />
                  </Segment>
                </Grid.Column>
              </>
            )
        }
        { 
          (user && posts) && (
          <Grid.Column width={16} style={{ marginTop: "2rem" }}>
            <HomeContent posts={posts} />
          </Grid.Column>
          )
        }
      </Grid>
    </Container>
  )
}
