import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Icon, Button, Confirm } from 'semantic-ui-react'
import { DELETE_KEY_MUTATION, FETCH_KEYS_QUERY } from './../util/graphql'
import CustomPopup from './../util/CustomPopup'

export default function DeleteButton({ keyId, userId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deleteKeyMutation] = useMutation(DELETE_KEY_MUTATION, {
    update(proxy) {
      setConfirmOpen(false)
      const data = proxy.readQuery({
        query: FETCH_KEYS_QUERY,
        variables: {
          userId
        }
      })
      // proxy.writeQuery({
      //   query: FETCH_KEYS_QUERY,
      //   data: {
      //     getKeys: data.getKeys(userId)
      //   }
      // })
      if(callback) callback()
    },
    variables: {
      keyId, userId
    }
  })

  return (
    <>
      <CustomPopup content={'Delete key'}>
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
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteKeyMutation}
      />
    </>
  )
}