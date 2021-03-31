import gql from 'graphql-tag'

export const LOGIN_USER = gql `
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ){
      user {
        email
        username
        id
        token
        name
        createdAt
      }
      keys {
        id
        type
        confirmed
        active
        title
        username
        address {
          code
        }
      }
    }
  }
`


export const FETCH_USER_KEYS_QUERY = gql`
  query getUserKeys($userId: String!){
    getUserKeys(userId: $userId){
      id
      type
      confirmed
      active
      createdAt
      username
      title
    }
  }
`


export const FETCH_KEYS_QUERY = gql`
  {
    getKeys {
      id
      type
      confirmed
      active
      createdAt
      username
      title
    }
  }
`


export const CREATE_KEY_MUTATION = gql`
  mutation createKey($userId: ID!, $username: String!, $type: String!, $title: String!){
    createKey(userId: $userId, username:$username, type:$type, title:$title) {
      id
      type
      title
      confirmed
      active
      userId
      username
      address {
        code
      }
    }
  }
`

export const DELETE_KEY_MUTATION = gql`
  mutation deleteKey($userId: ID!, $keyId: ID!) {
    deleteKey(userId: $userId, keyId: $keyId)
  }
`

export const TOGGLE_ACTIVE_KEY_MUTATION = gql`
  mutation toggleActiveKey($userId: ID!, $keyId: ID!){
    toggleActiveKey(userId: $userId, keyId: $keyId){
      id
      type
      title
      confirmed
      active
      userId
      username
      address {
        code
      }
    }
  }
`


export const FETCH_MESSAGES_QUERY = gql`
{
  getMessages {
    id
    modality
    targetKey
    body
    senderId
    createdAt
    likeCount
    likes {
      id
      username
    }
    commentCount
    comments {
      id
      username
      createdAt
      body
    }
  }
}
`

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($modality: String!, $targetKey: String!, $body: String!) {
    createMessage(modality: $modality, targetKey: $targetKey, body: $body) {
      id
      modality
      targetKey
      body
      senderId
      createdAt
    }
  }
`

export const FETCH_MESSAGE_QUERY = gql`
  query($messageId: ID!) {
    getMessage(messageId: $messageId) {
      id
      modality
      targetKey
      body
      senderId
      createdAt
      likeCount
      likes {
        id
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`

export const LIKE_MESSAGE_MUTATION = gql`
  mutation likeMessage($messageId: ID!){
    likeMessage(messageId: $messageId){
      id
      likes{
        id
        username
      }
      likeCount
    }
  }
`