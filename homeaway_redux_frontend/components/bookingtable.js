import React,{ Component } from 'react';
import './../images/card.css';
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem  from 'react-bootstrap/lib/NavItem'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button} from 'react-bootstrap';
import Card from './card';
import {history} from "../util/utils";
// import CardList from './cardlist';
import './../images/homeimage.jpg';
import 'tachyons';
import { Carousel } from 'react-responsive-carousel';
import ControlledCarousel from './controlledCarousel';
import {propertyBooking} from './../api/Api';
// import SuccessBooking from './successbooking';
// import Header from './../Headers/signup_header.js';
// import { mockdata } from './../LandingPage/mockdata';
import { Glyphicon } from 'react-bootstrap';
import { Route, withRouter,Link } from 'react-router-dom';
// import * as UTIL from './../util/utils';
class BookingTable extends Component {

  constructor() {
    super();
    this.bookinginfo={
      userEmail:'',
      ownerEmail:'',
      propertyLocation:'',
      availability_start_date:'',
      availability_end_date: '',
      accomodation: '',
      total_pricing:''
    };
  }
  clickHandler(data) {
      data.userEmail=this.props.currentUser;
      data.ownerEmail=this.props.clickedProperty.owner_email;
      var availability_start_date=new Date(this.props.clickedProperty.availability_start_date).toISOString().split('T')[0];
      data.availability_start_date=availability_start_date;
      var availability_end_date=new Date(this.props.clickedProperty.availability_end_date).toISOString().split('T')[0];
      data.availability_end_date=availability_end_date;
      data.startDate=this.props.userResults.availabilityStartDate;
      data.endDate=this.props.userResults.availabilityEndDate;
      data.propertyId=this.props.clickedProperty.property_id;
      data.accomodation=this.props.userResults.accomodation;
      data.property_headline=this.props.clickedProperty.property_headline;
      console.log("value of data: ", data);
      this.props.propertyBooking(data);

  }

  render() {
    var duration=null;
    duration = (new Date(this.props.userResults.availabilityEndDate).getDate()-new Date(this.props.userResults.availabilityStartDate).getDate())+1;
    console.log("duration calculated: " ,duration);
    this.bookinginfo.total_pricing = duration *this.props.userResults.accomodation *this.props.clickedProperty.nightly_stay;
    return (

             <div>
              <table className="static-border">

                  <tr>
                    <th> <h2>$ {this.props.clickedProperty.nightly_stay}</h2>  </th>
                  </tr>
                  {
                    console.log("clickedProperty: ", this.props.clickedProperty)
                  }
                  <tr>
                    <th> per night </th>
                  </tr>
                  <br></br>
                  <tr> Your Dates are Available </tr>
                  <br></br>
                  <tr>
                      <td><input type="date" className="txt-field-small-date" name="availabilityStartDate" value={this.props.userResults.availabilityStartDate}
                          onChange={(event) => { this.bookinginfo.startDate = event.target.value}} /> </td>
                      <td> <input type="date" className="txt-field-small-date1" name="availabilityEndDate" value={this.props.userResults.availabilityEndDate}
                            onChange={(event) => { this.bookinginfo.endDate = event.target.value}} />
                          </td>
                  </tr>
                <br></br>
                <tr>
                  <input id="guest-icon" type="text" name="accomodation" value={this.props.userResults.accomodation}
                    onChange={(event) => { this.bookinginfo.accomodation = event.target.value}}  />
                </tr>
                <br></br>
                <tr>
                  <th>Total</th>
                  <th className="txt-field-price"> $ {
                    this.bookinginfo.total_pricing
                  } </th>
                </tr>
                <tr>
                  <td> Includes taxes and fees </td>
                  <td className="tax"><a href="#"> View Details </a></td>
                </tr>
                <br></br>
                <tr><span className="glyphicon glyphicon-repeat"></span></tr>
                <tr><h4 className="confirm-heading"> 24 Hours Confirmation </h4></tr>
                <br></br>
                <tr><Link to='/messageowner' className="message-owner">Ask Owner a Question</Link></tr>
               <tr> <button className="btn-class-card" type="button" onClick={() => this.clickHandler(this.bookinginfo)}>Request to Book</button></tr>

              </table>


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
         clickedPropertyImageURLs: state.PropertyReducer.clickedPropertyImageURLs
      };
  }

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({propertyBooking: propertyBooking}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(BookingTable);
