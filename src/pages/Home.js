import React, { useState, useContext, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { Grid, Transition, Icon, Card , Button, Form, Accordion } from 'semantic-ui-react'
import { AuthContext } from './../context/auth'

export default function Home() {
  const { user } = useContext(AuthContext)

  console.log(user)
  return (
    <Grid columns={1}>
      <Grid.Column width={16}>
        <Grid.Row className="page-title">
          {
            user ? (
              <h3>Olá, {user.username}.</h3>
            ) : (
              <h3>Olá. Registre-se para desfrutar das funções do sistema.</h3>
            )
          }
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width={16}>
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
                </Card.Content>
              </Card>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid.Column>
    </Grid>
  )
}
