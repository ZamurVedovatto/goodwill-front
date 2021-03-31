import React, { useState, useEffect } from 'react'
import { Grid, Menu, Segment, Image, Transition } from 'semantic-ui-react'
import MessageCard from './MessageCard'

export default function HomeContent({messages}) {
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
              <Transition.Group>
                {
                  messages && messages.map(message => (
                    <Grid.Column key={message.id} style={{ marginBottom: "2rem" }}>
                      <MessageCard message={message} />
                    </Grid.Column>
                  ))
                }
              </Transition.Group>
              <Segment>
                We're done here.
              </Segment>
            {/* <MessageCard /> */}
            </>
          )
        }
      </Grid.Column>
      
    </Grid>
  )

}