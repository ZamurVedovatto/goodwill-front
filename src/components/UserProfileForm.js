import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const UserProfileForm = ({user}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [])

  return (
    <Form loading={loading}>
      <Form.Field>
        <label>Username</label>
        <input placeholder={user.username} />
      </Form.Field>
      <Form.Field>
        <label>Name</label>
        <input placeholder={user.name ? user.name : 'Name'} />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}


export default UserProfileForm