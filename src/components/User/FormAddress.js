import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form, Segment, Message, Icon } from 'semantic-ui-react'
import { CREATE_ADDRESS_MUTATION } from '../../util/graphql'
import { useForm } from '../../util/hooks'
import addressTypes from './../../util/consts/addressTypes'

export default function FormAddress({user}) {
  const [errors, setErrors] = useState({})
  
  const { onChange, onSubmit, values } = useForm(registerAddress, {
    userId: "",
    code: "",
    type: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: ""
  })

  const [addAddress, { loading }] = useMutation(CREATE_ADDRESS_MUTATION, {
    update(_, { data: { createAddress: addressData } }) {
      console.log(addressData)
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception.errors)
    },
    variables: values
  })

  function registerAddress() {
    addAddress()
  }

  return (
    <Form
        onSubmit={onSubmit}
        noValidate
        className={loading ? 'loading' : ''}
        success
      >
      <Segment vertical>
        <Form.Group>
          <Form.Field width={12}>
            <Form.Select
              fluid
              label='Tipo'
              options={addressTypes}
              placeholder='Tipo'
              value={values.type}
              error={errors.type ? true : false}
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field  width={4} required>
            <Form.Input
              control='input' type='number' max={8} label='CEP' placeholder='CEP'
              value={values.code}
              error={errors.code ? true : false}
              onChange={onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <Form.Field width={12}>
            <Form.Input
              fluid label='Rua/Logradouro' placeholder='Rua/Logradouro'
              value={values.street}  
              error={errors.street ? true : false}
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field required width={4}>
            <Form.Input
              label='Número' placeholder='Número'
              value={values.number}
              error={errors.number ? true : false}
              onChange={onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Field width={16}>
          <Form.Input
            fluid label='Complemento' placeholder='Complemento'
            value={values.complement}  
            error={errors.complement ? true : false}
            onChange={onChange}
          />
        </Form.Field>

        <Form.Group widths='equal'>
          <Form.Field>
            <Form.Input
              fluid label='Bairro' placeholder='Bairro'
              value={values.neighborhood} 
              error={errors.neighborhood ? true : false}
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Cidade' placeholder='Cidade'
              value={values.city}
              error={errors.city ? true : false}
              onChange={onChange}
            />
          </Form.Field>
        </Form.Group>
      </Segment>

      <Segment vertical>
        <Form.Field>
          <Button primary type='submit'>Salvar</Button>
        </Form.Field>
      </Segment>

      <Segment vertical>
        <Message
          header='Endereço-Chave'
          attached='bottom'
          success
          size='huge'
        >
          <Icon name='key' />
          <a href='#'>Cadastrar</a>&nbsp; meu endereço como Chave.
        </Message>
      </Segment>
    </Form>
  )
}
