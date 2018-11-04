import React,{ Component } from 'react';
import ProfileHeader from './profileheader.js';
import './../images/property.css';
import { Link,Redirect } from 'react-router-dom'
// import * as UTIL from './../../utils/util';
import * as VALIDATION from './../util/validation';
import { connect } from 'react-redux';
import {propertyPricingHandler} from './../api/Api';
import {bindActionCreators} from 'redux';

class Pricing extends Component {
        constructor() {
          super();
          this.propertyPricingDetails=  {
              availabilityStartDate:'',
              availabilityEndDate:'',
              propertyPricing:'',
              nightStay:''
          }
      }
   clickHandler=()=>{
        this.propertyPricingDetails.email=this.props.currentUser;
        this.propertyPricingDetails.propertyLocation=this.props.propertyLocation;
        this.propertyPricingDetails.propertyDetails=this.props.propertyDetails;
        this.propertyPricingDetails.bookingType=this.props.bookingType;
        this.props.propertyPricingHandler(this.propertyPricingDetails);
    }

  render() {
    return (
              <div className="location-container">
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
                  <div className="tab-pane active" id="location">
                    <form>
                        <h1 className="details-location">How much do you want to charge?</h1>
                        <hr className="property-line"/>
                        <h3 className="pricing-msg">We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</h3>
                        <hr className="property-line"/>
                        <br></br>

                               <label className="price-label"> Nightly Base Rate: </label>
                                    <input className="price-class" type="number" onChange={(event) => { this.propertyPricingDetails.nightStay= event.target.value}}/>
                              <label className="property-price-label"> Property Pricing: </label>
                                    <input className="property-price-class" type="number" onChange={(event) => { this.propertyPricingDetails.propertyPricing= event.target.value}}/>
                                    <br></br>
                                    <br></br>
                              <label className="start-label">Availability Start Date:</label>
                              <input className="select-date" type="date" id="start" name="trip"
                                     min={new Date().toISOString().split('T')[0]} max="2020-12-31"
                                     onChange={(event) => { this.propertyPricingDetails.availabilityStartDate = event.target.value}} />

                           <label className="end-label">Availability End Date:</label>
                              <input className="select-date1" type="date" id="start" name="trip"
                                     min={new Date().toISOString().split('T')[0]} max="2020-12-31"
                                     onChange={(event) => { this.propertyPricingDetails.availabilityEndDate = event.target.value}} />
                          <button type="button" className="btn-class pricing" onClick={()=>{
                            (VALIDATION.emptyDate(this.propertyPricingDetails.nightStay,"Nightly Price") && VALIDATION.emptyDate(this.propertyPricingDetails.propertyPricing,"Property Pricing")
                            && VALIDATION.emptyDate(this.propertyPricingDetails.availabilityStartDate,"Start Date") && VALIDATION.emptyDate(this.propertyPricingDetails.availabilityEndDate,"End Date")
                            && VALIDATION.validateStartEndDate(this.propertyPricingDetails.availabilityStartDate,this.propertyPricingDetails.availabilityEndDate))==true?
                            this.clickHandler():''}}>Submit</button>
                    </form>
                  </div>
                      <div className="footer-div">
                        <footer className="footer-owner2">
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
         bookingInfo: state.PropertyReducer.bookingInfo,
         propertyLocation: state.PostPropertyReducer.propertyLocation,
         propertyDetails: state.PostPropertyReducer.propertyDetails,
         bookingType: state.PostPropertyReducer.bookingType
      };
  }
  function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({propertyPricingHandler: propertyPricingHandler}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Pricing);
