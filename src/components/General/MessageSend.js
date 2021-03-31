import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import PostForm from './../Post/PostForm'

export default function MessageSend({ setOpen }) {
  return (
    <>
      <Modal.Header>Mensagem</Modal.Header>
      <Modal.Content image>
        <Icon name='send' size='big' color='teal' />
        
        <Modal.Description>
          <p>
            Envie uma mensagem diretamente para alguém ou para várias chaves ao mesmo tempo.
          </p>
          <p>Antes de mais nada, defina se a mensagem será enviada para uma chave ou várias, ok?</p>

          <PostForm />

        </Modal.Description>
        <Icon name='send' size='massive' flipped='vertically' color='teal'  />
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Desisti
        </Button>
        <Button
          content="Pronto, enviar"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </>
  )
}
