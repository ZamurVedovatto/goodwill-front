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

export const FETCH_KEYS_QUERY = gql`
{
  getKeys {
    id
    type
    confirmed
    active
    createdAt
    username
    key
  }
}
`

export const FETCH_USER_KEYS_QUERY = gql`
  mutation getUserKeys($username: String!){
    getUserKeys(username: $username){
      id
      type
      confirmed
      active
      createdAt
      username
      key
    }
  }
`