import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { CREATE_KEY_MUTATION } from './../util/graphql'
import { useHistory } from "react-router-dom";
import { AuthContext } from './../context/auth'

export default function KeyForm({ user }) {
  const context = useContext(AuthContext)
  const history = useHistory();
  const [values, setValues] = useState({
    userId: user.id,
    username: user.username,
    type: '',
    value: '',
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
      console.log(result)
      history.push("/user");
    },
    onError(err) {
      return err;
    },
  });
  function createKeyCallback() {
    // setValues({
    //   ...values,
    //   userId: user.id,
    //   username: user.username,
    // }) 
    console.log(context, user)
    createKey()
  }

  return (
    <>
      <Form onSubmit={createKeyCallback}>
        <h2>Create Key</h2>
        <Form.Field>
          <Form.Input
            placeholder="Plate"
            name="type"
            onChange={onChange}
            value={values.type}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="jmi7489"
            name="value"
            onChange={onChange}
            value={values.value}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      { error && (
        JSON.stringify(error)
        // <div className="ui error message" style={{ marginBottom: "2rem" }}>
        //   <ul className="list">
        //     <li>{error.graphQLErrors[0].message}</li>
        //   </ul>
        // </div>
      )}
    </>
  )
}