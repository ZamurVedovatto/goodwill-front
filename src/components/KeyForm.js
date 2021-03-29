import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { CREATE_KEY_MUTATION } from './../util/graphql'
import { useHistory } from "react-router-dom";
import keyTypes from './../util/consts/keyTypes';

export default function KeyForm({ user }) {
  const history = useHistory();
  const [values, setValues] = useState({
    userId: user.id,
    username: user.username,
    type: '',
    title: '',
  })

  const onChange = (event) => {
    console.log(event)
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })

    console.log(values)
  }

  const [createKey, { error }] = useMutation(CREATE_KEY_MUTATION, {
    variables: values,
    update(proxy, result) {
      console.log(result)
      history.push("/user");
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
    setValues({
      ...values,
      type: e.target.title
    }) 
  }

  return (
    <>
      <Form onSubmit={createKeyCallback}>
        <Form.Field>
          <Form.Select
            fluid
            label='Tipo'
            name="type"
            options={keyTypes}
            onChange={(e) => onChangeSelect(e)}
            error={error ? true : false}
            placeholder='Tipo'
          />
          <Form.Input
            label='Valor'
            placeholder="jmi7489"
            name="title"
            onChange={onChange}
            value={values.title}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      { error && (
        <pre>{JSON.stringify(error, null, 2)}</pre>
        // <div className="ui error message" style={{ marginBottom: "2rem" }}>
        //   <ul className="list">
        //     <li>{error.graphQLErrors[0].message}</li>
        //   </ul>
        // </div>
      )}
    </>
  )
}