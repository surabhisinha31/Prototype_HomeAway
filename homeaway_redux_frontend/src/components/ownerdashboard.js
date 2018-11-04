import React,{ Component } from 'react';
import './../images/billing.css';
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem  from 'react-bootstrap/lib/NavItem'
import ProfileHeader from './profileheader.js';
import Nav from 'react-bootstrap/lib/Nav'
import './../images/profile.css';
import { Button} from 'react-bootstrap';
import { Route, withRouter,Link } from 'react-router-dom';
import homeawaylogo from './../images/HomeAway_logo.png';
import homeicon from './../images/homeicon.png';
import inboxicon from './../images/mail.jpg';
import { Glyphicon } from 'react-bootstrap';
import * as UTIL from './../util/utils';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import MonthlyIncomeGraphs from './monthlyincome.js';
import {updatedDashBoardHandler} from './../api/Api';

class OwnerDashBoard extends Component {
  constructor(){
    super();
    this.propertyInfo={
      property_headline:''
    };
    this.state={
      currentPage: 1,
      todosPerPage: 5
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage : Number(event.target.id)
    });
    window.scrollTo(0, 0);
  }
  render() {
    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.props.updateddashboardDetails.slice(indexOfFirstTodo, indexOfLastTodo);
    const TOTAL_COUNT=this.props.updateddashboardDetails.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.updateddashboardDetails.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
              <div className="traveler-header">
                  <ProfileHeader/>

                  <div className="Hotel-billing-Info">
                  <div className="owner-dashboard">
                      <h3 className="owner-header"> Owners Dashboard </h3>
                      <span className="glyphicon glyphicon-list-alt list"></span>
                      <MonthlyIncomeGraphs/>
                        <div className="owner-table">
                            <table className="table table-hover active1">
                            <thead className="active1">
                                  <tr>
                                  <th >Property Name</th>
                                  <th >Owner Email</th>
                                  <th >Booking ID</th>
                                  <th >Traveler Email</th>
                                  <th>Booking Start Date</th>
                                  <th>Booking End Date</th>
                                  <th >Booking Amount</th>

                                  </tr>
                                </thead>
                                {
                                    currentTodos != undefined ?
                                      currentTodos.map((property) => {
                                       return(
                                        <tbody>
                                            <tr>
                                                      <td className="header-owner">{property.property_headline}</td>
                                                      <td className="header-owner">{property.owner_email}</td>
                                                      <td className="header-owner">{property.booking_id}</td>
                                                      <td className="header-owner">{property.user_email}</td>
                                                      <td className="header-owner">{property.start_date.split('T')[0]}</td>
                                                      <td className="header-owner">{property.end_date.split('T')[0]}</td>
                                                      <td className="header-owner">{property.total_pricing}</td>
                                            </tr>
                                        </tbody>);
                                              })  : ''
                                  }
                            </table>
                            <input type="text" className="property-filter" id="propertyId" placeholder="Property Name"
                            onChange={(userinput) => {
                                this.propertyInfo.property_headline=userinput.target.value}}/>
                                <br></br>
                            <button type="button" onClick={() => this.props.updatedDashBoardHandler(this.propertyInfo)} className="btn-class propertySearch">Search</button>
                            <ul id="page-numbers1" className="pagination-style">
                              {renderPageNumbers}
                            </ul>
                            <Link to='/userhome' className="return-success">Go to Home Page </Link>
                        </div>
                        </div>
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
         dashboardDetails: state.DashBoardReducer.dashboardDetails,
         ownerdashboardDetails: state.DashBoardReducer.ownerdashboardDetails,
         updateddashboardDetails: state.DashBoardReducer.updateddashboardDetails
      };
  }
  function matchDispatchToProps(dispatch){
      console.log("Dispatch",dispatch);
      return bindActionCreators({updatedDashBoardHandler: updatedDashBoardHandler}, dispatch);
  }


export default connect(mapStateToProps,matchDispatchToProps)(OwnerDashBoard);
