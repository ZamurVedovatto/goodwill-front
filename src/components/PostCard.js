import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from './../context/auth'
import LikeButton from './../components/LikeButton'
import DeleteButton from './../components/DeleteButton'
import CustomPopup from '../util/CustomPopup'

export default function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes, comments }}) {
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
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description className="description-cutted">{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likes, likeCount }} user={user} />
        <CustomPopup content='Comment on post'>
          <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
            <Button color='blue' basic>
              <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left'>{commentCount}</Label>
          </Button>
        </CustomPopup>
        {
          user && (user.username === username) && <DeleteButton postId={id} /> 
        }
      </Card.Content>
    </Card>
  )
}
