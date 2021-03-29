import React, { useContext } from 'react'
import { Button, Form, Container, Grid } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client'
import { useForm } from './../../util/hooks'
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION, FETCH_KEYS_QUERY } from './../../util/graphql'
import SearchComponent from './SearchComponent'
import { AuthContext } from './../../context/auth'

export default function PostForm() {
  const { user } = useContext(AuthContext)
  const { loading, data: { getKeys: keys } = {}} = useQuery(FETCH_KEYS_QUERY)


  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  })
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    onError(err) {
      return err;
    },
  });
  function createPostCallback() {
    createPost()
  }

  return (
    <Container className="container-wrapper">
      {JSON.stringify(keys)}
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Form onSubmit={onSubmit}>
              <h2>Send message</h2>
              {
                (!loading && keys) ? (
                  <Form.Field>
                    <SearchComponent keys={keys} />
                  </Form.Field>
                ) : (
                  <span>loading</span>
                )
              }
              <Form.Field>
                <Form.Input
                  placeholder="Hi World"
                  name="body"
                  onChange={onChange}
                  value={values.body}
                  error={error ? true : false}
                />
                <Button type="submit" color="teal">
                  Submit
                </Button>
              </Form.Field>
            </Form>
            { error && (
              <div className="ui error message" style={{ marginBottom: "2rem" }}>
                <ul className="list">
                  <li>{error.graphQLErrors[0].message}</li>
                </ul>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}