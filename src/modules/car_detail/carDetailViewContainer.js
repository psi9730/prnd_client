import { connect } from 'react-redux';
import _ from 'lodash';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import actions from '../../store/actions';
import CarDetailView from './carDetailView';

export default withRouter(connect(
  state => ({
    name: _.get(state, ['cars', 'name']),
    location: _.get(state, ['cars', 'location']),
    carNumber: _.get(state, ['cars', 'carNumber']),
    year: _.get(state, ['cars', 'year']),
    fuel: _.get(state, ['cars', 'fuel']) === 'gasoline' ? ('가솔린') : (_.get(state, ['cars', 'fuel']) === 'diesel' ? ('디젤') : (_.get(state, ['cars', 'fuel']) === 'hybrid' ? ('하이브리드') : _.get(state, ['cars', 'fuel']) === 'electric' ? '전기' : '바이퓨얼')),
    color: _.get(state, ['cars', 'color']),
    mileage: _.get(state, ['cars', 'mileage']),
    transmission: _.get(state, ['cars', 'transmission']) === 'auto' ? '오토' : '수동',
    initialRegistrationDate: _.get(state, ['cars', 'initialRegistrationDate']),
    images: _.get(state, ['cars', 'images']),
    mainImage: _.get(state, ['cars', 'mainImage']),
    startedAt: _.get(state, ['cars', 'startedAt']),
    endAt: _.get(state, ['cars', 'endAt']),
    status: _.get(state, ['cars', 'status']),
    myBid: _.get(state, ['cars', 'myBid']),
    bidsCount: _.get(state, ['cars', 'bidsCount']),
    visitsCount: _.get(state, ['cars', 'visitsCount']),

  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    CarDetailView
  )
)
);
