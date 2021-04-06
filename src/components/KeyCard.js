import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from './../context/auth'
import DeleteButton from './../components/DeleteButton'

export default function KeyCard({ keyItem: { id, type, confirmed, active, createdAt, username, key }}) {
  const { user } = useContext(AuthContext)

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://picsum.photos/200'
          circular
        />
        <Card.Header>{type}</Card.Header>
        <Card.Meta as={Link} to={`/keys/${id}`}>{moment(createdAt).format("DD/MM/YY")}</Card.Meta>
        <Card.Description className="description-cutted">{key}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {
          confirmed ? <Icon name='circle' color="blue" /> : <Icon name='circle outline' />
        }
        {
          active ? <Icon name='stop circle' color="blue" /> : <Icon name='stop circle' />
        }
        {
          user && (user.username === username) && <DeleteButton messageId={id} /> 
        }
      </Card.Content>
    </Card>
  )
}
