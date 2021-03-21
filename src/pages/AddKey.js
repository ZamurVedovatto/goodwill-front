import React from 'react'
import { Link } from 'react-router-dom'
import KeyForm from '../components/KeyForm'
import { Container, Grid, Breadcrumb, Segment, Button, Icon, Card } from 'semantic-ui-react'

export default function AddKey() {
  return (
    <Container className="container-wrapper">
      <Segment>
        <Grid columns={1}>
          <Grid.Column width={16}>
            <Breadcrumb>
              <Breadcrumb.Section link as={Link} to={"/"}>Feed</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section link as={Link} to={"/user"}>Keys</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section active>Add</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
          <Grid.Column width={16}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Add Key</Card.Header>
                <Card.Description>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <KeyForm />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  )
}
