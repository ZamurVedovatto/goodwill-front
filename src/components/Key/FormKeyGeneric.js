import React from 'react'
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'

export default function FormKeyGeneric({ createKeyCallback }) {

  return (
    <Form onSubmit={createKeyCallback}>
      <Message>
        <Message.Header>Uma chave genérica é um valor aleatório de 33 dígitos que será criado automaticamente</Message.Header>
      </Message>

      <Form.Field>
        <Checkbox label='Eu concordo com os Termos e Condições' />
      </Form.Field>
      <Button type='submit'>Criar</Button>
    </Form>
  )
}
