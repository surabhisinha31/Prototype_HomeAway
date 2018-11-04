import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {Link} from "react-router-dom";
import {userLoggedOut} from './../actions/index';
import homeawaylogo from './../images/HomeAway_logo.png';
import homeicon from './../images/homeicon.png';
import Nav from 'react-bootstrap/lib/Nav'
import './../images/redux.css';
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem  from 'react-bootstrap/lib/NavItem'

class TopHeader extends Component {
  render() {
    return (
            <div >
            <Navbar className="home-navbar">
              <Navbar.Header>
                <Navbar.Brand>
                  <img className="homeaway-logo" src ={homeawaylogo}/>
                  <img className="home-icon" src={homeicon}/>
                </Navbar.Brand>
              </Navbar.Header>
            </Navbar>
          </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        currentUser: state.LoginReducer.currentUser
    };
}


export default connect(mapStateToProps)(TopHeader);
