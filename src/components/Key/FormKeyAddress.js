import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import keyTypes from './../../util/consts/keyTypes';

export default function FormKeyAddress({ values, onChange, error, createKeyCallback }) {
  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Input fluid label='First name' placeholder='First name' />
        <Form.Input fluid label='Last name' placeholder='Last name' />
        <Form.Select
          fluid
          label='Gender'
          options={keyTypes}
          placeholder='Gender'
        />
      </Form.Group>
      <Form.TextArea label='About' placeholder='Tell us more about you...' />
      <Form.Field>
        <Checkbox label='Eu concordo com os Termos e Condições' />
      </Form.Field>
      <Button type='submit'>Adicionar</Button>
    </Form>
  )
}
