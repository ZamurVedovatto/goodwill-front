import React, { useContext, useRef, useState } from 'react'
import gql from 'graphql-tag'
import moment from 'moment'
import { useMutation, useQuery } from "@apollo/client"
import { Card, Grid, Image, Label, Button, Icon, Form, Container } from 'semantic-ui-react'
import LikeButton from '../components/LikeButton'

import { AuthContext } from './../context/auth'
import DeleteButton from '../components/DeleteButton'
import CustomPopup from '../util/CustomPopup'

export default function SinglePost(props) {
  const { user } = useContext(AuthContext)
  const commentInputRef = useRef(null)
  const postId = props.match.params.postId
  const [comment, setComment] = useState('')

  const { data: { getPost } = {}} = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  })

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(){
      setComment('')
      commentInputRef.current.blur()
    },
    variables: {
      postId,
      body: comment
    }
  })

  function deletePostCallback() {
    props.history.push('/')
  }

  let postMarkup
  if(!getPost) {
    postMarkup = <p>Loading post...</p>
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost
    postMarkup = (
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
                  <LikeButton user={user} post={{ id, likeCount, likes }} />
                  <CustomPopup content="Comment on post">
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log('comment on post')}
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
                    <DeleteButton postId={id} callback={deletePostCallback} />
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
                      <DeleteButton postId={id} commentId={comment.id} />
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

  return postMarkup
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!){
    createComment(postId: $postId, body: $body) {
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

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`