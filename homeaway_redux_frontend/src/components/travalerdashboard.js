import React,{ Component } from 'react';
import './../images/billing.css';
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem  from 'react-bootstrap/lib/NavItem'
import ProfileHeader from './profileheader.js';
import BookingGraphs from './booking_graph.js';
import Nav from 'react-bootstrap/lib/Nav'
import {filteredDashBoard} from './../api/Api';
import { Button} from 'react-bootstrap';
import { Route, withRouter,Link } from 'react-router-dom';
import homeawaylogo from './../images/HomeAway_logo.png';
import homeicon from './../images/homeicon.png';
import inboxicon from './../images/mail.jpg';
import { Glyphicon } from 'react-bootstrap';
import * as UTIL from './../util/utils';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class DashBoard extends Component {
  constructor() {
    super();
    this.state={
      currentPage: 1,
      todosPerPage: 5
    }
    this.dashboardInfo={
      startDate:'',
      endDate:''
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage : Number(event.target.id)
    });
    window.scrollTo(0, 0);
  }
  handleSearch(data) {
    data.currentuser = this.props.currentUser;
    data.startDate = this.dashboardInfo.startDate;
    data.endDate = this.dashboardInfo.endDate;
    console.log("value of data in dashbaord search: ", data);
    this.props.filteredDashBoard(data);
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.props.filtereddashboardDetails.slice(indexOfFirstTodo, indexOfLastTodo);
    const TOTAL_COUNT=this.props.filtereddashboardDetails.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.filtereddashboardDetails.length / todosPerPage); i++) {
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

    console.log("booking details: ",this.props.filteredDashBoard, typeof(this.props.filteredDashBoard))
    return (
              <div className="traveler-header">
                <ProfileHeader/>

                     <div className="Hotel-billing-Info">
                        <div className="table-dashboard">
                        <h2 className="dash-heading">Travelers DashBoard </h2>
                        <span className="glyphicon glyphicon-list-alt list"></span>
                        <BookingGraphs/>
                        <div className="owner-table">
                            <table className="table table-hover">
                                <thead className="active">
                                  <tr>
                                  <th >Booking ID</th>
                                  <th >User ID</th>
                                  <th >Property Name</th>
                                  <th>Booking Start Date</th>
                                  <th>Booking End Date</th>
                                  <th >Booking Amount</th>
                                  </tr>
                                </thead>
                                {
                                    currentTodos!= undefined ?
                                      currentTodos.map((booking) => {
                                       return(<tbody>
                                                 <tr>
                                                    <td className="header-owner">{booking.booking_id}</td>
                                                    <td className="header-owner">{booking.user_email}</td>
                                                    <td className="header-owner">{booking.property_headline}</td>
                                                    <td className="header-owner">{booking.start_date.split('T')[0]}</td>
                                                    <td className="header-owner">{booking.end_date.split('T')[0]}</td>
                                                    <td className="header-owner">{booking.total_pricing}</td></tr>
                                              </tbody>);
                                                })  : ''
                                  }
                            </table>
                            </div>
                            <input type="date"  className="dashboard-txt" id="checkInDate" min={new Date().toISOString().split('T')[0]} max="2020-12-31"  defaultValue="startDtae" name="availabilityStartDate" placeholder="Start Date"
                            onChange={(event) => { this.dashboardInfo.startDate = event.target.value}}/>
                            <input type="date"  className="dashboard-txt"id="checkOutDate" min={new Date().toISOString().split('T')[0]} max="2020-12-31"  defaultValue="endDate" name="availabilityEndDate" placeholder="End Date"
                            onChange={(event) => { this.dashboardInfo.endDate = event.target.value}}/>
                            <button type="button" className="btn-class searchdash"  onClick={() =>this.handleSearch(this.dashboardInfo)}>Search</button>
                            <ul id="page-numbers1" className="pagination-style">
                                    {renderPageNumbers}
                            </ul>
                            <Link to='/userhome' className="return-success">Go to Home Page </Link>



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
         filtereddashboardDetails: state.DashBoardReducer.filtereddashboardDetails
      };
  }
  function matchDispatchToProps(dispatch){
      console.log("Dispatch",dispatch);
      return bindActionCreators({filteredDashBoard: filteredDashBoard}, dispatch);
  }
export default connect(mapStateToProps,matchDispatchToProps)(DashBoard);
