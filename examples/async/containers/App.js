import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit, updatePosition } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Stage from '../components/Stage'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedReddit } = this.props
    this.props.dispatch(updatePosition())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleUpdate(pos) {
    this.props.dispatch(updatePosition(pos));
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0

    console.log(this.props);
    return (
      <div>
        <Stage { ...this.props } handleUpdate={ this.handleUpdate }/>
      </div>
    )
  }
}

App.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit, position } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated,
    position
  }
}

export default connect(mapStateToProps)(App)
