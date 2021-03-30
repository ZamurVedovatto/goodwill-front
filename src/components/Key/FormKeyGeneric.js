import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

export default function FormKeyGeneric({ values, onChange, error, createKeyCallback }) {
  

  return (
    <Form onSubmit={createKeyCallback}>
      <Form.Input
        readOnly
        name="title"
        placeholder={values.title}
      />
      <Form.Field>
        <Checkbox label='Eu concordo com os Termos e Condições' />
      </Form.Field>
      <Button type='submit'>Adicionar</Button>
    </Form>
  )
}
