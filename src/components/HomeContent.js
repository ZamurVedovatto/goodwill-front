import React, { useState, useEffect } from 'react'
import { Grid, Menu, Segment, Image, Transition } from 'semantic-ui-react'
import PostCard from './PostCard'

export default function HomeContent({posts}) {
  const [activeItem, setActiveItem] = useState('feed')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [activeItem])

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item
            name='feed'
            active={activeItem === 'feed'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='keysbased'
            active={activeItem === 'keysbased'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='keysrelated'
            active={activeItem === 'keysrelated'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='ads'
            active={activeItem === 'ads'}
            onClick={handleItemClick}
          />
        </Menu>
      </Grid.Column>

      <Grid.Column width={12}>
        {
          loading ? (
            <Segment loading>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Segment>
          ) : (
            <>
            <Segment>
              This is an stretched grid column. This segment will always match the
              tab height
            </Segment>


              <Transition.Group>
                {
                  posts && posts.map(post => (
                    <Grid.Column key={post.id} style={{ marginBottom: "2rem" }}>
                      <PostCard post={post} />
                    </Grid.Column>
                  ))
                }
              </Transition.Group>

            {/* <PostCard /> */}
            </>
          )
        }
      </Grid.Column>
      
    </Grid>
  )

}