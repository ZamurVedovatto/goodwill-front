import React from 'react'
import { Grid, Transition, Icon, Card , Button, Form, Accordion } from 'semantic-ui-react'
import KeyCard from './../components/KeyCard'

export default function KeyList({ keys }) {
  return (
    <Transition.Group>
    {
      keys && keys.map(keyItem => (
          <Grid.Column key={keyItem.id} style={{ marginBottom: "2rem" }}>
            <KeyCard keyItem={keyItem} />
          </Grid.Column>
        ))
    }
  </Transition.Group>
  )
}