import React from 'react'
import { Button, Image, Item } from 'semantic-ui-react'

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

const KeyList = () => (
  <Item.Group relaxed divided>
    <Item>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

      <Item.Content verticalAlign='middle'>
        <Item.Header>Content A</Item.Header>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Button floated='right'>Action</Button>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/justen.jpg' />

      <Item.Content verticalAlign='middle'>
        <Item.Header>Content B</Item.Header>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Button floated='right'>Action</Button>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

      <Item.Content verticalAlign='middle'>
        <Item.Header>Content C</Item.Header>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Button floated='right'>Action</Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
)

export default KeyList