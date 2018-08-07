// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardDeck, Form, FormGroup, Label,   Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
Jumbotron,} from 'reactstrap'
import autoBind from 'react-autobind'
import './loginView.css'
import eyeSlash from 'react-icons/lib/fa/eye-slash'
import eye from 'react-icons/lib/fa/eye'
import { Link, browserHistory } from 'react-router'
// import easi6Theme from '../../utils/petStagramTheme'
// import petStagramLogo from '../../../assets/images/petStagramLogo.png';
import {
  withRouter
} from 'react-router-dom'

// const items = [
//   {
//     id: 1,
//     // src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
//     altText: 'Slide 1',
//     caption: 'Slide 1'
//   },
//   {
//     id: 2,
//     // src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
//     altText: 'Slide 2',
//     caption: 'Slide 2'
//   },
//   {
//     id: 3,
//     // src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%2

type State = {
  username: string,
  password: string,
  secure: boolean,
};

type Props = {
  t: Function,
  loading: boolean,
  onLoginRequest: (username: string, password: string) => void
};

class LoginView extends Component<Props, State> {
  constructor(props) {
    super(...arguments);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    autoBind(this);
  }

  state = {
    error: null,
    username: '',
    password: '',
    secure: false,
  };
  componentDidMount() {
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value })
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value })
  }

  onLoginPressed() {
    if (!this.state.username) {
      this.renderLoginError('enter_your_login_ID')
    } else if (!this.state.password) {
      this.renderLoginError('enter_your_password')
    } else {
      this.onLoginRequest(this.state.username, this.state.password)
    }
  }
  onLoginRequest(username, password){
    console.log(this.props,"this is loginProps");
    this.props.loginRequest(username, password).then(()=>{
      this.props.history.push('/homePage')
    }).catch((e)=>{
      console.log(e);
      this.setState({
        error:'there is no user on given info'
      })
    });
  }

  renderLoginError(text) {
    if (text) {
      return (
        <Alert> {text}</Alert>
      )
    }
    return (
      null
    )
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    return (
      <Container className="cont">
        <Row className="ro1">
          <Col className="main1" xs="6" sm="5">
          <Card body outline color="#ffe4a8">
            <img width="90%" height="90%" src={require('../../assets/images/mainlogo.png')} alt="Card image cap" />
            <img width="90%" height="90%" src={require('../../assets/images/logindog2.jpg')} alt="Card image cap" />
            <CardBody className="card3">
              <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                  <Input className="login1" placeholder="USERNAME" onChange={this.onChangeUsername} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="examplePassword" className="mr-sm-2">Password</Label>
                  <Input className="login1" type="password" placeholder="PASSWORD" onChange={this.onChangePassword} />
                </FormGroup>
                <Row>
                <Button className="bt1" color ="#ffe4a8" onClick={() => this.onLoginPressed()}>SIGNIN</Button>
                <Button href="/signUp" className="bt2" color ="#aaffd3">SIGNUP</Button>
                </Row>
                <Row>
                  {this.state.error ? <span style={{color: 'red'}}>this is error message: {this.state.error} </span> : null}
                </Row>
              </Form>
              {/*<Input className="login1" placeholder="USERNAME" onChange={this.onChangeUsername} />*/}
            {/*</CardBody>*/}
            {/*<CardBody>*/}
              {/*<Input className="login1" type="password" placeholder="PASSWORD" onChange={this.onChangePassword} />*/}
            {/*</CardBody>*/}
            {/*<CardBody>*/}
              {/*/!*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*!/*/}
              {/*<Button className="login1" color ="lightgray" onClick={() => this.onLoginPressed()}>LOGIN</Button>*/}
            </CardBody>
          </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LoginView
