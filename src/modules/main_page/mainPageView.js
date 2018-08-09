// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardDeck} from 'reactstrap';
import qs from 'qs';
import { Circle } from 'rc-progress';
import './cardView.css'
import Moment from 'react-moment';
import Navigator from '../top_navigator/navigatorContainer'

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
          console.log(brand);
          if(brand.id.toString()===_.get(search,['brand']).toString())
            return true;
        }));
        console.log(index);
        index!==-1 && _.get(search,['brand']) && this.props.setBrandRequest(_.nth(this.props.brands,index).id, index,true).then(()=>{
              this.props.getModelGroupsRequest( _.get(search,['brand'])).then(()=>{
                let groupIndex;
                _.get(search,['model_group']) && (groupIndex = _.findIndex(this.props.groups,function(group){
                  if(group.id.toString()===_.get(search,['model_group']).toString())
                    return true;
                }));
                _.get(search,['model_group']) && this.props.setGroupRequest(_.nth(this.props.groups,groupIndex).id, groupIndex,true).then(()=>{
                  this.props.getModelsRequest(_.get(search,['model_group'])).then(()=>{
                    let modelIndex;
                    _.get(search,['model']) && (modelIndex = _.findIndex(this.props.models,function(model){
                      if(model.id.toString()===_.get(search,['model']).toString())
                        return true;
                    }));
                    _.get(search,['model']) && this.props.setModelRequest(_.nth(this.props.models, modelIndex).id, modelIndex,true).catch((e)=>console.log(e))
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
    paramsString && this.props.getCarAllRequest("?"+paramsString).then(()=>{
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
        this.props.setGroupRequest(value, index, true).then(()=>this.props.setModelRequest(null,-1,false)).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
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
  goToTop(){
    this.getCarsRequest();
    window.scrollTo(0, 0)
  }
  handleBrandChange(event){
    const target = event.target;
    const value = target.value;
    const index = target.name;
    if(this.props.isBrandChecked && this.props.brandValue===value){
      this.props.setBrandRequest(null,-1,false).then(()=>this.props.setGroupRequest(null,-1,false)).then(()=>this.props.setModelRequest(null,-1,false)).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
    }
    else{
      this.props.getModelGroupsRequest(value).then(()=> {
        this.props.setBrandRequest(value, index, true).then(()=>this.props.setGroupRequest(null,-1,false)).then(()=>this.props.setModelRequest(null,-1,false)).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
      }).catch((e)=>console.log(e))
    }
  }
  goToDetail(id){
    this.props.history.push({   pathname: `/cars/${id}`});
  }
  render() {
    return (
      <div>
        <Navigator/>
        <div className="cnt2">
          <img className="scroll" onClick={()=>this.goToTop()} src={require('../../assets/images/go_up.png')} alt="Card image cap"/>
          <Container>
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
          </Container>
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
                          checked={this.props.brandIndex.toString()===brandIndex.toString()}
                          onChange={this.handleBrandChange}
                        />
                        </div>
                          <div className='center'><span className='text1'>{' '} {brand.name}</span> <span className='text2'>{brand.auctions_count}</span></div>
                      </div>
                      {
                        this.props.isBrandChecked && this.props.brandIndex.toString()===brandIndex.toString() && <div className='grayLine'/>
                      }
                      {
                        this.props.isBrandChecked && this.props.brandIndex.toString()===brandIndex.toString() && _.map(this.props.groups,((group,groupIndex)=>{
                          return(
                            <div key={groupIndex}>
                              <div className='group'>
                                <div className="input">
                                <input
                                  name={groupIndex}
                                  value={group.id}
                                  type="checkbox"
                                  checked={this.props.groupIndex.toString()===groupIndex.toString()}
                                  onChange={this.handleGroupChange} /></div>
                                <div className='center'><span className='text1'>{' '} {group.name}</span> <span className='text2'>{group.auctions_count}</span></div>
                              </div>
                              {
                                this.props.isGroupChecked && this.props.groupIndex.toString()===groupIndex.toString() && <div className='grayLine'/>
                              }
                              {
                                this.props.isGroupChecked && this.props.groupIndex.toString()===groupIndex.toString() && _.map(this.props.models,((model,modelIndex)=>{
                                  return(
                                    <div key={modelIndex}>
                                      <div  className='model'>
                                        <div className="input">
                                        <input
                                          name={modelIndex}
                                          value={model.id}
                                          type="checkbox"
                                          checked={this.props.modelIndex.toString()===modelIndex.toString()}
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
          <Col className="cnt4">
            <Row>
              <div className="cnt5" style={{padding:30}}>
                <div className="cnt8">
                  <div>차량 {this.props.count}대</div>
                  <div>
                    <img className="img2"onClick={()=>this.getCarsRequest()} src={require('../../assets/images/refresh.png')} alt="Card image cap"/>
                  </div>
                </div>
                <div className="cnt7">
                  <div>

                  </div>
                </div>
              </div>
            </Row>
            <Row>
              {_.map(this.state.nowlist, ((listValue, index) => {
                    const end_at = new Date(listValue.auction.end_at);
                    const started_at = new Date(listValue.auction.started_at);
                    const now = new Date();
                    const endToStart = this.dateDiffInDays(started_at, end_at);
                    const nowToStart = this.dateDiffInDays(started_at, now);
                    const progress = (nowToStart) / (endToStart) * 100;
                    return (
                      <Col sm="3" className="card1" key={index}>
                        <div className="card3">
                          <div>
                            {_.get(listValue,['detail','main_image']) ? <img className="img1" style={{marginTop:0}} onClick={()=>this.goToDetail(listValue.id)} src={listValue.detail.main_image.url} alt="Card image cap"/> : <img className="img1" style={{marginTop:0}} onClick={()=>this.goToDetail(listValue.id)} src={require('../../assets/images/car.jpeg')} alt="Card image cap"/> }
                          </div>
                        <div className="card4">
                          <div className="cardTitle">
                            {listValue.detail.name}
                          </div>
                          <div className="cnt5">
                            <div className="cnt2">
                                      <Moment format="YYYY/MM" style={{fontSize:12}}>
                                        {listValue.detail.initial_registration_date}
                                      </Moment>
                                      <div className="cardText">({listValue.detail.year}년형)</div>
                                      <div className="cardText">{listValue.detail.mileage / 10000}만 km</div>
                                      <div className="cardText">{listValue.detail.location}</div>
                            </div>
                            <div className='center2'>
                                  <Circle percent={progress} style={{height: 40, width: 40}} strokeWidth="8"
                                          strokeColor="#2E7DE1"/>
                                  <div className='abs'>
                                    {listValue.auction.bids_count}
                                  </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </Col>
                    )
                  }
                )
              )
              }
            </Row>
          </Col>
        </Row>
      </Container>
        </div>
      </div>
    );
  }
}

export default MainPageView
