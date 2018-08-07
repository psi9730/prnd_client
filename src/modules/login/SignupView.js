import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Jumbotron, Col, Row,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody, CardFooter, CardText, CardTitle, Container} from 'reactstrap'
import autoBind from "react-autobind";
import './SignUpView.css'
import { withRouter } from 'react-router-dom';
import LoginView from "./loginView";
export class SignupView extends Component {
  constructor(props) {
    super(...arguments);
    autoBind(this);
    const images = {
      petProfile: require('../../assets/images/dog.png'),
      userProfile: require('../../assets/images/user.png')
    }
    this.state = {
      isLoading: false,
      email: "",
      error: null,
      password: "",
      confirmationCode: "",
      newUser: null,
      duplicate:0,
      userProfileImage: images.userProfile,
      userBirthDay: '',
      introduceText: '',
      username: '',
      petName: '',
      petProfileImage: images.petProfile,
      petBirthDay: '',
      introduceTextPet: '',
      activeTab: '1'
    };
  }
  validateForm() {
    return (
      this.state.email.length >7 &&
      this.state.password.length > 7 &&
        this.state.username.length >0 &&
        this.state.petBirthDay && this.state.userBirthDay
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
}

  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.signUpRequest(this.state.email, this.state.password,
        this.state.username,this.state.userProfileImage,this.state.userBirthDay,this.state.petName, this.state.petProfileImage,this.state.petBirthDay)
      .then(()=>this.props.history.push('/login')).catch((e) => {
        this.setState({error:e.message});})
    }
    else if(this.state.email.length<8){
      this.setState({error:"email is too short"});
    }
    else if(this.state.password.length<8){
      this.setState({error:"password is too short"});
    }
    else if(this.state.username.length<1){
      this.setState({error:"please enter username"})
    }
    else if(this.state.petName.length<1){
      this.setState({error:"please enter petName"})
    }
    else if(!this.state.userBirthDay){
      this.setState({error:"please enter your BirthDay"})
    }
    else if(!this.state.petBirthDay){
      this.setState({error:"please enter your pet's BirthDay"})
    }
    else{
      this.setState({error:"check form again"});
    }
  }

  checkDuplicate(){
    this.props.checkDuplicateRequest(this.state.email).then(()=>this.setState({duplicate:1})).catch(()=>{
      this.setState({error:"Duplicate Error"});
      this.setState({duplicate:2})
    })
  }

  handleConfirmationSubmit(event){
    event.preventDefault();
    this.setState({ isLoading: true });
  }
  toggle(tab){
    if(this.state.activeTab !== tab){
      this.setState({
        activeTab: tab
      });
    }
  }
  onDrop(event) {
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (event) {
      this.setState({
        pictures: file,
        picturesURL: reader.result,
      });
    }.bind(this);
    console.log(url) // Would see a path
  }
  onChangeEmail(e){
    this.setState({email: e.target.value})
  }

  onChangePassword(e){
    this.setState({password: e.target.value})
  }

  onChangeUserProfileImage(e){
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        userProfileImage: file,
        userProfileImageUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  onChangePetProfileImage(e){
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        petProfileImage: file,
        petProfileImageUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  onChangeUserBirthday(e){
    this.setState({userBirthDay: e.target.value})
  }

  onChangePetBirthday(e){
    this.setState({petBirthDay: e.target.value})
  }

  onChangeIntroduceText(e){
    this.setState({introduceText: e.target.value})
  }

  onChangeUsername(e){
    this.setState({username: e.target.value})
  }

  onChangePetName(e){
    this.setState({petName: e.target.value})
  }

  onSignUpPressed(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.signUpRequest(this.state.email, this.state.password,this.state).then(()=>{
        this.props.createPetRequest().then(()=> this.props.history.push('/loginPage')).catch((e)=>{console.log(e)})
      }
      ).catch((e) => { console.log(e);
        this.setState({error:e});})
    }
    else if(this.state.email.length<8){
      this.setState({error:"email is too short"});
    }
    else if(this.state.password.length<8){
      this.setState({error:"password is too short"});
    }
  }
  onCancelPressed(){
    this.setState({
      isLoading: false,
      email: "",
      error: null,
      password: "",
      confirmationCode: "",
      newUser: null,
      duplicate:0,
      userProfileImage: '',
      userBirthDay: '',
      introduceText: '',
      username: '',
      petName: '',
      petProfileImage: '',
      petBirthDay: '',
      introduceTextPet: ''}, ()=>this.props.history.push('/login'))
  }

  renderForm() {
    return (
      <Container className="cnt1">
        <Row>
          <Col className="signup1" xs="8" sm={{size: 5, offset:3}}>
            <Card body outline color = "#ffe4a8">
              <img width="100%" src={require('../../assets/images/mainlogo.png')} alt="Card image cap" />
              <Button className="bt1" color="#c9ffca"> <img width="30" height="30" src={require('../../assets/images/checked.png')} alt="Card image cap" />  Naver연동</Button>
              <Button className="bt2" color="#91bbff"> <img width="30" height="30" src={require('../../assets/images/facebook.png')} alt="Card image cap" />  Facebook연동</Button>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail" sm={5}>Email</Label>
                    <Col sm={12}>
                      <Input type="email" name="email" className="signUpEmail" placeholder="write down your email" onChange={this.onChangeEmail}/>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword" sm={5}>Password</Label>
                    <Col sm={12}>
                      <Input type="password" name="password" className="signUpPassword" placeholder="write down your password" onChange={this.onChangePassword}/>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleName" sm={5}>UserName</Label>
                    <Col sm={12}>
                      <Input type="name" name="name" className="userName" placeholder="write down your name" onChange={this.onChangeUsername}/>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile" sm={5}>UserImage</Label>
                    <Col sm={12}>
                      <Input type="file" name="file" id="exampleFile2"  ref="user" className="userProfileImage" onChange={this.onChangeUserProfileImage}/>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleDate"sm={6}>UserBirthday</Label>
                    <Col sm={12}>
                      <Input type="date" name="date"  className="signUpDate" placeholder="write down your birthday" onChange={this.onChangeUserBirthday}/>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail" sm={5}>PetName</Label>
                    <Col sm={12}>
                      <Input className="signUpPetName" placeholder="write down your petname" onChange={this.onChangePetName}/>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile" sm={5}>PetImage</Label>
                    <Col sm={12}>
                      <Input type="file" name="file"ref="pet" id="exampleFile" className="petProfileImage" onChange={this.onChangePetProfileImage}/>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleDate"sm={5}>PetBirthday</Label>
                    <Col sm={12}>
                      <Input type="date" name="date" className="signUpDate" placeholder="write down your pet's birthday" onChange={this.onChangePetBirthday}/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Row>
                <Button className="bt3" color="#aaffd3" onClick={this.handleSubmit}>SignUp</Button>
                <Button className="bt4" color="#ffe4a8" href="/login" onClick={this.onCancelPressed}>Cancel</Button>
                </Row>
                <Row>
                  <p color="red">
                    {this.state.error ? this.state.error: null}
                  </p>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.renderForm()}
      </div>
    );
  }
}
export default withRouter(SignupView)
