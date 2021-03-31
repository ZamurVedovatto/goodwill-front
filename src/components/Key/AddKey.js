import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import KeyForm from '../KeyForm'
import { Container, Grid, Breadcrumb, Segment, Card } from 'semantic-ui-react'
import { AuthContext } from './../../context/auth'

export default function AddKey() {
  const { context, user } = useContext(AuthContext)

  return (
    <Grid.Column width={12}>
      <Card fluid>
        <Card.Content>
          <Card.Header>Add Key</Card.Header>
          <Card.Meta>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Card.Meta>
          {/* <Card.Description>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </Card.Description> */}
        </Card.Content>
        <Card.Content>
          <KeyForm user={user} />
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}
