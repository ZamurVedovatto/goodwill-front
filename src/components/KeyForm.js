import React, { useState } from 'react'
import uuid from 'react-uuid'

import { Form, Button, Card, Placeholder } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { CREATE_KEY_MUTATION } from './../util/graphql'
import keyTypes from './../util/consts/keyTypes';

import FormKeyGeneric from './Key/FormKeyGeneric'
import FormKeySimpleInput from './Key/FormKeySimpleInput'

export default function KeyForm({ user, setActiveItem, refetch }) {
  const [values, setValues] = useState({
    userId: user.id,
    username: user.username,
    type: 'generic',
    title: uuid(),
    address: {}
  })

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const [createKey, { error }] = useMutation(CREATE_KEY_MUTATION, {
    variables: values,
    update(proxy, result) {
      refetch();
      setActiveItem("minhas chaves");
    },
    onError(err) {
      return err;
    },
  });
  function createKeyCallback() {
    setValues({
      ...values,
      userId: user.id,
      username: user.username,
    }) 
    createKey()
  }

  const onSetSelection = (key) => {
    console.log(key)
    let event = {
      target: {
        name: "type",
        value: key.value
      }
    }
    if (key.value === 'generic') {
      setValues({
        ...values,
        title: uuid()
      })
    }
    onChange(event)
    console.log(values)
  }

  return (
    <>
      {/* key: 'generic',
      value: "generic",
      text: "Genérica",
      title: "generic", */}

      <Form.Field>
        <label>Escolha o tipo da nova Chave</label>
        <div>
          {keyTypes?.map((keyType) => (
            <Button
              type="button"
              primary
              size={"large"}
              basic={keyType.title !== values.type}
              style={{ margin: " .25rem .15rem"}} compact circular key={keyType.value}
              onClick={() => onSetSelection(keyType)}  
            >{keyType.text}</Button>
          ))}
        </div>
      </Form.Field>

      {/* <Card centered>
        <Select
          fluid
          label='Tipo'
          name="type"
          options={keyTypes}
          onChange={(e) => onChangeSelect(e)}
          error={error ? true : false}
          placeholder='Tipo'
        />
      </Card> */}
      <Card fluid>
        <Card.Content>
          {
            (values.type === '') && 
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          }
          {
            (values.type === 'generic') &&
            <FormKeyGeneric values={values} onChange={onChange} error={error} createKeyCallback={createKeyCallback} />
          }
          {
            (values.type === 'plate' || values.type === 'schoolId')  &&
            <FormKeySimpleInput values={values} onChange={onChange} error={error} createKeyCallback={createKeyCallback} />
          }
        </Card.Content>
      </Card>
    </>
  )
}