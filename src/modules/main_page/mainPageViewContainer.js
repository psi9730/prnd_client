import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import MainPageView from './mainPageView'

export default connect(
  state => ({
    cars: _.get(state, ['main', 'cars']),
    next: _.get(state,['main','next']),
  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    MainPageView
  )
)
