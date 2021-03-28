import React from 'react'
import { Button, Item } from 'semantic-ui-react'
import DeleteButton from './Key/DeleteButton'

const KeyList = ({ keys, user }) => {

  function deleteKeyCallback() {
    props.history.push('/user')
  }

  return (
    <Item.Group relaxed divided>
      {
        (keys?.length === 0) ? (
          <span>no registered keys</span>
        ) : (
          keys?.map(userKey => (
            <Item key={userKey.id}>
              <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />    
              <Item.Content verticalAlign='middle'>
                <Item.Header>{userKey.type} ({userKey.key})</Item.Header>
                <Item.Description>{JSON.stringify(userKey)}</Item.Description>
                <Item.Extra>
                  {/* <DeleteButton keyId={userKey.id} userId={user.id} callback={deleteKeyCallback} /> */}
                  <Button color='google plus' floated="right" circular icon='delete' />
                  <Button color='linkedin' floated="right" circular icon='edit' />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))
        )
      }
    </Item.Group>
  )
}

export default KeyList