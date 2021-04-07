import React from 'react'
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'
import addressTypes from './../../util/consts/addressTypes'

export default function FormKeyAddress({ values, onChange, error, createKeyCallback }) {
  return (
    <Form>
      <Form.Field required width={4}>
        <Form.Input control='input' type='number' max={8} label='CEP' placeholder='CEP' />
      </Form.Field>
      <Form.Field width={6}>
        <Form.Select
            fluid
            label='Tipo'
            options={addressTypes}
            placeholder='Tipo'
          />
      </Form.Field>
      <Form.Field width={12}>
        <Form.Input fluid label='Rua/Logradouro' placeholder='Rua/Logradouro' />
      </Form.Field>
      <Form.Field required width={2}>
        <Form.Input label='Número' placeholder='Número' />
      </Form.Field>
      <Form.Field width={6}>
        <Form.Input fluid label='Bairro' placeholder='Bairro' />
      </Form.Field>
      <Form.Field width={6}>
        <Form.Input label='Cidade' placeholder='Cidade' />
      </Form.Field>
      <Form.Field width={6}>
        <Checkbox label='Eu concordo com os Termos e Condições' />
      </Form.Field>
      <Button type='submit'>Adicionar Chave</Button>
    </Form>
  )
}
