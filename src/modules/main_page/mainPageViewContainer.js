import { connect } from 'react-redux';
import _ from 'lodash';
import { compose, withHandlers } from 'recompose';
import actions from '../../store/actions';
import MainPageView from './mainPageView';
import { withRouter } from 'react-router-dom';

export default withRouter(connect(
  state => ({
    cars: _.get(state, ['main', 'cars']),
    next: _.get(state, ['main', 'next']),
    brands: _.get(state, ['main', 'brands']),
    groups: _.get(state, ['main', 'groups']),
    models: _.get(state, ['main', 'models']),
    brandValue: _.get(state, ['main', 'brandValue']),
    groupValue: _.get(state, ['main', 'groupValue']),
    modelValue: _.get(state, ['main', 'modelValue']),
    brandIndex: _.get(state, ['main', 'brandIndex']),
    groupIndex: _.get(state, ['main', 'groupIndex']),
    modelIndex: _.get(state, ['main', 'modelIndex']),
    isBrandChecked: _.get(state, ['main', 'isBrandChecked']),
    isGroupChecked: _.get(state, ['main', 'isGroupChecked']),
    isModelChecked: _.get(state, ['main', 'isModelChecked']),
    count: _.get(state, ['main', 'count']),
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
);
