import React,{ Component } from 'react';
import ProfileHeader from './profileheader.js';
import './../images/property.css';
import {propertyDetailsHandler} from './../api/Api';
import {bindActionCreators} from 'redux';
import * as VALIDATION from './../util/validation';
import { connect } from 'react-redux';
class Details extends Component {
        constructor() {
          super();
          this.propertyDetails=  {
              propertyHeadline:'',
              propertyDescription:'',
              propertyType:'',
              bedroomNumber:'',
              bathroomNumber:'',
              accomodation:'',
              propertyArea:''
          }
      }
   clickHandler=()=>{
        this.props.propertyDetailsHandler(this.propertyDetails);
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
                    <form action="/booking">
                        <h1 className="details-location"> Describe your property</h1>
                        <hr className="property-line"/>
                        <label className="description-label">
                          Start out with a descriptive headline and a detailed summary of your property.
                         </label>
                        <textarea className="headline-cls"rows="3" placeholder="Headline"
                        onChange={(event) => { this.propertyDetails.propertyHeadline = event.target.value}}/>
                         <label className="feedback-input">
                          (minimum 20 characters required)
                         </label>

                         <textarea  rows="4" className="headline-cls1" placeholder="Property Description"
                         onChange={(event) => { this.propertyDetails.propertyDescription = event.target.value}}/>
                           <label className="feedback-input1">
                               (minimum 400 characters required)
                           </label>
                           <br></br><br></br>

                            <label className="type-label"> Propety Type: </label>
                                <select className="select-type" name="Property Type" onChange={(event) => { this.propertyDetails.propertyType = event.target.value}}>
                                  <option value="apartment">Apartment</option><option value="barn">Barn</option><option value="bed &amp; breakfast">Bed &amp; Breakfast</option><option value="boat">Boat</option><option value="bungalow">Bungalow</option><option value="cabin">Cabin</option><option value="campground">Campground</option><option value="castle">Castle</option><option value="chalet">Chalet</option><option value="country house / chateau">Chateau / Country House</option><option value="condo">Condo</option><option value="corporate apartment">Corporate Apartment</option><option value="cottage">Cottage</option><option value="estate">Estate</option><option value="farmhouse">Farmhouse</option><option value="guest house/pension">Guest House</option><option value="hostel">Hostel</option><option value="hotel">Hotel</option><option value="hotel suites">Hotel Suites</option><option value="house">House</option><option value="house boat">House Boat</option><option value="lodge">Lodge</option><option value="Mill">Mill</option><option value="mobile home">Mobile Home</option><option value="Recreational Vehicle">Recreational Vehicle</option><option value="resort">Resort</option><option value="studio">Studio</option><option value="Tower">Tower</option><option value="townhome">Townhome</option><option value="villa">Villa</option><option value="yacht">Yacht</option>
                              </select>
                              <br></br>

                              <label className="bed-label"> Bedrooms: </label>
                              <input type="number" className="bed-class" onChange={(event) => { this.propertyDetails.bedroomNumber = event.target.value}}/>

                               <label className="bath-label"> Bathrooms: </label>
                               <input className="bath-class" type="number" onChange={(event) => { this.propertyDetails.bathroomNumber = event.target.value}}/>
                                <br></br>

                                <label className="accomodation-label"> Accommodates: </label>
                                <input className="accomodation-class" type="number" onChange={(event) => { this.propertyDetails.accomodation = event.target.value}}/>

                               <label className="area-label"> Property Area: </label>
                                <input className="area-class" type="number" onChange={(event) => { this.propertyDetails.propertyArea = event.target.value}}/>
                                <button type="button" onClick={()=> {
                                  (VALIDATION.emptyDate(this.propertyDetails.propertyHeadline,"Property Headline") && VALIDATION.emptyDate(this.propertyDetails.propertyDescription,"Property Description")
                                  && VALIDATION.emptyDate(this.propertyDetails.propertyType,"Property Type") && VALIDATION.emptyDate(this.propertyDetails.bedroomNumber,"Bedroom")
                                  && VALIDATION.emptyDate(this.propertyDetails.bathroomNumber,"Bathroom") && VALIDATION.emptyDate(this.propertyDetails.accomodation,"Accomodation")
                                  && VALIDATION.emptyDate(this.propertyDetails.propertyArea,"Property Area"))==true? this.clickHandler():''}} className="btn-class detail">Next</button>
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
         bookingInfo: state.PropertyReducer.bookingInfo
      };
  }
  function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({propertyDetailsHandler: propertyDetailsHandler}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Details);
