import React from 'react'
import { Button, Item } from 'semantic-ui-react'

const KeyList = ({keys}) => {
  console.log(keys)

  return (
    <Item.Group relaxed divided>
      {
        keys?.map(userKey => (
          <Item key={userKey.id}>
            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />    
            <Item.Content verticalAlign='middle'>
              <Item.Header>{userKey.type} ({userKey.key})</Item.Header>
              <Item.Description>{JSON.stringify(userKey)}</Item.Description>
              <Item.Extra>
                <Button floated='right'>Action</Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))
      }
    </Item.Group>
  )
}

export default KeyList