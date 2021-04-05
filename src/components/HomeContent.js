import React from 'react'
import { Grid, Segment, Image, Transition } from 'semantic-ui-react'
import MessageCard from './Message/MessageCard'

export default function HomeContent({ loading, messages}) {

  return (
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
              Você fez o que podia até aqui.
            </Segment>
          {/* <MessageCard /> */}
          </>
        )
      }
    </Grid.Column>
  )

}