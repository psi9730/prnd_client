// @flow
import React, { Component } from 'react';
import { Input, Alert, Button, Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardDeck, Form, FormGroup, Label, Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Jumbotron } from 'reactstrap';
import autoBind from 'react-autobind';
import './loginView.css';


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
    this.setState({ username: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onLoginPressed() {
    if (!this.state.username) {
      this.renderLoginError('enter_your_login_ID');
    } else if (!this.state.password) {
      this.renderLoginError('enter_your_password');
    } else {
      this.onLoginRequest(this.state.username, this.state.password);
    }
  }
  onLoginRequest(username, password) {
    this.props.loginRequest(username, password).then(() => {
      this.props.history.push('/homePage');
    }).catch((e) => {
      console.log(e);
      this.setState({
        error: 'there is no user on given info',
      });
    });
  }

  renderLoginError(text) {
    this.setState({ error: text });
  }

  render() {
    return (
      <Container className="cont">
        <Row className="ro1">
          <Col className="main1" xs="6" sm="5">
            <Card body outline color="#ffe4a8">
              <img width="100%" height="100%" src={require('../../assets/images/prnd.png')} alt="Card image cap" />
                <CardBody className="card3">
                  <Form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="exampleEmail" className="mr-sm-2">Login</Label>
                      <Input className="login1" placeholder="USERNAME" onChange={this.onChangeUsername} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="examplePassword" className="mr-sm-2">Password</Label>
                      <Input className="login1" type="password" placeholder="PASSWORD" onChange={this.onChangePassword} />
                    </FormGroup>
                    <Row className="ro1">
                      <Button className="bt1" color="#2E7DE1" onClick={() => this.onLoginPressed()}>
                        <span style={{ color: 'white' }}>SIGNIN</span>
                      </Button>
                      <Button href="/signUp" className="bt2" color="#2E7DE1">
                        <span style={{ color: 'white' }}>SIGNUP</span>
                      </Button>
                    </Row>
                    <Row>
                    {this.state.error ? <span style={{ color: 'red' }}>this is error message: {this.state.error} </span> : null}
                    </Row>
                  </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginView;
