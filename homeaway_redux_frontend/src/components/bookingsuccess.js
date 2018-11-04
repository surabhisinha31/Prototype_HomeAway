import React,{ Component } from 'react';
import './../images/card.css';
import { connect } from 'react-redux';
import { Button} from 'react-bootstrap';
import { Route, withRouter,Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import ProfileHeader from './profileheader';
import Panel from 'react-bootstrap/lib/Panel'
import {history} from "../util/utils";

class BookingSuccess extends Component {
    constructor(){
        console.log("its show in constructor");
        super();
    }
    render() {
        return (
            <div>
                <div className="booking-header">
                    <ProfileHeader/>
                </div>
                <div>
                    <div className="success-container">
                    <b className="booking"><h2>Thank You for booking with us..!!</h2></b><br/><br/>
                    <b ><h2 className="booking1">Booking Details:<span className="glyphicon glyphicon-ok tick"></span></h2></b>
                                  <div>
                                  <table className="table">
                                      <tbody>
                                        <tr>
                                          <td><strong>Booking ID</strong></td>
                                          <td>{this.props.bookingInfo._id}</td>
                                        </tr>
                                        <tr>

                                          <td><strong>Property Name</strong></td>
                                          <td>{this.props.clickedProperty.property_headline}</td>
                                        </tr>

                                        <tr>
                                          <td><strong>Booked Location</strong></td>
                                          <td>{this.props.clickedProperty.property_location}</td>
                                        </tr>
                                        <tr>
                                          <td><strong>Booking Amount</strong></td>
                                          <td>{this.props.bookingInfo.total_pricing}</td>
                                        </tr>
                                        <tr>
                                          <td><strong>Start Date</strong></td>
                                          <td>{this.props.bookingInfo.start_date.split('T')[0]}</td>
                                        </tr>
                                        <tr>
                                          <td><strong>End Date</strong></td>
                                          <td>{this.props.bookingInfo.end_date.split('T')[0]}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <button onClick ={() => {history.push('./searchtile')}} className="btn-class bookingsuccess1"><strong>Return to Property Results</strong></button>
                                    <button onClick ={() => {history.push('./userhome')}} className="btn-class bookingsuccess"><strong>Search Again</strong></button>
                                  </div>
                    </div>
                </div>


            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
       currentUser: state.LoginReducer.currentUser,
       propertyResults: state.PropertyReducer.propertyResults,
       userResults: state.PropertyReducer.userResults,
       clickedProperty: state.PropertyReducer.clickedProperty,
       clickedPropertyImageURLs: state.PropertyReducer.clickedPropertyImageURLs,
       bookingInfo: state.PropertyReducer.bookingInfo
    };

}
export default connect(mapStateToProps,null)(BookingSuccess);
