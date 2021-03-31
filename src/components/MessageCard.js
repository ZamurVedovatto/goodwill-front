import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from './../context/auth'
import LikeButton from './../components/LikeButton'
import DeleteButton from './../components/DeleteButton'
import CustomPopup from '../util/CustomPopup'

export default function MessageCard({ message: { id, modality, targetKey, body, senderId, createdAt, comments, commentCount, likes, likeCount }}) {
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
        <Card.Header>{modality}</Card.Header>
        <Card.Meta as={Link} to={`/messages/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description className="description-cutted">{body}</Card.Description>
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
        {
          user && (user.id === senderId) && <DeleteButton messageId={id} /> 
        }
      </Card.Content>
    </Card>
  )
}
