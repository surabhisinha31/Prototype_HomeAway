import React,{ Component } from 'react';
import Nav from 'react-bootstrap/lib/Nav'
import './../images/profile.css';
import {travalerDashboardHandler} from './../api/Api';
import {ownerDashboardHandler} from './../api/Api';
import {ownerAuthenticationHandler} from './../api/Api';
import {userProfileHandler} from './../api/Api';
import {inboxHandler} from './../api/Api';
import {travelerinboxHandler} from './../api/Api';
import { connect } from 'react-redux';
import { Button} from 'react-bootstrap';
import {history} from "../util/utils";
import homeawaylogo from './../images/HomeAway_logo.png';
import homeicon from './../images/homeicon.png';
import inboxicon from './../images/mail.jpg';
import { Glyphicon } from 'react-bootstrap';
import * as UTIL from './../util/utils';
import DashBoard from './travalerdashboard';
import OwnerDashBoard from './ownerdashboard';
import {bindActionCreators} from 'redux';
import { Route, Redirect,withRouter } from 'react-router-dom';
import  { NavbarBrand, Navbar, NavbarNav, NavItem, Dropdown,DropdownMenu,DropdownItem,DropdownToggle,NavbarToggler,Collapse } from 'mdbreact';

class ProfileHeader extends Component {
    constructor(props){
        super(props);
        this.dashboardDetails = {
          currentuser: ''
        };
      }
    travelerclickHandler(data) {
      this.dashboardDetails.currentuser=data
      console.log("value of data: ", data);
      if(!this.props.ownerFlag) {
        this.props.travalerDashboardHandler(this.dashboardDetails);
      }
      else{
        alert("First Login as Traveler")
      }
  }
  ownerclickHandler(data) {
      this.dashboardDetails.currentuser=data
      console.log("value of owner data: ", data);
      if(this.props.ownerFlag) {
        this.props.ownerDashboardHandler(this.dashboardDetails);
      }
      else {
        alert("First Login as Owner")
      }
  }
  propertyPostingClickHandler(data) {
      this.dashboardDetails.currentuser=data
      console.log("value of owner data: ", data);
      this.props.ownerAuthenticationHandler(this.dashboardDetails);
  }
  profileUpdateClickHandler(data) {
      console.log("value of user data: ", data);
      this.dashboardDetails.email=this.props.currentUser;
      this.props.userProfileHandler(this.dashboardDetails);
  }
  inboxclickHandler(data) {
      console.log("value of user data: ", data);
      this.dashboardDetails.currentUser=this.props.currentUser;
      if(this.props.ownerFlag) {
        this.props.inboxHandler(this.dashboardDetails);
      }
      else {
        this.props.travelerinboxHandler(this.dashboardDetails);
      }

  }
  logoutclickHandler(){
    alert("User logged out");
    UTIL.deleteServerToken(UTIL.getServerTokenDetails);
    history.push('/');

  }
  toggleButton() {
    history.push('/userhome');
  }
    render() {
        return (
                <div className="profile-main">
                  <Navbar light black expand="md" scrolling className="main-nav">
                    {<NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.dashboardDetails.collapse } navbar>
                    <NavbarBrand href="#" onClick={()=> this.toggleButton(this.props.currentUser)}>
                      <h1 className="homelogo-profile"> HomeAway </h1>
                    </NavbarBrand>
                    <NavbarNav right className="nav-bar">
                      <NavItem className="nav-item">
                        <Dropdown className="main-dropdown">
                          <DropdownToggle nav caret  id="basic-nav-dropdown" className="drop-data">Help</DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem className="drop-data1" href="#">Action</DropdownItem>
                                <DropdownItem className="drop-data1" href="#">Visit Help Center</DropdownItem>
                                <DropdownItem className="drop-data1" href="#">Travelers</DropdownItem>
                                <DropdownItem className="drop-data1" href="#">How it works</DropdownItem>
                                <DropdownItem className="drop-data1" href="#">Security Center</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>

                      </NavItem>
                      <NavItem>
                          <Dropdown className="main-dropdown1">
                              <DropdownToggle nav caret id="basic-nav-dropdown"  className="drop-data" >{this.props.currentUser}</DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem className="drop-data1" href="#" onClick={() => this.inboxclickHandler(this.props.currentUser)}>Inbox</DropdownItem>
                                    <DropdownItem className="drop-data1" href="#" onClick={() => this.travelerclickHandler(this.props.currentUser)} >My Trips</DropdownItem>
                                    <DropdownItem className="drop-data1" href="#" onClick={() => this.profileUpdateClickHandler(this.props.currentUser)}>My Profile</DropdownItem>
                                    <DropdownItem className="drop-data1" href="#">Account</DropdownItem>
                                    <DropdownItem className="drop-data1" href="#" onClick={() => this.ownerclickHandler(this.props.currentUser)} >Owner Dashboard</DropdownItem>
                                    <DropdownItem className="drop-data1" href="#" onClick={() => this.logoutclickHandler()} >Logout</DropdownItem>
                                  </DropdownMenu>
                              </Dropdown>
                      </NavItem>
                          <NavItem>
                            <Button type="button" className="btn-class propertypost" onClick={() => this.propertyPostingClickHandler(this.props.currentUser)}>List Your Property</Button>
                            <img className="homelogo-style" src={homeicon}/>

                          </NavItem>
                      </NavbarNav>
                    </Collapse>
                  </Navbar>
                </div>

        );
    }
}
  function mapStateToProps(state) {
    console.log("State",state);
      return {
         currentUser: state.LoginReducer.currentUser,
         ownerFlag : state.LoginReducer.ownerFlag,
         currentUserDetails: state.LoginReducer.currentUserDetails,
         propertyResults: state.PropertyReducer.propertyResults,
         userResults: state.PropertyReducer.userResults,
         clickedProperty: state.PropertyReducer.clickedProperty,
         clickedPropertyImageURLs: state.PropertyReducer.clickedPropertyImageURLs,
         bookingInfo: state.PropertyReducer.bookingInfo
      };
  }
  function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({travalerDashboardHandler: travalerDashboardHandler, ownerDashboardHandler: ownerDashboardHandler, ownerAuthenticationHandler: ownerAuthenticationHandler,  userProfileHandler: userProfileHandler, inboxHandler: inboxHandler, travelerinboxHandler: travelerinboxHandler}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(ProfileHeader);
