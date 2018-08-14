// @flow
import React, { Component } from 'react';
import { Button, Container, Row, Col, Dropdown,DropdownItem, DropdownToggle,DropdownMenu } from 'reactstrap';
import autoBind from 'react-autobind';
import qs from 'qs';
import { Circle } from 'rc-progress';
import Moment from 'react-moment';
import Select from 'react-select';
import './cardView.css';
import Navigator from '../top_navigator/navigatorContainer';

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

type State = {
  username: string,
  password: string,
  secure: boolean,
};
const customStyles = {
  option: (base, state) => ({
    ...base,
    borderBottom: '1px dotted pink',
    color: state.isFullscreen ? 'red' : 'blue',
    padding: 20,
    cursor:'pointer',
  }),
  control: () => ({
    // none of react-selects styles are passed to <View />
    width: 200,
    cursor:'pointer',
  }),
  singleValue: (base, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...base, opacity, transition };
  }
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const options = [
  { value: '최근등록순', label: '최근등록순' },
  { value:  '종료임박순', label: '종료임박순' },
  { value: '응찰적은순', label:'응찰적은순'}
];

class MainPageView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      index: 0,
      selectedOption: null,
      selectedOption2: '공매',
      nowlist:[],
    };
  }
  componentWillMount(){
    const search_ = this.props.location.search;
    let search;
    search_ && (search=qs.parse(search_.slice(1,search_.length)));
    _.get(search,['order']) && this.props.setOrderRequest(search.order)
      this.props.getBrandsRequest().then(()=>{
        let index;
        _.get(search,['brand']) && (index = _.findIndex(this.props.brands,function(brand){
          if(brand.id.toString()===_.get(search,['brand']).toString())
            return true;
        }));
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
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    if(selectedOption.value==='최근등록순'){
      this.props.setOrderRequest('recent').then(()=>this.getCarsRequest()).catch((e)=>console.log(e));
    }else if(selectedOption.value==='종료임박순'){
      this.props.setOrderRequest('bids_count').then(()=>this.getCarsRequest()).catch((e)=>console.log(e));
    }else if(selectedOption.value==='응찰적은순'){
      this.props.setOrderRequest('end_time').then(()=>this.getCarsRequest()).catch((e)=>console.log(e));
    }
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
      this.props.getCarAllRequest('?'+qs.stringify(jsonObject)).then(()=>{
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
    const value = event.value;
    const index = event.name;
    if(this.props.isGroupChecked && this.props.groupValue.toString()===value.toString()){
      this.props.setGroupRequest(null,-1,false).then(()=>this.props.setModelRequest(null,-1,false)).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
    }
    else{
      this.props.getModelsRequest(value).then(()=> {
        this.props.setGroupRequest(value, index, true).then(()=>this.props.setModelRequest(null,-1,false)).then(()=>this.getCarsRequest()).catch((e)=>console.log(e))
      }).catch((e)=>console.log(e))
    }
  }
  handleModelChange(event){
    const value = event.value;
    const index = event.name;
    if(this.props.isModelChecked && this.props.modelValue.toString()===value.toString()){
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
    const value = event.value;
    const index = event.name;
    if(this.props.isBrandChecked && this.props.brandValue.toString()===value.toString()){
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
  parseOrder(order){
   if(order==='recent')
     return '최근등록순';
   else if(order==='bids_count')
     return '응찰적은순';
   else return '종료임박순';
  }
  render() {
    return (
      <div>
        <Navigator/>
        <div className="cnt2">
          <img className="scroll" onClick={()=>this.goToTop()} src={require('../../assets/images/go_up.png')} alt="Card image cap"/>
          <Container>
            <div className="navLeft">
              <Button className="btt1" style={{backgroundColor: 'white', borderWidth:0,paddingBottom:0}} onClick={() => this.goToBargain()}>
                {
                  this.state.selectedOption2 === '일반' ?
                    <div className="bttStyle1">
                      <span style={{ color: '#2E7DE1', marginBottom: '15px' }}>일반</span>
                      <span className='bottomLine'/>
                    </div>:
                    <div className="bttStyle1">
                      <span style={{ color: 'gray' , marginBottom: '15px'}}>일반</span>
                    </div>
                }
              </Button>
              <Button className="btt1"  style={{backgroundColor: 'white', borderWidth:0}} onClick={() => this.goToBargain()}>{
                this.state.selectedOption2 === '공매' ?
                  <div className="bttStyle1">
                    <span style={{ color: '#2E7DE1', marginBottom: '15px'}}>공매</span>
                    <span className='bottomLine'/>
                  </div>:
                  <div className="bttStyle1">
                    <span style={{ color: 'gray' , marginBottom: '15px'}}>공매</span>
                  </div>
              }
              </Button>
              <Button className="btt1"  style={{backgroundColor: 'white', borderWidth:0}} onClick={() => this.goToBargain()}>{
                this.state.selectedOption2 === '찜' ?
                  <div className="bttStyle1">
                    <span style={{ color: '#2E7DE1', marginBottom: '15px'}}>찜</span>
              <span className='bottomLine'/>
                  </div>:
                  <div className="bttStyle1">
                    <span style={{ color: 'gray', marginBottom: '15px'}}>찜</span>
                  </div>
              }
              </Button>
            </div>
          </Container>
      <Container className="cnt1">
        <Row>
          <Col sm="3" className="cnt3" xs="auto">
            <form  className="cnt9" style={{backgroundColor: 'white', maxWidth:'100%', width:'auto', margin:10, marginTop:30, borderWidth:0}}>
              <div className='title'>
                브랜드/등급/모델
              </div>
              {
                this.props.brands &&
                _.map(this.props.brands,((brand,brandIndex)=>{
                  return(
                    <div key={brandIndex}>
                      <div className='brand'>
                        <div className="input" style={{borderRadius: '8px'}}>
                          <div className="roundedTwo">
                            <input id={brandIndex+"roundedTwo"} name={brandIndex}
                                   value={brand.id}
                                   type="checkbox"
                                   style={{ cursor:'pointer' }}
                                   className="checkbox"
                                   checked={this.props.brandIndex.toString()===brandIndex.toString()}
                                   onChange={()=>this.handleBrandChange({name:brandIndex, value:brand.id})} />
                            <label htmlFor={brandIndex+"roundedTwo"}></label>
                          </div>
                        </div>
                        <div className='center'>
                          <span className='text1'>{' '} {brand.name}</span>
                          <span className='text2'>{brand.auctions_count}</span>
                        </div>
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
                                  <div className="roundedTwo">
                                    <input id={brandIndex+"roundedTwo1"}   name={groupIndex}
                                           value={group.id}
                                           type="checkbox"
                                           style={{cursor: 'pointer' }}
                                           checked={this.props.groupIndex.toString()===groupIndex.toString()}
                                           onChange={()=>this.handleGroupChange({name:groupIndex, value:group.id})} />
                                    <label htmlFor={brandIndex+"roundedTwo1"}></label>
                                  </div>
                                </div>
                                <div className='center'>
                                  <span className='text1'>{' '} {group.name}</span>
                                  <span className='text2'>{group.auctions_count}</span>
                                </div>
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
                                          <div className="roundedTwo">
                                            <input
                                                    id={brandIndex+"roundedTwo2"}
                                                    name={modelIndex}
                                                    value={model.id}
                                                    type="checkbox"
                                                    style={{cursor: 'pointer' }}
                                                    checked={this.props.modelIndex.toString()===modelIndex.toString()}
                                                    onChange={()=>this.handleModelChange({name:modelIndex, value:model.id})} />
                                            <label htmlFor={brandIndex+"roundedTwo2"}></label>
                                          </div>
                                        </div>
                                        <div className='center'>
                                          <span className='text1'>{' '} {model.name}</span>
                                          <span className='text2'>{model.auctions_count}</span>
                                        </div>
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
          <Col  sm="9" className="cnt4">
            <Row>
                <div className="cnt5" style={{padding:20}}>
                  <div className="cnt8">
                    <div>차량 {this.props.count}대</div>
                    <div>
                      <img className="img2" style={{alignSelf: 'center',  cursor:'pointer'}} onClick={()=>this.getCarsRequest()} src={require('../../assets/images/refresh-1.png')} alt="Card image cap"/>
                    </div>
                  </div>
                  <div className="cnt7">
                    <div style={{flexBasis: 200, flexGrow:0, cursor:'pointer', flexShrink:0}}>
                      <Select
                        value={this.props.selectedOption}
                        onChange={this.handleChange}
                        placeholder={this.parseOrder(this.props.order)}
                        options={options}
                        style={customStyles}
                      />
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
                      <Col sm="3" xs="12" className="card1" key={index}>
                        <div className="card3">
                          <div style={{backgroundColor: 'black', height: 200, display: 'flex', cursor:'pointer', justifyContent:'center', alignItems:'center'}}>
                            {_.get(listValue,['detail','main_image']) ? <img className="img1" style={{marginTop:0, cursor: 'pointer', maxHeight: '100%', height: 'auto', width: 'auto',maxWidth: '100%'}} onClick={()=>this.goToDetail(listValue.id)} src={listValue.detail.main_image.url} alt="Card image cap"/> : <img className="img1" style={{marginTop:0, maxHeight: '100%', maxWidth: '100%'}} onClick={()=>this.goToDetail(listValue.id)} src={require('../../assets/images/car.jpeg')} alt="Card image cap"/> }
                          </div>
                          <div className="card4">
                            <div className="cardTitle1">
                            {listValue.detail.name}
                          </div>
                            <div className="cnt2">
                              <div className="cnttt4_1" style={{color: '#9093A8',
                                paddingBottom:'2px',
                                paddingTop: '2px'}}>
                                <Moment format="YYYY/MM" style={{fontSize:'12px'}}>
                                  {listValue.detail.initial_registration_date}
                                </Moment>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                  <div style={{marginLeft:'5px',fontSize:'12px',  textAlign: 'center'}}>({listValue.detail.year}년형)</div>
                                </div>
                              </div>
                              <div className="cnt5">
                              <div className="cnt2">
                                <div className="cardText">{listValue.detail.mileage / 10000}만 km</div>
                                <div className="cardText">{listValue.detail.location}</div>
                              </div>
                              <div className='center2'>
                                <Circle percent={progress} style={{height: 40, width: 40}} strokeWidth="8"  trailWidth="6"
                                        strokeColor="#2E7DE1"/>
                                <div className='abs6'>
                                  {listValue.auction.bids_count}
                                </div>
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
