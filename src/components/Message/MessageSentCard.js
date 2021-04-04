import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Label, Button, Popup, Segment } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from './../../context/auth'
import LikeButton from './../../components/LikeButton'
import DeleteButton from './../../components/DeleteButton'
import CustomPopup from './../../util/CustomPopup'

import { useMutation } from '@apollo/client'
import { READ_MESSAGE_MUTATION } from './../../util/graphql'

export default function MessageSentCard({ message: { id, modality, targetKey, body, senderId, senderKey, read, received, createdAt, comments, commentCount, likes, likeCount }}) {
  const { user } = useContext(AuthContext)
  const [favorited, setFavorited] = useState(false)
  const [readMessage] = useMutation(READ_MESSAGE_MUTATION, {
    variables: { messageId: id}
  })

  return (
    <Card fluid >
      <Card.Content >
        {
          received ?
            <Label size={"large"} basic color='blue' ribbon='right'>
              Recebida
            </Label>
            :
            <Label size={"large"} basic as='a' color='grey' ribbon='right'>
              Não recebida ainda
            </Label>
        }
        <Card.Header>
          ({read ? "Lida" : "Não lida"}) {body}
        </Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description className="description-cutted">
          {
            favorited ? 
              <Icon color="yellow" link name='star' />
              :
              <Icon color="grey" link name='star' onClick={() => setFavorited(true)} />
          }
          {senderKey}
        </Card.Description>
        <Card.Description className="description-cutted">{targetKey}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton message={{ id, likes, likeCount }} user={user} />
        <CustomPopup content='Comment on message'>
          <Button labelPosition='right' as={Link} to={`/messages/${id}`}>
            <Button color='blue' basic>
              <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left'>{commentCount}</Label>
          </Button>
        </CustomPopup>
      </Card.Content>
    </Card>
  )
}
