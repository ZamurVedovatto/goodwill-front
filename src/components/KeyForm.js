import React from 'react'
import { Button, Form, Select } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { useForm } from './../util/hooks'
import { FETCH_KEYS_QUERY } from './../util/graphql'

const typeOptions = [
  { key: 'plate', value: 'plate', text: 'Plate' },
  { key: 'address', value: 'address', text: 'Address' },
  { key: 'cellphone', value: 'cellphone', text: 'Cellphone' },
]

export default function KeyForm() {
  const { values, onChange, onSubmit } = useForm(createKeyCallback, {
    type: '',
    key: ''
  })
  const [createKey, { error }] = useMutation(CREATE_KEY_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_KEYS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_KEYS_QUERY,
        data: {
          getKeys: [result.data.getKeys, ...data.getKeys],
        },
      });
      values.body = "";
      values.key = "";
    },
    onError(err) {
      return err;
    },
  });
  function createKeyCallback() {
    createKey()
  }

  return (
    <>
      {JSON.stringify(error, values)}
      <Form onSubmit={onSubmit}>
        <Form.Field>
          {/* <Form.Select
            fluid
            label='Type'
            onChange={onChange}
            options={typeOptions}
            placeholder='Type'
          /> */}
          <Form.Input
            placeholder="Type"
            name="type"
            onChange={onChange}
            value={values.type}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="Key"
            name="key"
            onChange={onChange}
            value={values.key}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      { error && (
        <div className="ui error message" style={{ marginBottom: "2rem" }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  )
}

const CREATE_KEY_MUTATION = gql`
  mutation createKey($type: String!, $key: String, $address: String) {
    createKey(type:$type, key:$key, address:$address) {
      id
      type
      key 
      username
      confirmed
      active
      createdAt
    }
  }
`