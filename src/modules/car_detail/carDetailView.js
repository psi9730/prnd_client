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
      like:false,
      dateRemain: '',
    };
    autoBind(this);
  }
  componentDidMount() {
    this.countdown = setInterval(() => {
      this.setState({
        curTime: new Date()
      }, () => {
        const diff = this.getStringDateDiffInDays(this.state.curTime, new Date(this.props.endAt));
        this.setState({dateRemain: diff})
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.countdown);
  }
  componentWillMount() {
      this.props.getCarRequest(this.props.match.params.id).then(() => {
        _.forEach(this.props.images, (image, index) => {
          if (image.is_main === true) {
            this.setState({activeIndex: index});
          }
        });
      }).then(() => {
        const end_at = new Date(this.props.endAt);
        const started_at = new Date(this.props.startedAt);
        const now = new Date();
        const endToStart = this.dateDiffInDays(started_at, end_at);
        const nowToStart = this.dateDiffInDays(started_at, now);
        this.setState({progress: (nowToStart) / (endToStart) * 100});
      }).catch((e) => {
        this.setState({error: 'there is no car on this id'});
      });

  }
  selectImage(index) {
    this.setState({
      activeIndex: index,
    });
  }
  dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(),a.getHours(),a.getMinutes(),a.getSeconds());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  getStringDateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    var date = new Date();
    date.setTime(b-a);
    return date;
  }
  render() {
    const { activeIndex } = this.state;
    return (
      <div>
        {this.state.error ? this.state.error :
          <div ref="myRef">
            <Navigator />
              <div className="cnt2">
                <Container>
                  <Row>
                    <Col sm={9}>
                      <div className="cntt2" style={{height: 600}}>
                        <div className="mainImage">
                          <img src={_.get(_.nth(this.props.images, activeIndex), 'url')} style={{maxWidth:'100%', maxHeight:'480px'}} alt={'url'} />
                            { this.props.status === 'approved' ?
                              <div>
                                <div className="abs2">
                                  <img src={require('../../assets/images/white-circle.png')} style={{ height: 110, width: 110 }} alt={'url'} />
                                </div>
                                <div className="abs">
                                    <Circle
                                    percent={this.state.progress} style={{ height: 80, width: 80 }} strokeWidth="8"
                                    trailWidth="6"
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
                                    <img src={require('../../assets/images/white-circle.png')} style={{ height: 110, width: 110 }} alt={'url'} />
                                  </div>
                                  <div className="abs">
                                    <Circle
                                      percent={this.state.progress} style={{ height: 80, width: 80 }} strokeWidth="8"
                                      trailWidth="6"
                                      strokeColor="#29CC91"/>
                                  </div>
                                  <div className="abs3">
                                    선택대기
                                  </div>
                                  <div className="abs4">
                                    <Moment format="DD일 h시mm분ss초">
                                      {this.state.dateRemain}
                                    </Moment>
                                  </div>
                                </div> :
                                <div>
                                  <div className="abs2" style={{ top:25}}>
                                    <img src={require('../../assets/images/white-circle.png')} style={{height: 110, width: 110 }} alt={'url'} />
                                  </div>
                                  <div className="abs">
                                    <Circle
                                      percent={0} style={{ height: 80, width: 80 }} strokeWidth="8"
                                      trailWidth="4"
                                      strokeColor="#2E7DE1"/>
                                  </div>
                                  <span className="abs5" style={{fontSize:15}}>
                                    유효기간<br />만료
                                  </span>
                                </div>
                            )
                          }
                          </div>
                          <div className="cnttt1" style={{ flexBasis: 'auto', flexGrow: 1, flexShrink: 4, width: '100%' }}>
                          {
                            _.map(this.props.images, (image, index) => {
                              return (
                                index === activeIndex ?
                                  <div key={index} style={{border: '3px solid #2E7DE1', margin:'6px',width: '86px',
                                    height: '66px',alignItems: 'center' }}>
                                    <div key={index} className="row1" style={{display: 'flex',margin:0, cursor: 'pointer', justifyContent: 'center', width: '80px',
                                    height: '60px',alignItems: 'center'}}>
                                    <img  src={_.get(image, 'url')} style={{maxWidth:'80px', maxHeight:'60px'}} alt={_.get(image, 'url')} onClick={() => { this.selectImage(index); }} />
                                  </div>
                                  </div>
                                  :
                                  <div key={index} className="row1" style={{  width: '80px',
                                    height: '60px',display: 'flex',justifyContent: 'center',cursor: 'pointer', alignItems: 'center'}}>
                                    <img src={_.get(image, 'url')}  style={{maxWidth:'80px', maxHeight:'60px'}}  alt={_.get(image, 'url')} onClick={() => { this.selectImage(index); }} />
                                  </div>
                              );
                            })
                          }
                        </div>
                      </div>
                    </Col>
                    <Col sm={3} style={{backgroundColor: '#FAFAFA'}}>
                      <div className="cntt3">
                        <div className="cntt5" style={{ flexGrow: 0, flexShrink: 0, flexBasis: 'auto', backgroundColor: '#FFFFFF', marginTop: 10, marginBottom: 10 }}>
                          <div className="cntt1" style={{color: '#ABB9CC'}}>
                            {this.props.carNumber}
                          </div>
                          <div className="cnttt4" style={{color: '#ABB9CC'}}>
                            {this.props.visitsCount}명 조회
                          </div>
                        </div>
                        <div className="grayLine" />
                        <div className="cardTitle" style={{paddingRight: '15px',
                          paddingLeft: '15px',
                          paddingBottom:'2px',
                          paddingTop: '2px'}}>
                          {this.props.name}
                        </div>
                        <div className="cnttt4_1" style={{paddingRight: '15px',color: '#9093A8',
                          paddingLeft: '15px',
                          paddingBottom:'2px',
                          paddingTop: '2px'}}>
                          <Moment format="YYYY/MM" style={{fontSize:'12px',marginTop:0}}>
                            {this.props.initialRegistrationDate}
                          </Moment>
                          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <div style={{marginLeft:'5px',fontSize:'12px',  textAlign: 'center'}}>({this.props.year}년형)</div>
                          </div>
                        </div>
                        <div className="cardText" style={{paddingRight: '15px',color: '#9093A8',
                          paddingLeft: '15px',
                          paddingBottom:'2px',
                          paddingTop: '2px'}}>{this.props.mileage} km</div>
                        <div className="cardText" style={{paddingRight: '15px',color: '#9093A8',
                          paddingLeft: '15px',
                          paddingBottom:'2px',
                          paddingTop: '2px'}}>{this.props.fuel} / {this.props.transmission} / {this.props.color}</div>
                        <div className="cardText"style={{paddingRight: '15px',marginBottom: 20,color: '#9093A8',
                          paddingLeft: '15px',
                          paddingBottom:'2px',
                          paddingTop: '2px'}}>{this.props.location}</div>
                        <div className="grayLine" />
                        {this.props.status === 'approved' ?
                          <div className="cntt5" style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            flexBasis: 'auto',
                            backgroundColor: '#FFFFFF',
                            marginTop: 10,
                            marginBottom: 10
                          }}>
                            <div className="cntt1"
                                 style={{flexBasis: 'auto', flexGrow: 0, alignSelf: 'center', flexShrink: 0}}>
                              <div className="cnttt2">
                                {_.get(this.props.myBid, 'price') ?
                                  (<div>
                                    <span style={{color: '#9093A8', fontSize: '12px'}}>내 견적</span>
                                    <div
                                      style={{color: '#679CFF', fontSize: '12px'}}>{_.get(this.props.myBid, 'price')}만원
                                    </div>
                                  </div>) :
                                  <div style={{color: '#679CFF', paddingLeft: '6px'}}>
                                    {
                                      this.state.like ?
                                        <img src={require('../../assets/images/like.png')}
                                             onClick={() => this.setState({like: !this.state.like})}
                                             style={{height: 20, width: 20, cursor: 'pointer'}} alt={'url'}/> :
                                        <img src={require('../../assets/images/like1.png')}
                                             onClick={() => this.setState({like: !this.state.like})}
                                             style={{height: 20, width: 20, cursor: 'pointer'}} alt={'url'}/>
                                    }
                                  </div>
                                }
                              </div>
                            </div>
                            <div className="cnttt4" style={{flexBasis: 'auto', flexGrow: 1, flexShrink: 0,display:'flex',alignItems:'center'}}>
                              <Button className="btt11" style={{
                                backgroundColor: '#679CFF',
                                height: '30px',
                                paddingRight: '20px',
                                paddingLeft: '20px',
                                paddingTop: '3px',
                                paddingBottom: '3px',
                                borderWidth: 0
                              }}>{
                                _.get(this.props.myBid, 'price') ?
                                  <span style={{color: '#FFFFFF', fontSize: '12px'}}>매입견적 수정</span> :
                                  <span style={{color: '#FFFFFF', fontSize: '12px'}}>매입견적 놓기</span>
                              }
                              </Button>
                            </div>
                          </div>
                          :
                          <div className="cntt5" style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            flexDirection: 'column',
                            flexBasis: 'auto',
                            backgroundColor: '#FFFFFF',
                            marginTop: 10,
                            marginBottom: 10
                          }}>
                            <div style={{paddingBottom: '15px'}}>
                              <span style={{color: '#679CFF'}}>{this.props.bidsCount}</span><span>명 참여 경매결과</span>
                            </div>
                            <div className="cntt4" style={{flexBasis: 'auto', flexGrow: 1, flexShrink: 0}}>
                             <div className="cnttt2">
                               <div  className="priceText">
                                 선택가
                               </div>
                               {this.props.selectedBid ? <div className="priceText">
                                 {_.get(this.props.selectedBid, 'price')}
                               </div> : <div className="priceText"> - </div>
                               }
                             </div>
                              <div className="cnttt2">
                                <div  className="priceText">
                                  최고가
                                </div>
                                {this.props.highestBid ? <div  className="priceText">
                                  {_.get(this.props.highestBid, 'price')}
                                </div> : <div  className="priceText"> - </div>
                                }
                              </div>
                              <div className="cnttt2">
                                <div  className="priceText">
                                  내견적
                                </div>
                                {this.props.myBid ? <div  className="priceText">
                                  {_.get(this.props.myBid, 'price')}
                                </div> : <div  className="priceText"> - </div>
                                }
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                      <div className="cntt5" style={{ flexGrow: 0, flexShrink: 0, flexBasis: 'auto', backgroundColor: '#FAFAFA', marginTop: 10, marginBottom: 10 }}>
                        <div className="cntt1" style={{ flex:1, fontSize: 12, backgroundColor: '#FAFAFA'}}>
                      차량정보가 잘못되었나요?
                        </div>
                        <div className="cntt4" style={{ flexBasis:'auto', flexGrow:0, flexShrink:0, color: '#679CFF', fontSize: 12, backgroundColor: '#FAFAFA',  textDecoration: 'underline'}}>
                      신고하기
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
