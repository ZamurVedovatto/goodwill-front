import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import KeyForm from '../KeyForm'
import { Container, Grid, Breadcrumb, Segment, Card } from 'semantic-ui-react'
import { AuthContext } from './../../context/auth'

export default function AddKey({ setActiveItem, refetch }) {
  const { context, user } = useContext(AuthContext)

  return (
    <Grid.Column width={16}>
      <Card fluid>
        <Card.Content>
          <Card.Header>Adicionar Chave</Card.Header>
          <Card.Meta>Criar nova chave pessoal, seja ela genérica ou referente à algo somente seu.</Card.Meta>
        </Card.Content>
        <Card.Content>
          <KeyForm user={user} setActiveItem={setActiveItem} refetch={refetch} />
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}
