// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardDeck} from 'reactstrap';
import Navigator from '../top_navigator/navigatorContainer'
import './cardView.css'
import CardDetailView from "../car_detail/carDetailViewContainer";
import Moment from 'react-moment';
import Constants from '../../constants/constants'
import { Circle } from 'rc-progress';
const {API_ROOT,API_SERVER} = Constants;
import qs from 'qs';
type State = {
  username: string,
  password: string,
  secure: boolean,
};

type Props = {
  cars: any,
  getCarAllRequest: Function,
  loading: boolean,
};

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

class MainPageView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      index: 0,
      nowlist:[],
    };
  }
 componentDidMount() {
    this.props.getCarAllRequest().then(()=>{this.setState({
      nowlist: this.props.cars,
    })}).catch(e=>console.log(e));
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.state.nowlist.length
    ) {
      this.onPaginatedSearch();
    }
  }
  getParams(url) {
    var params = {};
    (url + '?').split('?')[1].split('&').forEach(function (pair) {
      pair = (pair + '=').split('=').map(decodeURIComponent);
      if (pair[0].length) {
        params[pair[0]] = pair[1];
      }
    });
    return params;
  };
  onPaginatedSearch(){
    let params = this.getParams(this.props.next);
    let paramsString = qs.stringify(params);
    this.props.getCarAllRequest(paramsString).then(()=>{
      this.setState({nowlist: this.state.nowlist.concat(this.props.cars)},console.log(this.state.nowlist,'nowlist'))
    }).catch((e)=>console.log(e));
  }
  dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  goToDetail(id){
    this.props.history.push({pathname: `/cars/${id}`})
  }
  render() {
    return (
      <div>
        <Navigator/>
        <div className="cnt2">
      <Container className="cnt1">
        {_.map(this.state.nowlist, ((listValue, index) => {
              if (index % 4 === 0) {
                return (
                  <Row key = {index} >
                    <Col md="7" sm="6" style={{display: "flex", justifyContent: "center"}}>
                      <CardDeck className="card1">
                        {
                          index + 4 > this.state.nowlist.length ?
                            _.map(this.state.nowlist.slice(index, this.state.nowlist.length), ((listValue, index) => {
                                const end_at = new Date(listValue.auction.end_at);
                                const started_at = new Date(listValue.auction.start_at);
                                const now = new Date();
                                const endToStart = this.dateDiffInDays(started_at, end_at);
                                const nowToStart = this.dateDiffInDays(started_at, now);
                                const progress = (nowToStart) / (endToStart);
                                return (
                                  <Card className="card2" body outline color="#ffe4a8" key={index}>
                                    <CardBody>
                                      <CardTitle>{listValue.detail.name}</CardTitle>
                                    </CardBody>
                                    <img width="100%" src={listValue.detail.main_image.url}
                                         alt="Card image cap"/>
                                    <CardBody>
                                      <Row>
                                        <Col>
                                          <Row>
                                            <Col>
                                              <Moment format="YYYY/MM">
                                                {listValue.detail.initial_registration_date}
                                              </Moment>
                                              <CardText>{listValue.detail.year}</CardText>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <CardText>{listValue.detail.mileage / 10000}만 km</CardText>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <CardText>{listValue.detail.location}</CardText>
                                            </Col>
                                          </Row>
                                        </Col>
                                        <Col>
                                          <Circle percent={progress} strokeWidth="4" strokeColor="#2E7DE1"/>
                                        </Col>
                                      </Row>
                                    </CardBody>
                                  </Card>)
                              })
                            )
                            :
                            _.map(this.state.nowlist.slice(index, index + 4), ((listValue, index2) => {
                              const end_at = new Date(listValue.auction.end_at);
                              const started_at = new Date(listValue.auction.start_at);
                              const now = new Date();
                              const endToStart = this.dateDiffInDays(started_at, end_at);
                              const nowToStart = this.dateDiffInDays(started_at, now);
                              const progress = (nowToStart) / (endToStart);
                                return (
                                  <Card className="card2" body outline color="#ffe4a8" key={index2}>
                                    <CardBody>
                                      <CardTitle>{listValue.detail.name}</CardTitle>
                                    </CardBody>
                                    <div key={index} onClick={()=>this.goToDetail(listValue.id)}>
                                      <img width="100%" src={_.get(listValue,['detail','main_image','url'])}
                                           alt="Card image cap"/>
                                    </div>
                                    <CardBody>
                                      <Row>
                                        <Col>
                                          <Row>
                                            <Col>
                                              <Moment format="YYYY/MM">
                                                {listValue.detail.initial_registration_date}
                                              </Moment>
                                              <CardText>{listValue.detail.year}</CardText>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <CardText>{listValue.detail.mileage / 10000}만 km</CardText>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <CardText>{listValue.detail.location}</CardText>
                                            </Col>
                                          </Row>
                                        </Col>
                                        <Col>
                                          <Circle percent={progress} strokeWidth="4" strokeColor="#2E7DE1"/>
                                        </Col>
                                      </Row>
                                    </CardBody>
                                  </Card>)
                              })
                            )
                        }
                      </CardDeck>
                    </Col>
                  </Row>
                )
              }
            }
          )
        )
        }
      </Container>
        </div>
      </div>
    );
  }
}

export default MainPageView
