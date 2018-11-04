import React,{ Component } from 'react';
import ProfileHeader from './profileheader.js';
import './../images/property.css';
import { connect } from 'react-redux';
import {bookingTypeHandler} from './../api/Api';
import {bindActionCreators} from 'redux';
import * as VALIDATION from './../util/validation';
class Booking extends Component {
          constructor() {
          super();
          bookingType:'Instant'
      }
   clickHandler=()=>{
        this.props.bookingTypeHandler(this.bookingType);
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
                    <form action="/pricing">
                        <h1 className="details-location">Booking options</h1>
                        <hr className="property-line"/>
                        <label className="booking-label">
                            Select a booking method
                         </label>

                         <br></br>
                         <br></br>
                          <div className="radio">
                            <label>
                              <input name="booking" type="radio" value="Instant"  onChange={(event) => { this.bookingType = event.target.value}}/>
                                  Instant
                              </label>
                             <br></br> <br></br>
                            <label>

                              <input name="booking" type="radio" value="24 hours Confirmation" onChange={(event) => { this.bookingType = event.target.value}}/>
                                 24 hours Confirmation
                            </label>
                          </div>
                          {this.bookingType}
                          <button type="button" className="btn-class booking" onClick={()=>{
                            (VALIDATION.emptyDate(this.bookingType,"Booking Type"))==true?
                            this.clickHandler():''}} >Next</button>
                        </form>
                   </div>
                      <div className="footer-div">
                        <footer className="footer-owner3">
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
    return bindActionCreators({bookingTypeHandler: bookingTypeHandler}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Booking);
