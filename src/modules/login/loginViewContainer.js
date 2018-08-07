import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import LoginView from './loginView'

export default connect(
  state => ({
    loading: _.get(state, ['login', 'loading']),
  }),
  actions,
)(
  compose(
  )(
    LoginView
  )
)
