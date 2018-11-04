import React,{ Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import ProfileHeader from './profileheader.js';
import './../images/property.css';
import { connect } from 'react-redux';
import {history} from "../util/utils";
import {bindActionCreators} from 'redux';
import { Router } from 'react-router'

class Welcome extends Component {
clickHandler=(event)=>{
  event.preventDefault();
  history.push('/location');
}
render() {
    return (
          <div>
              <div className="location1-container">
                 <ProfileHeader/>
               </div>
                  <div className="col-xs-3">
                      <ul className="nav nav-tabs tabs-left">
                        <li className="first"><a href="#home" data-toggle="tab">Welcome</a></li>
                        <li className="second"><a href="/location" data-toggle="tab">Location</a></li>
                        <li className="third"><a href="/details" data-toggle="tab">Details</a></li>
                        <li className="fourth"><a href="/booking" data-toggle="tab">Booking</a></li>
                        <li className="fifth"><a href="/pricing" data-toggle="tab">Pricing</a></li>
                        <li className="sixth"><a href="/photos" data-toggle="tab">Photos</a></li>
                      </ul>
                  </div>
                       <div className="tab-pane active" id="Welcome">
                       <form>
                          <h2 className="welcome-msg"> Welcome! Verify the location of your rental</h2>
                          <h4 className="step-msg"> Just 5 Steps remaining </h4>
                          <button type="button" onClick={this.clickHandler} className="btn-class welcome">Continue</button>
                        </form>
                      </div>
                      <div className="footer-div">
                        <footer className="footer-owner">
                           <p>Use of this Web site constitutes acceptance of its creators <a href="#" >Terms and conditions</a> and <a>Privacy policy.</a></p>
                           <p className="surabhi-footer">©2018 SURABHI. All rights reserved</p>
                        </footer>
                      </div>
              </div>
           );
  }
}
  function mapStateToProps(state) {
    console.log("State",state);
      return {
        currentUser: state.LoginReducer.currentUser,
         propertyResults: state.PropertyReducer.propertyResults,
         userResults: state.PropertyReducer.userResults,
         clickedProperty: state.PropertyReducer.clickedProperty,
         clickedPropertyImageURLs: state.PropertyReducer.clickedPropertyImageURLs,
         bookingInfo: state.PropertyReducer.bookingInfo
      };
  }
export default connect(mapStateToProps)(Welcome);
