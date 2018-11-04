import React,{ Component } from 'react';
import './../images/card.css';
import { connect } from 'react-redux';
import { Button} from 'react-bootstrap';
import { Route, withRouter,Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import ProfileHeader from './profileheader';
import Panel from 'react-bootstrap/lib/Panel'

class SuccessBooking extends Component {
  render() {
    return (
            <div>
              <div className="booking-header">
                <ProfileHeader/>
              </div>
                 <div className="succes-conatiner">
                  <Panel bsStyle="success">
                      <Panel>
                        <Panel componentClass="h3" className="thanks-msg">Thanks {this.props.bookingInfo.user_email} for booking with HomeAway</Panel>
                      </Panel>
                      <Panel className="row-success">Booking id : {this.props.bookingInfo._id}</Panel>
                      <Panel className="row-success">Booking Dates are from {this.props.bookingInfo.start_date.split('T')[0]} to {this.props.bookingInfo.end_date.split('T')[0]} </Panel>
                      <Panel className="row-success">Total amount paid is : {this.props.bookingInfo.total_pricing}</Panel>
                    </Panel>

                  </div>
                     <Link to='/userhome' className="return-success1">Go to Home Page </Link>
                
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

export default connect(mapStateToProps,null)(SuccessBooking);
