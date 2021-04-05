import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Icon, Button, Confirm } from 'semantic-ui-react'
import { FETCH_MESSAGES_QUERY } from './../util/graphql'
import CustomPopup from './../util/CustomPopup'

export default function DeleteButton({ messageId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_MESSAGE_MUTATION

  const [deleteMessageOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false)
      if(!commentId) {
        const data = proxy.readQuery({
          query: FETCH_MESSAGES_QUERY
        })
        proxy.writeQuery({
          query:FETCH_MESSAGES_QUERY,
          data: {
            getMessages: data.getMessages.filter(message => message.id !== messageId)
          }
        })
      }
      if(callback) callback()
    },
    variables: {
      messageId,
      commentId
    }
  })

  return (
    <>
      <CustomPopup content={commentId ? 'Delete comment' : 'Delete message'}>
        <Button
          as="div"
          color="red"
          floated="right"
          basic
          onClick={() => setConfirmOpen(true)}
          >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </CustomPopup>

      <Confirm
        cancelButton="Cancelar"
        confirmButton="Confirmar"
        content="Você tem certeza?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteMessageOrMutation}
      />
    </>
  )
}

const DELETE_MESSAGE_MUTATION = gql`
  mutation deleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId)
  }
`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($messageId: ID!, $commentId: ID!) {
    deleteComment(messageId: $messageId, commentId: $commentId ) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`