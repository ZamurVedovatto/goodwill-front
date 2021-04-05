import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Icon, Button, Confirm } from 'semantic-ui-react'
import CustomPopup from './../util/CustomPopup'

export default function DeleteUserButton({ userId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION, {
    update(proxy) {
      setConfirmOpen(false)
      if(callback) callback()
    },
    variables: {
      userId
    }
  })

  return (
    <>
      <CustomPopup content='Delete user?'>
        <Button
          color="red"
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
        onConfirm={deleteUserMutation}
      />
    </>
  )
}

const DELETE_USER_MUTATION = gql `
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`