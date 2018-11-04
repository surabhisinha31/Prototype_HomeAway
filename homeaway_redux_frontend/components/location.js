import React,{ Component } from 'react';
import ProfileHeader from './profileheader.js';
import { Route, Redirect,withRouter } from 'react-router-dom';
// import * as VALIDATION from './../util/validation';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {propertyLocationHandler} from './../api/Api';
import * as VALIDATION from './../util/validation';

class Location extends Component {
  constructor() {
    super();
      propertyLocation:''
  }
 clickHandler=()=>{
      this.props.propertyLocationHandler(this.propertyLocation);
}
  render() {
    return (
              <div>
              <div className="location1-container">
                 <ProfileHeader/>
               </div>
                      <div className="col-xs-3 loc-con1">
                        <ul className="nav nav-tabs tabs-left">
                          <li className="first"><a href="#home" data-toggle="tab">Welcome</a></li>
                          <li className="second"><a href="/location" data-toggle="tab">Location</a></li>
                          <li className="third"><a href="/details" data-toggle="tab">Details</a></li>
                          <li className="fourth"><a href="/booking" data-toggle="tab">Booking</a></li>
                          <li className="fifth"><a href="/pricing" data-toggle="tab">Pricing</a></li>
                          <li className="sixth"><a href="/photos" data-toggle="tab">Photos</a></li>
                        </ul>
                     </div>
                  <div className="tab-pane active" id="location">
                    <form>
                        <h1 className="details-location"> Verify the location of your rental </h1>
                        <hr className="property-line"/>
                        <label className="address-label">
                          Address:
                         </label>
                         <br></br>
                        <textarea rows="8" cols="50" className="area-location"
                        onChange={(event) => { this.propertyLocation = event.target.value}}/>

                      <button type="button" onClick={()=>{
                        (VALIDATION.emptyDate(this.propertyLocation,"Location"))==true?
                        this.clickHandler():''}} className="btn-class location">Next</button>
                    </form>
                  </div>
                      <div className="footer-div">
                        <footer className="footer-owner1">
                           <p>Use of this Web site constitutes acceptance of its creators <a href="#" >Terms and conditions </a> and <a> Privacy policy.</a></p>
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
  function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({propertyLocationHandler: propertyLocationHandler}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Location);
