import React, { useContext, useRef, useState } from 'react'
import gql from 'graphql-tag'
import moment from 'moment'
import { useMutation, useQuery } from "@apollo/client"
import { Card, Grid, Image, Label, Button, Icon, Form, Container } from 'semantic-ui-react'
import LikeButton from '../components/LikeButton'

import { FETCH_MESSAGE_QUERY } from './../util/graphql'

import { AuthContext } from './../context/auth'
import DeleteButton from '../components/DeleteButton'
import CustomPopup from '../util/CustomPopup'

export default function SingleMessage(props) {
  const { user } = useContext(AuthContext)
  const commentInputRef = useRef(null)
  const messageId = props.match.params.messageId
  const [comment, setComment] = useState('')

  const { data: { getMessage } = {}} = useQuery(FETCH_MESSAGE_QUERY, {
    variables: {
      messageId
    }
  })

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(){
      setComment('')
      commentInputRef.current.blur()
    },
    variables: {
      messageId,
      body: comment
    }
  })

  function deleteMessageCallback() {
    props.history.push('/')
  }

  let messageMarkup
  if(!getMessage) {
    messageMarkup = <p>Loading message...</p>
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getMessage
    messageMarkup = (
      <Container className="container-wrapper">
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image
                src='https://picsum.photos/200'
                size="small"
                floated="right"
                circular
              />
            </Grid.Column>
            <Grid.Column width={13}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton user={user} message={{ id, likeCount, likes }} />
                  <CustomPopup content="Comment on message">
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log('comment on message')}
                    >
                      <Button basic color="blue">
                        <Icon name="comments" />
                      </Button>
                      <Label basic color="blue" pointing="left">
                        {commentCount}
                      </Label>
                    </Button>
                  </CustomPopup>
                  { user && (user.username === username) && (
                    <DeleteButton messageId={id} callback={deleteMessageCallback} />
                  )}
                </Card.Content>
              </Card>
              { user && (
                <Card fluid>
                  <Card.Content>
                    <p>Post a comment</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="Comment..."
                          name="comment"
                          value={comment}
                          onChange={event => setComment(event.target.value)}
                          ref={commentInputRef}
                        />
                        <button
                          type="submit"
                          className="ui button teal"
                          disabled={comment.trim() === ''}
                          onClick={submitComment}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              { comments && comments.map(comment => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    { user && user.username === comment.username && (
                      <DeleteButton messageId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      

      </Container>
    )
  }

  return messageMarkup
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($messageId: String!, $body: String!){
    createComment(messageId: $messageId, body: $body) {
      id
      comments{
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`