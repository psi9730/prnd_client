import React, { Component } from 'react'
import Storage, { KEYS } from '../../utils/Storage'
import {clearAuthenticationToken} from '../../utils/authentication'
import {
  Row, Col, Input, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, Button, InputGroupAddon
} from 'reactstrap'
import autoBind from 'react-autobind'
import './navigator.css'
import Select from 'react-select'
import qs from 'qs'
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
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div className="nav1">
        <Container>
          <Navbar color="#2E7DE1" light expand="md">
            <NavbarBrand href="/homepage/">
              <Row>
                <Col sm="3">
                  <img width="20" height="20" src={require('../../assets/images/instagram.png')} alt="Card image cap" />
                  <img className="imglogo1" width="100" height="30" src={require('../../assets/images/mainlogo.png')} alt="Card image cap" />
                </Col>
              </Row>
            </NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="Navi1">
                  <Button className="btt11" color="white" onClick={()=>this.goToBargain()}>{
                    this.state.selectedOption==='경매' ?
                    <span
                    style="color:white">경매</span> :  <span
                        style="color:gray">경매</span>
                  }
                  </Button>
                </NavItem>
                <NavItem className="Navi1">
                  <Button className="btt11" color="white" onClick={}>{
                    this.state.selectedOption==='내 응찰' ?
                      <span
                        style="color:white">내 응찰</span> :  <span
                        style="color:gray">내 응찰</span>
                  }
                  </Button>
                </NavItem>
                <NavItem className="Navi1">
                  <Button className="btt11" color="white" onClick={}>{
                    this.state.selectedOption==='내 거래' ?
                      <span
                        style="color:white">내 거래</span> :  <span
                        style="color:gray">내 거래</span>
                  }
                  </Button>
                </NavItem>
                <NavItem className="Navi1">
                  <Button className="btt11" color="white" onClick={}>{
                    this.state.selectedOption==='공지사항' ?
                      <span
                        style="color:white">공지사항</span> :  <span
                        style="color:gray">공지사항</span>
                  }
                  </Button>
                </NavItem>
                <NavItem>
                  <Button>
                    <img width="20" height="20" src={require('../../assets/images/user-image.png')} alt="Card image cap" />
                  </Button>
                </NavItem>
                <NavItem>
                  <Button>
                    <span  style="color:white"> {this.props.username} </span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className="btt11" color="white">
                    <img width="20" height="20" src={require('../../assets/images/notify.png')} alt="Card image cap" />
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className="btt12" color="white" onClick={this.onLogoutPressed}>
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
