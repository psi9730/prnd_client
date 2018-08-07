import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import navigator from './navigator'
import { withRouter } from 'react-router-dom';

export default withRouter(connect(
  state => ({
    username: _.get(state, ['login','username']),
  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    navigator
  )
))
