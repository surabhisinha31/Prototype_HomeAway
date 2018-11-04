import React,{ Component } from 'react';
import TopHeader from './topheader';
import ProfileHeader from './profileheader';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Nav from 'react-bootstrap/lib/Nav'
import {propertysearch} from './../api/Api';
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem  from 'react-bootstrap/lib/NavItem'
import * as VALIDATION from './../util/validation';
import { Button} from 'react-bootstrap';
import homeawaylogo from './../images/HomeAway_logo.png';
import homeicon from './../images/homeicon.png';
import inboxicon from './../images/mail.jpg';
import { Glyphicon } from 'react-bootstrap';
import './../images/home.css';
import * as UTIL from './../util/utils';

class UserHome extends Component {
  constructor() {
    super();
    this.propertyinfo={
      currentUser:'',
      propertyLocation:'',
      availabilityStartDate:'',
      availabilityEndDate: '',
      accomodation: '',
      servertoken: UTIL.getServerTokenDetails()
    };
  }

  handleSearch(data) {
    data.email = this.props.currentUser;
    console.log("value of data: ", data);
    this.props.propertysearch(data);
  }

  render() {
    return (
    <div className="home-page">
    <div className="container-fluid">
      <div>
          {this.props.currentUser!=''?<ProfileHeader/>:<TopHeader/>}
      </div>
    </div>
        <h1 className="heading-homepage">Book beach houses, cabins, condos and more, worldwide </h1>
    <form className="search-form">
                <input type="text"  className="text-fld lg" id="location" placeholder="Where do you want to go?" name="propertyLocation"
                  onChange={(event) => { this.propertyinfo.propertyLocation = event.target.value}}/>
                <input type="date"  className="text-fld" id="checkInDate" min={new Date().toISOString().split('T')[0]} max="2020-12-31"  name="availabilityStartDate" placeholder="Check-in"
                onChange={(event) => { this.propertyinfo.availabilityStartDate = event.target.value}}/>
                <input type="date"  className="text-fld" id="checkOutDate" min={new Date().toISOString().split('T')[0]} max="2020-12-31"  name="availabilityEndDate" placeholder="Check-out"
                onChange={(event) => { this.propertyinfo.availabilityEndDate = event.target.value}}/>
                <input type="number" className="text-fld" id="accommodation" name="accomodation" placeholder="1 Guest"
                onChange={(event) => { this.propertyinfo.accomodation = event.target.value}}/>
                <button type="button" className="btn-class"  onClick={() =>
                  (VALIDATION.emptyDate(this.propertyinfo.propertyLocation,"Location") && VALIDATION.emptyDate(this.propertyinfo.availabilityStartDate,"Start Date") && VALIDATION.emptyDate(this.propertyinfo.availabilityEndDate,"End Date")
                  && VALIDATION.validateStartEndDate(this.propertyinfo.availabilityStartDate,this.propertyinfo.availabilityEndDate) && VALIDATION.emptyDate(this.propertyinfo.accomodation,"Accomodation") )==true? this.handleSearch(this.propertyinfo):''}>Search</button>
             </form>
             <div>
                  <footer className="footer-home">
                  <table>
                  <tr>
                    <th> <h3 className="bold-heading"> Your whole vacation starts here </h3></th>
                    <th> <h3 className="bold-heading"> Book and stay with confidence</h3></th>
                    <th> <h3 className="bold-heading"> Your vacation your way</h3></th>
                   </tr>
                    <tr>
                      <td><h4 className="normal-heading">Choose a rental from the worlds best selection</h4></td>
                      <td><h4 className="normal-heading">Secure payments,peace of mind</h4></td>
                      <td> <h4 className="normal-heading">More space,more privacy,no compromises</h4></td>
                     </tr>
                  </table>
                  </footer>
              </div>
    </div>
    );
  }
}

  function mapStateToProps(state) {
    console.log("State",state);
      return {
         currentUser: state.LoginReducer.currentUser
      };
  }

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({propertysearch: propertysearch}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(UserHome);
