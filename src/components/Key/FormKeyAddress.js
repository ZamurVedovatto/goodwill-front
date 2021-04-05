import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import addressTypes from './../../util/consts/addressTypes'

export default function FormKeyAddress({ values, onChange, error, createKeyCallback }) {
  return (
    <Form>
      <Form.Field>
        <Form.Input fluid label='Rua/Logradouro' placeholder='Rua/Logradouro' />
      </Form.Field>
      <Form.Field>
        <Form.Input fluid label='Número' placeholder='Número' />
      </Form.Field>
      <Form.Field>
        <Form.Input fluid label='CEP' placeholder='CEP' />
      </Form.Field>
      <Form.Field>
      <Form.Select
          fluid
          label='Tipo'
          options={addressTypes}
          placeholder='Tipo'
        />
      </Form.Field>
      <Form.TextArea label='About' placeholder='Tell us more about you...' />
      <Form.Field>
        <Checkbox label='Eu concordo com os Termos e Condições' />
      </Form.Field>
      <Button type='submit'>Adicionar</Button>
    </Form>
  )
}
