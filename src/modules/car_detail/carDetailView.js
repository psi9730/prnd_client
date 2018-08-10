import React, { Component } from 'react';
import { Container, Button,
  Card, CardBody, CardTitle, CardText, CardSubtitle, Col, Row, Input, Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption } from 'reactstrap';
import autoBind from 'react-autobind';
import Moment from 'react-moment';
import _ from 'lodash';
import { Circle } from 'rc-progress';
import './carDetailView.css';
import Navigator from '../top_navigator/navigatorContainer';

type State = {
};

type Props = {
  getCarRequest: Function,

};

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

class CarDetailView extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      activeIndex: 0,
      progress: 0,
      dateRemain: '',
    };
    autoBind(this);
  }
  componentWillMount() {
    this.props.getCarRequest(this.props.match.params.id).then(() => {
      _.forEach(this.props.images, (image, index) => {
        if (image.is_main === true) {
          console.log(this.state.activeIndex);
          this.setState({ activeIndex: index });
        }
      });
    }).then(() => {
      const end_at = new Date(this.props.endAt);
      const started_at = new Date(this.props.startedAt);
      const now = new Date();
      const endToStart = this.dateDiffInDays(started_at, end_at);
      const nowToStart = this.dateDiffInDays(started_at, now);
      const diff = this.getStringDateDiffInDays(now, end_at);
      this.setState({ progress: (nowToStart) / (endToStart) * 100, dateRemain: diff });
    }).catch((e) => {
      this.setState({ error: 'there is no car on this id' });
    });
  }
  selectImage(index) {
    this.setState({
      activeIndex: index,
    });
  }
  dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  getStringDateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    const date = new Date();
    date.setTime(utc2 - utc1);
    console.log(date, 'date');
    return date;
  }
  render() {
    const { activeIndex } = this.state;
    return (
      <div>
        {this.state.error ? this.state.error :
          <div>
          <Navigator />
            <div className="cnt2">
              <Container>
                <Row>
                  <Col sm={9}>
                    <div className="cnt2">
                      <div className="mainImage">
                        <img src={_.get(_.nth(this.props.images, activeIndex), 'url')} width="100%" height="450" alt={'url'} />
                          { this.props.status === 'approved' ?
                            <div>
                              <div className="abs2">
                                <img src={require('../../assets/images/white-circle.png')} style={{ height: 120, width: 120 }} alt={'url'} />
                              </div>
                              <div className="abs">
                                  <Circle
                                  percent={this.state.progress} style={{ height: 80, width: 80 }} strokeWidth="8"
                                  strokeColor="#2E7DE1"/>
                              </div>
                              <div className="abs3">
                                    {this.props.bidsCount}명
                              </div>
                              <div className="abs4">
                                  <Moment format="DD일 h시mm분ss초">
                                    {this.state.dateRemain}
                                  </Moment>
                              </div>
                            </div>
                          : (
                            this.props.status === 'ended' ?
                              <div>
                                <div className="abs2">
                                  <img src={require('../../assets/images/yellow-circle.png')} style={{ height: 120, width: 120 }} alt={'url'} />
                                </div>
                                <span className="abs5">
                                경매가<br />종료되었습니다.
                                </span>
                              </div> :
                              <div>
                                <div className="abs2">
                                  <img src={require('../../assets/images/red-circle.png')} style={{ height: 120, width: 120 }} alt={'url'} />
                                </div>
                                <span className="abs5">
                                  경매가<br />만료되었습니다.
                                </span>
                              </div>
                          )
                        }
                        </div>
                        <div className="cnt1" style={{ flexBasis: 'auto', flexGrow: 1, flexShrink: 4, width: '100%' }}>
                        {
                          _.map(this.props.images, (image, index) => {
                            return (
                              index === activeIndex ?
                                <div key={index} className="row1">
                                  <img style={{ border: '3px solid #2E7DE1' }} src={_.get(image, 'url')} width="60" height="60" alt={_.get(image, 'url')} onClick={() => { this.selectImage(index); }} />
                                </div>
                                :
                                <div key={index} className="row1">
                                  <img src={_.get(image, 'url')} width="60" height="60" alt={_.get(image, 'url')} onClick={() => { this.selectImage(index); }} />
                                </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="cnt3">
                        <div className="cnt5" style={{ flexGrow: 0, flexShrink: 0, flexBasis: 'auto', backgroundColor: '#FFFFFF', marginTop: 10, marginBottom: 10 }}>
                          <div className="cnt1">
                          {this.props.carNumber}
                        </div>
                              <div className="cnt4">
                          {this.props.visitsCount}명 조회
                        </div>
                      </div>
                      <div className="grayLine" />
                      <div className="cardTitle">
                        {this.props.name}
                      </div>
                      <Moment format="YYYY/MM" style={{ fontSize: 12 }}>
                        {this.props.initialRegistrationDate}
                      </Moment>
                      <div className="cardText">({this.props.year}년형)</div>
                      <div className="cardText">{this.props.mileage / 10000}만 km</div>
                      <div className="cardText">{this.props.fuel} / {this.props.transmission} / {this.props.color}</div>
                      <div className="cardText" style={{ marginBottom: 20 }}>{this.props.location}</div>
                      <div className="grayLine" />
                      <div className="cnt5" style={{ flexGrow: 0, flexShrink: 0, flexBasis: 'auto', backgroundColor: '#FFFFFF', marginTop: 10, marginBottom: 10 }}>
                        <div className="cnt1">
                          <div className="cnt2">
                            <div>내 견적</div>
                            {_.get(this.props.myBid, 'price') ?
                              <div style={{ color: '#2E7DE1' }}>{_.get(this.props.myBid, 'price')}만원</div> :
                              <div style={{ color: '#2E7DE1' }}>0만원</div>
                            }
                            </div>
                        </div>
                        <div className="cnt4">
                          <Button className="btt11" style={{ backgroundColor: '#2E7DE1', borderWidth: 0 }} >{
                            <span style={{ color: '#FFFFFF' }}>매입견적 수정</span>
                          }
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="cnt5" style={{ flexGrow: 0, flexShrink: 0, flexBasis: 'auto', backgroundColor: '#FFFFFF', marginTop: 10, marginBottom: 10 }}>
                        <div className="cnt1" style={{ fontSize: 12 }}>
                    차량정보가 잘못되었나요?
                        </div>
                        <div className="cnt4" style={{ color: '#2E7DE1', fontSize: 12 }}>
                    신고하기
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        }
      </div>
    );
  }
}
export default CarDetailView;
