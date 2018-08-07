import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import MainPageView from './mainPageView'

export default connect(
  state => ({
    cards: _.get(state, ['main', 'cards']),
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
