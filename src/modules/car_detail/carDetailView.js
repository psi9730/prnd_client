import React, { Component } from 'react';
import { Container, Button,
  Card, CardBody, CardTitle, CardText, CardSubtitle, Col, Row, Input, Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption} from 'reactstrap';
import Modal from 'react-modal';
import './carDetailView.css'
import autoBind from 'react-autobind'
import Storage, {KEYS} from "../../utils/Storage";
import Moment from 'react-moment';
import Constants from '../../constants/constants'
import _ from 'lodash'
const {API_ROOT,API_SERVER} = Constants;
type State = {
  pictures: any,
  pets: Array,
  text: string,
  title: string,
  commentId: number,
};

type Props = {
  cardId: any,
  pet: any,
  pet:{
    petName: string,
    id: number,
    petProfileImage: any,
    petBirthDay: Date,
    petProperty: string,
  },
  owner: any,
  title: string,
  pictures: any,
  text: string,
  like : any,     //list of userEmail who like this card
  created: any,
  comments: any,
  comments:[{
    ownerName: string,
    ownerEmail: string,
    updated: any,
    comment: string,
    id: any,
  }],
  getCardRequest: Function,
  getCommentRequest: Function,
  deleteCardRequest: Function,
  deleteCommentRequest: Function,
  deleteLikeRequest: Function,
  postLikeRequest: Function,
  postCommentRequest: Function,
};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class CardDetailView extends Component<Props, State> {

  constructor(props){
    super(props);
    this.state = {
      commentId:-1,
      pictures: [],
      comment: "",
      pets: [],
      text: "",
      title: "",
      picturesURL: [],
      modalIsOpen: false,
      activeIndex: 0,
      source:[],
      items:[],
    };
    autoBind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
    this.props.getCardRequest(this.props.card_id).then(()=>  _.map(this.props.pictures,(item,index) => {
      const item2 = {
        src: item.picture_url,
        altText: '',
        caption: '',
      }
      this.setState({items:[]},()=>  this.state.items.push(item2))
    }))
      .catch(e=>{console.log(e)});
  }
  componentWillReceiveProps(){
  }


  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === _.size(this.props.pictures) - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? _.size(this.props.pictures) - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    return (
      <div className="di1">
        <Button onClick={this.openModal}>Detail</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        </Modal>
      </div>
    );
  }
}
export default CardDetailView;
