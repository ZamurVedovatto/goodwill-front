import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Button, Icon, Label } from 'semantic-ui-react'
import CustomPopup from '../util/CustomPopup'
import { LIKE_MESSAGE_MUTATION } from './../util/graphql'

export default function LikeButton({ message: { id, likes, likeCount }, user}) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, likes])

  const [likeMessage] = useMutation(LIKE_MESSAGE_MUTATION, {
    variables: { messageId: id}
  })

  const likeButton = user ? (
    liked ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color='teal' basic >
      <Icon name='heart' />
    </Button>
  )

  return (
    <Button as='div' labelPosition='right' onClick={likeMessage}>
      <CustomPopup content={liked ? 'Unlike' : 'Like'}>
        {likeButton}
      </CustomPopup>
      <Label basic color='teal' pointing='left'>{likeCount}</Label>
    </Button>
  )
}