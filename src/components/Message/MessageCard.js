import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from './../../context/auth'
import LikeButton from './../../components/LikeButton'
import DeleteButton from './../../components/DeleteButton'
import CustomPopup from './../../util/CustomPopup'

export default function MessageUserCard({ message: { id, modality, targetKey, body, senderId, createdAt, comments, commentCount, likes, likeCount }}) {
  const { user } = useContext(AuthContext)

  const onSetModalityText = (modality) => {
    return (modality === 'single') ? "Mensagem Direta" : "Mensagem para múltiplas chaves"
  }

  return (
    <Card fluid>
      <Card.Content>
        {/* <Image
          floated='right'
          size='mini'
          src='https://picsum.photos/200'
          circular
        /> */}
        <Card.Header>{body}</Card.Header>
        <Card.Meta as={Link} to={`/messages/${id}`}>{onSetModalityText(modality)} - {moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description className="description-cutted">{targetKey}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton message={{ id, likes, likeCount }} user={user} />
        <CustomPopup content='Comentários'>
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
