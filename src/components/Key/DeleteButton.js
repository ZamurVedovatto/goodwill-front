import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Icon, Button, Confirm } from 'semantic-ui-react'
import { DELETE_KEY_MUTATION, FETCH_USER_KEYS_QUERY } from './../../util/graphql'
import CustomPopup from './../../util/CustomPopup'
import { AuthContext } from './../../context/auth'

export default function DeleteButton({ keyId, userId, callback }) {
  const context = useContext(AuthContext)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deleteKeyMutation] = useMutation(DELETE_KEY_MUTATION, {
    update(proxy) {
      setConfirmOpen(false)
      const data = proxy.readQuery({
        query: FETCH_USER_KEYS_QUERY,
        variables: {
          userId
        },
      })
      console.log(data, context)
      context.setKeys(data)
      if(callback) callback()
    },
    variables: {
      keyId, userId
    }
  })

  return (
    <>
      <CustomPopup content={'Excluir Chave'}>
        <Button
          as="div"
          color="red"
          floated="right"
          circular
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
        onConfirm={deleteKeyMutation}
      />
    </>
  )
}