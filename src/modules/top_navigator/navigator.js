import React, { Component } from 'react'
import Storage, { KEYS } from '../../utils/Storage'
import {clearAuthenticationToken} from '../../utils/authentication'
import {
  Row, Col, Input, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, Button, InputGroupAddon
} from 'reactstrap'
import autoBind from 'react-autobind'
import './navigator.css'
import { withRouter } from 'react-router-dom';
export class Navigator extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      selectedOption: '경매',
    }
    autoBind(this);
  }

  componentWillMount() {
    this.props.setUsername(Storage.get(KEYS.username));
  }

  componentWillReceiveProps(nextProps) {
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  goToBargain(){
    this.props.history.push({pathname: '/homePage'})
  }
  onLogoutPressed(){
    if(window.confirm("로그아웃 하시겠습니까?")){
      clearAuthenticationToken();
      this.props.history.push({pathname: '/login'});
    }
  }
  render() {
    return (
      <div className="nav1">
        <Container style={{backgroundColor: '#2E7DE1'}}>
          <Navbar color="faded" light expand="md">
            <NavbarBrand href="/homepage/">
              <Row>
                <Col sm="3">
                  <img className="imglogo1" width="50" height="40" src={require('../../assets/images/prnd-icon.png')} alt="Card image cap" />
                </Col>
              </Row>
            </NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="Navi1" >
                  <Button className="btt11" style={{backgroundColor:"#2E7DE1", borderWidth:0}} onClick={()=>this.goToBargain()}>{
                    this.state.selectedOption==='경매' ?
                    <span
                    style={{color: 'white'}}>경매</span> :  <span
                        style={{color: 'gray'}}>경매</span>
                  }
                  </Button>
                </NavItem>
                <NavItem className="Navi1">
                  <Button className="btt11" style={{backgroundColor:"#2E7DE1", borderWidth:0}}>{
                    this.state.selectedOption==='내 응찰' ?
                      <span
                        style={{color: 'white'}}>내 응찰</span> :  <span
                        style={{color: 'gray'}}>내 응찰</span>
                  }
                  </Button>
                </NavItem>
                <NavItem className="Navi1">
                  <Button className="btt11" style={{backgroundColor:"#2E7DE1", borderWidth:0}}>{
                    this.state.selectedOption==='내 거래' ?
                      <span
                        style={{color: 'white'}}>내 거래</span> :  <span
                        style={{color: 'gray'}}>내 거래</span>
                  }
                  </Button>
                </NavItem>
                <NavItem className="Navi1">
                  <Button className="btt11" style={{backgroundColor:"#2E7DE1", borderWidth:0}}>{
                    this.state.selectedOption==='공지사항' ?
                      <span
                        style={{color: 'white'}}>공지사항</span> :  <span
                        style={{color: 'gray'}}>공지사항</span>
                  }
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className="btt11" style={{backgroundColor:"#2E7DE1", borderWidth:0}}>
                    <img width="20" height="20" src={require('../../assets/images/user-image.png')} alt="Card image cap" />
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className="btt11" style={{backgroundColor:"#2E7DE1", borderWidth:0}}>
                    <span  style={{color: 'white'}}> {this.props.username} </span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className="btt11" style={{backgroundColor:"#2E7DE1", borderWidth:0}}>
                    <img width="20" height="20" src={require('../../assets/images/notify.png')} alt="Card image cap" />
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className="btt12" style={{backgroundColor:"#2E7DE1", borderWidth:0}} onClick={this.onLogoutPressed}>
                    <img width="25" height="25" src={require('../../assets/images/logout.png')} alt="Card image cap" />
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    )
  }
}
export default withRouter(Navigator);
