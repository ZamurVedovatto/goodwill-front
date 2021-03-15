import React from 'react'
import { Popup} from 'semantic-ui-react'

export default function CustomPopup({ content, children }) {
  return (
    <Popup
      content={content}
      inverted={true}
      trigger={children}
    />
  )
}
