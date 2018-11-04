import React,{ Component } from 'react';
import './../images/card.css';
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem  from 'react-bootstrap/lib/NavItem'
import { connect } from 'react-redux';
import { Button,ButtonToolbar,ButtonGroup } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import * as ReactBootstrap from 'react-bootstrap';
import Card from './card';
// import CardList from './cardlist';
import BookingTable from './bookingtable';
import './../images/homeimage.jpg';
import 'tachyons';
// import { Carousel } from 'react-responsive-carousel';
import ControlledCarousel from './controlledCarousel';
import { Route, withRouter } from 'react-router-dom';
import ProfileHeader from './profileheader';

class PropertyDetailedList extends Component {

  render() {
    return (
      <div>
      <div className="detailPage-header">
        <ProfileHeader/>
      </div>
    		 <div className="propertydetail-container">
            <ControlledCarousel/>
            <div>
              <p className="para-data"><strong>Book online</strong> or call HomeAway Booking Assistance 123-145-0000 </p>
             </div>
              <BookingTable/>
              <div className="desc-property">
                  <h1>{this.props.clickedProperty.property_headline}</h1>
                  <hr/>
              </div>
              <div className="desc-property">
                <table>
                  <tr>
                    <th>Details</th>
                    <td><span className="glyphicon glyphicon-home"></span></td>
                    <td><span className="glyphicon glyphicon-user"></span></td>
                    <td><span className="glyphicon glyphicon-hdd"></span></td>
                    <td><span className="glyphicon glyphicon-tint"></span></td>
                  </tr>
                </table>
                <table>
                  <tr>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    <td>Apartment</td>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    <td>Sleeps</td>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    <td>Bedrooms</td>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    <td>Bathrooms</td>
                  </tr>
                </table>
                <table>
                  <tr>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    <td>{this.props.clickedProperty.property_area}</td>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    <td>{this.props.clickedProperty.accommodation}</td>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    <td>{this.props.clickedProperty.bedrooms}</td>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    <td>{this.props.clickedProperty.bathrooms}</td>
                  </tr>
                </table>
                <hr className="hori-line"/>
                <table>
                  <tr>
                    <td ><h2 className="desc-headline">About the Property</h2></td>
                    <td>&nbsp;</td><td>&nbsp;</td>
                    <td ><h4>{this.props.clickedProperty.property_headline}</h4></td>
                  </tr>
                  <tr>
                  <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                   <td> <p className="desc-property3">{this.props.clickedProperty.property_description}</p>
                  </td>
                  </tr>
                </table>

                <div className="desc-property1">
                  <h1>Amenities</h1>
                </div>
                <div className="desc-property1">
                  <h4>Apartment Accommodation and Amenities</h4>
                </div>
                <table className="amenities-desc">
                  <tr classType="row-color">
                    <td ><h4>Property Type: </h4></td>
                    <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td>
                    <td ><h4 className="desc-property2">{this.props.clickedProperty.property_type}</h4></td>
                  </tr>
                  <tr>
                     <td ><h4>Building Type: </h4></td>
                    <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td>
                    <td ><h4 className="desc-property2"> Building</h4></td>
                  </tr>
                  <tr classType="row-color">
                     <td ><h4> Floor Area:</h4></td>
                    <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td>
                    <td ><h4 className="desc-property2"> {this.props.clickedProperty.property_area}</h4></td>
                  </tr>
                </table>
              </div>
          </div>
          </div>
        );
	  }
	}

  function mapStateToProps(state) {
    console.log("State",state);
      return {
         propertyResults: state.PropertyReducer.propertyResults,
         userResults: state.PropertyReducer.userResults,
         clickedProperty: state.PropertyReducer.clickedProperty,
         clickedPropertyImageURLs: state.PropertyReducer.clickedPropertyImageURLs
      };
  }


export default connect(mapStateToProps)(PropertyDetailedList);
