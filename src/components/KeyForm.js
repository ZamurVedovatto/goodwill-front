import React, { useState } from 'react'
import uuid from 'react-uuid'

import { Button, Form, Label, Select, Card, Placeholder } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { CREATE_KEY_MUTATION } from './../util/graphql'
import { useHistory } from "react-router-dom";
import keyTypes from './../util/consts/keyTypes';

import FormKeyGeneric from './Key/FormKeyGeneric'
import FormKeySimpleInput from './Key/FormKeySimpleInput'
import FormKeyAddress from './Key/FormKeyAddress';

export default function KeyForm({ user, setActiveItem, refetch }) {
  const history = useHistory();
  const [values, setValues] = useState({
    userId: user.id,
    username: user.username,
    type: '',
    title: '',
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

  const onChangeSelect = (e) => {
    console.log(e.target.title)
    let newTitle = (e.target.title === 'generic') ? uuid() : ''
    console.log(newTitle)
    setValues({
      ...values,
      type: e.target.title,
      title: newTitle
    })
  }

  return (
    <>
      <Card centered>
        <Select
          fluid
          label='Tipo'
          name="type"
          options={keyTypes}
          onChange={(e) => onChangeSelect(e)}
          error={error ? true : false}
          placeholder='Tipo'
        />
      </Card>
      <Card centered>
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
          {
            (values.type === 'address') &&
            <FormKeyAddress values={values} onChange={onChange} error={error} createKeyCallback={createKeyCallback} />
          }
        </Card.Content>
      </Card>
    </>
  )
}