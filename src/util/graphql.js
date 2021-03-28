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
        value
        username
        address {
          code
        }
      }
    }
  }
`


export const FETCH_KEYS_QUERY = gql`
  query getKeys($userId: String!){
    getKeys(userId: $userId){
      id
      type
      confirmed
      active
      createdAt
      username
      value
    }
  }
`

export const CREATE_KEY_MUTATION = gql`
  mutation createKey($userId: ID!, $username: String!, $type: String!, $value: String!){
    createKey(userId: $userId, username:$username, type:$type, value:$value) {
      id
      type
      value
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

