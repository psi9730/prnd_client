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
  brands: any,
  groups: any,
  models: any,
  brandValue: string,
  groupValue: string,
  modelValue: string,
  brandIndex: number,
  groupIndex: number,
  modelIndex: number,
  isBrandChecked: boolean,
  isGroupChecked: boolean,
  isModelChecked: boolean,
  cars: any,
  order: string,
  getBrandRequest: Function,
  getModelGroupsRequest: Function,
  getModelsRequest: Function,
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
      selectedOption2: '공매',
      nowlist:[],
    };
  }
  componentWillMount(){
    const search_ = this.props.location.search;
    let search;
    search_ && (search=qs.parse(search_.slice(1,search_.length)));
    console.log(search,'search');
    _.get(search,['order']) && this.props.setOrderRequest(search.order)
      this.props.getBrandsRequest().then(()=>{
        let index;
        console.log(_.get(search,['brand']),'here');
        _.get(search,['brand']) && (index = _.findIndex(this.props.brands,function(brand){
          if(brand.id===_.get(search,['brand']))
            return true;
        }));
        console.log(index);
        index!==-1 && _.get(search,['brand']) && this.props.setBrandRequest(_.nth(this.props.brands,index).id, index).then(()=>{
              this.props.getModelGroupsRequest( _.get(search,['model_group'])).then(()=>{
                let groupIndex;
                _.get(search,['model_group']) && (groupIndex = _.findIndex(this.props.groups,function(group){
                  if(group.id===_.get(search,['group']))
                    return true;
                }));
                _.get(search,['model_group']) && this.props.setGroupRequest(_.nth(this.props.groups,groupIndex).id, groupIndex).then(()=>{
                  this.props.getModelsRequest(_.get(search,['model'])).then(()=>{
                    let modelIndex;
                    _.get(search,['model']) && (modelIndex = _.findIndex(this.props.models,function(model){
                      if(model.id===_.get(search,['model']))
                        return true;
                    }));
                    _.get(search,['model']) && this.props.setModelRequest(_.nth(this.props.models, modelIndex).id, modelIndex).catch((e)=>console.log(e))
                  }).catch((e)=>console.log(e))
                }).catch((e)=>console.log(e))
              }).catch((e)=>console.log(e))
            }).catch((e)=>console.log(e))
      }).then(()=> {
      this.props.getCarAllRequest("?"+qs.stringify(search)).then(() => {
        this.setState({
          nowlist: this.props.cars,
        })
      }).catch(e => console.log(e));
    })
  }
  componentDidMount() {
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
    console.log(params,'params');
    paramsString && this.props.getCarAllRequest(paramsString).then(()=>{
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
  getCarsRequest(){
      let jsonObject={};
      this.props.groupValue && (jsonObject.model_group=this.props.groupValue);
      this.props.modelValue && (jsonObject.model=this.props.modelValue);
      this.props.brandValue && (jsonObject.brand=this.props.brandValue);
      this.props.order && (jsonObject.order=this.props.order);
      console.log(jsonObject,'jsonObject');
      this.props.getCarAllRequest('?'+qs.stringify(jsonObject)).then(()=>{
        console.log("i will push");
        this.setState({
          nowlist: this.props.cars,
        })
        qs.stringify(jsonObject) ?
        this.props.history.push({
        pathname: `/homepage/?${qs.stringify(jsonObject)}`
      }):
          this.props.history.push({
            pathname: `/homepage/`
      })
    }).catch((e)=>console.log(e))
  }
  handleGroupChange(event){
    const target = event.target;
    const value = target.value;
    const index = target.name;
    if(this.props.isGroupChecked && this.props.groupValue===value){
      this.props.setGroupRequest(null,-1,false).then(()=>this.props.setModelRequest(null,-1,false)).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
    }
    else{
      this.props.getModelsRequest(value).then(()=> {
        this.props.setGroupRequest(value, index, true).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
      }).catch((e)=>console.log(e))
    }
  }
  handleModelChange(event){
    const target = event.target;
    const value = target.value;
    const index = target.name;
    if(this.props.isModelChecked && this.props.modelValue===value){
      this.props.setModelRequest(null,-1,false).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
    }
    else{
        this.props.setModelRequest(value, index, true).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
    }
  }
  handleBrandChange(event){
    const target = event.target;
    const value = target.value;
    const index = target.name;
    if(this.props.isBrandChecked && this.props.brandValue===value){
      this.props.setBrandRequest(null,-1,false).then(()=>this.props.setGroupRequest(null,-1,false)).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
    }
    else{
      this.props.getModelGroupsRequest(value).then(()=> {
        this.props.setBrandRequest(value, index, true).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
      }).catch((e)=>console.log(e))
    }
  }
  render() {
    return (
      <div>
        <Navigator/>
        <div className="cnt2">
          <div className="navLeft">
            <Button className="btt1" style={{backgroundColor: 'white', borderWidth:0}} onClick={() => this.goToBargain()}>
                {
                  this.state.selectedOption2 === '일반' ?
                    <div className="bttStyle1">
                <span
                  style={{ color: '#2E7DE1' }}
                >일반</span><span className='bottomLine'/>
                    </div>: <div className="bttStyle1"><span
                  style={{ color: 'gray' }}
                >일반</span>
                    </div>
                }
            </Button>
            <Button className="btt1"  style={{backgroundColor: 'white', borderWidth:0}} onClick={() => this.goToBargain()}>{
              this.state.selectedOption2 === '공매' ?
                <div className="bttStyle1">
                <span
                  style={{ color: '#2E7DE1' }}
                >공매</span><span className='bottomLine'/>
                </div>: <div className="bttStyle1"><span
                  style={{ color: 'gray' }}
                >공매</span>
                </div>
            }
            </Button>
            <Button className="btt1"  style={{backgroundColor: 'white', borderWidth:0}} onClick={() => this.goToBargain()}>{
              this.state.selectedOption2 === '찜' ?
                <div className="bttStyle1">
                <span
                  style={{ color: '#2E7DE1' }}
                >찜</span><span className='bottomLine'/>
                </div>: <div className="bttStyle1"><span
                  style={{ color: 'gray' }}
                >찜</span>
                </div>
            }
            </Button>
          </div>
      <Container className="cnt1">
        <Row>
          <Col className="cnt3" xs="auto">
            <form style={{backgroundColor: 'C9D5E1', padding:10}}>
              <div className='title'>
                브랜드/등급/모델
              </div>
              {
                this.props.brands &&
                _.map(this.props.brands,((brand,brandIndex)=>{
                  return(
                    <div key={brandIndex}>
                      <div className='brand'>
                        <div className="input">
                        <input
                          name={brandIndex}
                          value={brand.id}
                          type="checkbox"
                          checked={this.props.brandIndex===brandIndex.toString()}
                          onChange={this.handleBrandChange}
                        />
                        </div>
                          <div className='center'><span className='text1'>{' '} {brand.name}</span> <span className='text2'>{brand.auctions_count}</span></div>
                      </div>
                      {
                        this.props.isBrandChecked && this.props.brandIndex===brandIndex.toString() && <div className='grayLine'/>
                      }
                      {
                        this.props.isBrandChecked && this.props.brandIndex===brandIndex.toString() && _.map(this.props.groups,((group,groupIndex)=>{
                          return(
                            <div key={groupIndex}>
                              <div className='group'>
                                <div className="input">
                                <input
                                  name={groupIndex}
                                  value={group.id}
                                  type="checkbox"
                                  checked={this.props.groupIndex===groupIndex.toString()}
                                  onChange={this.handleGroupChange} /></div>
                                <div className='center'><span className='text1'>{' '} {group.name}</span> <span className='text2'>{group.auctions_count}</span></div>
                              </div>
                              {
                                this.props.isGroupChecked && this.props.groupIndex===groupIndex.toString() && <div className='grayLine'/>
                              }
                              {
                                this.props.isGroupChecked && this.props.groupIndex===groupIndex.toString() && _.map(this.props.models,((model,modelIndex)=>{
                                  return(
                                    <div key={modelIndex}>
                                      <div  className='model'>
                                        <div className="input">
                                        <input
                                          name={modelIndex}
                                          value={model.id}
                                          type="checkbox"
                                          checked={this.props.modelIndex===modelIndex.toString()}
                                          onChange={this.handleModelChange} />
                                        </div>
                                        <div className='center'><span className='text1'>{' '} {model.name}</span> <span className='text2'>{model.auctions_count}</span></div>
                                      </div>
                                    </div>
                                  )
                                }))
                              }
                            </div>
                          )
                        }))
                      }
                    </div>
                  )
                }))
              }
            </form>
          </Col>
          <Col style={{backgroundColor: 'green'}}>
        {_.map(this.state.nowlist, ((listValue, index) => {
              if (index % 4 === 0) {
                return (
                    <Col md="3" sm="2" style={{display: "flex", justifyContent: "center"}}>
                      <CardDeck className="card1">
                        {
                          index + 4 > this.state.nowlist.length ?
                            _.map(this.state.nowlist.slice(index, this.state.nowlist.length), ((listValue, index) => {
                                const end_at = new Date(listValue.auction.end_at);
                                const started_at = new Date(listValue.auction.started_at);
                                const now = new Date();
                              console.log(end_at)
                              console.log(started_at)
                              console.log(now)
                                const endToStart = this.dateDiffInDays(started_at, end_at);
                                const nowToStart = this.dateDiffInDays(started_at, now);
                              console.log(nowToStart)
                                console.log(endToStart)
                                const progress = (nowToStart) / (endToStart) * 100;
                                return (
                                  <Card className="card2" body outline color="#ffe4a8" key={index}>
                                    <img width="100%" src={listValue.detail.main_image.url}
                                         alt="Card image cap"/>
                                    <CardBody>
                                      <CardTitle>{listValue.detail.name}</CardTitle>
                                    </CardBody>
                                    <CardBody>
                                      <Row>
                                        <Col>
                                          <Row>
                                            <Col>
                                              <Moment format="YYYY/MM">
                                                {listValue.detail.initial_registration_date}
                                              </Moment>
                                              <CardText>({listValue.detail.year}년형)</CardText>
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
                                        <Col className='center2'>
                                              <Circle percent={progress} sytle={{height:30, width:30}} strokeWidth="4" strokeColor="#2E7DE1"/>
                                          <div className='abs'>
                                            {listValue.auction.bids_count}
                                          </div>
                                        </Col>
                                      </Row>
                                    </CardBody>
                                  </Card>)
                              })
                            )
                            :
                            _.map(this.state.nowlist.slice(index, index + 4), ((listValue, index2) => {
                              const end_at = new Date(listValue.auction.end_at);
                              const started_at = new Date(listValue.auction.started_at);
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
                )
              }
            }
          )
        )
        }
          </Col>
        </Row>
      </Container>
        </div>
      </div>
    );
  }
}

export default MainPageView
