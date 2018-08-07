import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import CardDetailView from './carDetailView'

export default connect(
  state => ({
    pet: _.get(state,["cars","pet"]),
    owner: _.get(state,["cars","owner"]),
    title: _.get(state,["cars","title"]),
    pictures: _.get(state,["cars","pictures"]),
    text: _.get(state,["cars","text"]),
    like: _.get(state,["cars","like"]),
    created: _.get(state,["cars","created"]),
    comments: _.get(state,["cars","comments"]),
    loading: _.get(state, ['cars', 'loading']),
  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    CardDetailView
  )
)
