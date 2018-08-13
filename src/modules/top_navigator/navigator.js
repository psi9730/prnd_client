import React from 'react';
import {
  Row, Col, Container, Collapse, Navbar, NavbarBrand, Nav, NavItem,
  Button,
} from 'reactstrap';
import autoBind from 'react-autobind';
import { withRouter } from 'react-router-dom';
import './navigator.css';
import Storage, { KEYS } from '../../utils/Storage';
import { clearAuthenticationToken } from '../../utils/authentication';
type Props = {
  setUsername: Function,
  history: any,
};
type State = {

}
export class Navigator extends React.Component <Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '경매',
    };
    autoBind(this);
  }

  componentWillMount() {
    this.props.setUsername(Storage.get(KEYS.username));
  }
  goToBargain() {
    this.props.history.push({ pathname: '/homePage' });
  }
  onLogoutPressed() {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      clearAuthenticationToken();
      this.props.history.push({ pathname: '/login' });
    }
  }
  render() {
    return (
      <div className="nav1">
        <Container style={{ backgroundColor: '#424C6B' }}>
          <Navbar color="faded" light expand="md" style={{height:60}}>
            <NavbarBrand href="/homepage/">
              <div className="navLeft1">
                <img className="imglogo1" width="auto" height="40" src={require('../../assets/images/prnd-icon.png')} alt="Card image cap" />
                <Button className="btt11" style={{ backgroundColor: '#424C6B', borderWidth: 0 }} onClick={() => this.goToBargain()}>{
                  this.state.selectedOption === '경매' ?
                    <span
                      style={{ color: 'white' }}
                    >경매</span> : <span
                      style={{ color: 'gray' }}
                    >경매</span>
                }
                </Button>
                <Button className="btt11" style={{ backgroundColor: '#424C6B', borderWidth: 0 }}>{
                  this.state.selectedOption === '내 응찰' ?
                      <span style={{ color: 'white' }}>내 응찰</span> : <span style={{ color: 'gray' }}>내 응찰</span>
                  }
                </Button>
                <Button className="btt11" style={{ backgroundColor: '#424C6B', borderWidth: 0 }}>{
                  this.state.selectedOption === '내 거래' ?
                    <span style={{color: 'white'}}>내 거래</span> : <span style={{color: 'gray'}}>내 거래</span>
                }
                </Button>
                <Button className="btt11" style={{ backgroundColor: '#424C6B', borderWidth: 0 }}>{
                  this.state.selectedOption === '공지사항' ?
                    <span style={{ color: 'white' }}>공지사항</span> : <span style={{ color: 'gray' }}>공지사항</span>
                  }
                </Button>
              </div>
            </NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                  <Button className="btt11" style={{ backgroundColor: '#424C6B', borderWidth: 0 }}>
                        <img width="20" height="20" src={require('../../assets/images/user-image.png')} alt="Card image cap" />
                      </Button>
                </NavItem>
                      <NavItem>
                  <Button className="btt11" style={{ backgroundColor: '#424C6B', borderWidth: 0 }}>
                          <span style={{ color: 'white' }}> {this.props.username} </span>
                        </Button>
                </NavItem>
                        <NavItem>
                  <Button className="btt11" style={{ backgroundColor: '#424C6B', borderWidth: 0 }}>
                            <img width="30" height="30" src={require('../../assets/images/alarm.png')} alt="Card image cap" />
                          </Button>
                </NavItem>
                <NavItem>
                    <Button className="btt12" style={{ backgroundColor: '#424C6B', borderWidth: 0 }} onClick={this.onLogoutPressed}>
                    <img width="25" height="25" src={require('../../assets/images/logout.png')} alt="Card image cap" />
                  </Button>
                  </NavItem>
              </Nav>
              </Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }
}
export default withRouter(Navigator);
