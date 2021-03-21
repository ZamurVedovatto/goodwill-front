import React, { useState, useEffect } from 'react'
import { Button, Select, Modal, Form, Icon } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

function KeyAddModal() {
  const [open, setOpen] = React.useState(false)
  const [type, setType] = useState('plate')
  const [key, setKey] = useState('')

  const typeOptions = [
    { key: 'plate', value: 'plate', text: 'Plate' },
    { key: 'address', value: 'address', text: 'Address' },
    { key: 'cellphone', value: 'cellphone', text: 'Cellphone' },
  ]


  const onChangeSelect = (e) => {
    let type = (e.target.innerText).toLowerCase();
    setType(type)
  }

  const [createKey, { error }] = useMutation(CREATE_KEY_MUTATION, {
    variables: {type, key},
    onError(err) {
      return err;
    },
  });

  function onAddKey() {
    createKey()
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button>
          <Icon name='add' style={{margin: 0}} />
        </Button>
      }
    >
      <Modal.Header>Add Key</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Select onChange={(e) => onChangeSelect(e)} placeholder='Select the type' options={typeOptions} />
          </Form.Field>
          <Form.Field>
            <label>Key</label>
            <input onChange={(e) => setKey(e.target.value)} placeholder='Key' />
          </Form.Field>
        </Form>
        
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Add"
          labelPosition='right'
          icon='checkmark'
          onClick={() => onAddKey()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default KeyAddModal

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