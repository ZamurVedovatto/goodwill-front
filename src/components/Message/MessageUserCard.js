import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Label, Button, Popup, Segment } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from './../../context/auth'
import LikeButton from './../../components/LikeButton'
import DeleteButton from './../../components/DeleteButton'
import CustomPopup from './../../util/CustomPopup'

export default function MessageUserCard({ message: { id, modality, targetKey, body, senderId, senderKey, createdAt, comments, commentCount, likes, likeCount }}) {
  const { user } = useContext(AuthContext)
  const [read, setRead] = useState(false)

  return (
    <Card fluid >
      <Card.Content >
        {
          read ?
            <Label size={"large"} basic color='blue' ribbon='right'>
              Lida
            </Label>
            :
            <Label size={"large"} basic as='a' color='grey' ribbon='right' onClick={() => setRead(true)}>
              Marcar como lida
            </Label>
        }
        <Card.Header>
          {body}
        </Card.Header>
        <Card.Meta as={Link} to={`/messages/${id}`}>{modality} - {moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description className="description-cutted">de: {senderKey}</Card.Description>
        <Card.Description className="description-cutted">para: {targetKey}</Card.Description>
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
        <Button color="blue" animated floated="right">
          <Button.Content visible>
            {senderKey}
          </Button.Content>
          <Button.Content hidden>
            Favoritar
          </Button.Content>
        </Button>
      </Card.Content>
    </Card>
  )
}
