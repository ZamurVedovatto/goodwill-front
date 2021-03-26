import { useQuery } from '@apollo/client'
import { FETCH_POSTS_QUERY } from './../util/graphql'
import React from 'react'

export default function Test() {
  const { loading, error, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY)
  if (error) return <span>{error}</span>
  if (loading || !posts) return <span>{loading}</span>
  
  return (
    posts.map(post => <p key={post.id}>{post.body}</p>)
  )
}
