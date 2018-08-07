// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardDeck} from 'reactstrap';
import Navigator from '../top_navigator/navigatorContainer'
import './cardView.css'
import CardDetailView from "../card_detail/CardDetailViewContainer";
import CardWriteView from "../card_write/CardWriteViewContainer"
import Moment from 'react-moment';
import MemoView from "../memo/memoViewContainer"
import Constants from '../../constants/constants'
import axios from 'axios';

const {API_ROOT,API_SERVER} = Constants;

type State = {
  username: string,
  password: string,
  secure: boolean,
};

type Props = {
  cards: any,
  loading: boolean,
};

class MainPageView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this)
    this.state = {
      list: [
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
      ],
      nowList: [   "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",  "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"],
      index: 0,
    };
  }
 componentDidMount() {
    this.props.getCardAllRequest().then(()=>console.log(this.props.cards,"CARD")).catch(e=>console.log(e));
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.state.list.length
    ) {
      this.onPaginatedSearch();
    }
  }

  onPaginatedSearch(){
    if(this.state.index<this.state.list.length) {
      this.setState({
        nowList: this.state.nowList.concat(this.state.list[this.state.index++])
      })
    }
  }
  onClickWrite(){

  }

  render() {
    console.log(this.props.cards,"CARD!!!");
    return (
      <div>
        <Navigator/>
        <div className="cnt2">
      <Container className="cnt1">
        <Row>
        <Col md="7" sm="6" style={{display:"flex", justifyContent:"center"}}>
          <CardDeck className="card1">
            <Col className="col11">
          {_.map(this.props.cards,((listValue,index)=> {
            return (
            <Card className="card2" body outline color="#ffe4a8" key={index}>
              <CardBody>
                <CardTitle>{listValue.title}</CardTitle>
                <CardSubtitle><Moment format="YYYY/MM/DD">
                  {listValue.date}
                </Moment>
                </CardSubtitle>
              </CardBody>
              <img width="100%" src={  `${API_SERVER}/${listValue.pictures[0].picture_url}`} alt="Card image cap" />
              <CardBody>
                <CardText>{listValue.text}</CardText>
                <CardDetailView card_id={listValue.id}/>
              </CardBody>
            </Card>)
          }))}
            </Col>
          {/*<CardImg top width="100%" src={require('../../assets/images/example1.png')} alt="Card image cap" />*/}
          </CardDeck>
        </Col>
        <Col md="5" sm="6" style={{display:"flex", justifyContent:"center"}}>
          <MemoView/>
        </Col>
        </Row>
      </Container>
        </div>
      </div>
    );
  }
}

export default MainPageView
