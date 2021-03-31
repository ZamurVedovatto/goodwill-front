import _ from 'lodash'
import faker from 'faker'
import React from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

// const source = _.times(5, () => ({
//   title: faker.internet.userName(),
//   description: faker.lorem.words(5),
//   image: faker.random.image(),
// }))

const initialState = {
  loading: false,
  results: [],
  value: '',
}

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      console.log(action)
      return { ...state, value: action.selection }
    default:
      throw new Error()
  }
}

function SearchComponent({ setTargetKey, keys }) {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value } = state

  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result) => re.test(result.title)

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(keys, isMatch),
      })
    }, 300)
  }, [])
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const onSetSelection = (value) => {
    let event = {
      target: {
        name: "targetKey",
        value
      }
    }
    setTargetKey(event)
    dispatch({ type: 'UPDATE_SELECTION', selection: value })
  }

  return (
    <Grid>
      <Grid.Column width={12}>
        {/* {JSON.stringify(results)} */}
        <Search
          loading={loading}
          // onResultSelect={(e, data) =>
          //   dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
          // }
          onResultSelect={(e, data) => onSetSelection(data.result.title)}
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </Grid.Column>


      {/* <Grid.Column width={10}>
        <Segment>
          <Header>State</Header>
          <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify({ loading, results, value }, null, 2)}
          </pre>
          <Header>Options</Header>
          <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify(keys, null, 2)}
          </pre>
        </Segment>
      </Grid.Column> */}
    </Grid>
  )
}

export default SearchComponent