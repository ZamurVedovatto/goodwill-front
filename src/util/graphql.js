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

export const FETCH_POSTS_QUERY = gql`
{
  getPosts {
    id
    body
    createdAt
    username
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

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`
