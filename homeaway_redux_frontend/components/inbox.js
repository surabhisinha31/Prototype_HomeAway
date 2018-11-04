import React,{ Component } from 'react';
import './../images/inbox.css';
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem  from 'react-bootstrap/lib/NavItem'
import ProfileHeader from './profileheader.js';
import Nav from 'react-bootstrap/lib/Nav'
import { Button} from 'react-bootstrap';
import { Route, withRouter,Link } from 'react-router-dom';
import homeawaylogo from './../images/HomeAway_logo.png';
import homeicon from './../images/homeicon.png';
import inboxicon from './../images/mail.jpg';
import { Glyphicon } from 'react-bootstrap';
import * as UTIL from './../util/utils';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {ownerReplyHandler} from './../api/Api';

class Inbox extends Component {
  constructor(props){
    super(props);
    this.message={
      message:'',
      readStatus:'UNREAD',
      replyStatus:'REPLIED',
      currentMessage:{}
    }
  }
replyHandler=(data)=> {
  data.currentMessage.sent_message=this.message.message;
  data.currentMessage.mail_id=this.message.mail_id;
  console.log("Data value: ",data);
  this.props.ownerReplyHandler(data.currentMessage);
}
  render() {
    return (
              <div className="inbox-header">
                <ProfileHeader/>
                     <div className="inbox-Info">
                        <div className="inbox-dashboard">
                        <span className="glyphicon glyphicon-envelope mailuser"></span>
                        <h2 className="mail-heading"> Mailbox </h2>
                            <table className="table table-hover">
                                <thead className="active">
                                  <tr>
                                  <th >From</th>
                                  <th >Message</th>
                                  <th >Property Headline</th>
                                  <th>Status</th>
                                  <th>Response</th>
                                  </tr>
                                </thead>
                                {
                                  this.props.inboxDetails != undefined ?
                                      this.props.inboxDetails.map((inbox) => {
                                        {this.message.currentMessage=inbox}
                                       return(
                                              <tbody>
                                                 <tr>
                                                    <td className="inbox-from">{inbox.user_email}</td>
                                                    <td className="inbox-from1">{inbox.received_message}</td>
                                                    <td className="inbox-from2">{inbox.property_headline}</td>
                                                    <td className="inbox-from">{inbox.mail_status=='Replied'?inbox.mail_status:this.message.readStatus}</td>
                                                    <td className="inbox-from">{inbox.mail_status=='Replied'?inbox.sent_message:
                                                    <div>
                                                    <textarea className="inbox-cls"rows="3" placeholder="Reply here.!!!"
                                                    onChange={(event) => { this.message.message = event.target.value,this.message.mail_id = inbox.mail_id}}/>
                                                    <button type="button" className="btn-class reply" onClick={ () => {this.replyHandler(this.message)} }>Reply</button>
                                                    </div>
                                                      }
                                                      </td>
                                                    </tr>
                                              </tbody>);
                                                })  : ''
                                              }
                                        </table>
                                    </div>
                            <Link to='/userhome' className="return-success">Go to Home Page </Link>
                        </div>
                    </div>
                  );
                }
      }
  function mapStateToProps(state) {
    console.log("State",state);
      return {
         currentUser: state.LoginReducer.currentUser,
         ownerFlag: state.LoginReducer.ownerFlag,
         propertyResults: state.PropertyReducer.propertyResults,
         userResults: state.PropertyReducer.userResults,
         clickedProperty: state.PropertyReducer.clickedProperty,
         inboxDetails : state.PropertyReducer.inboxDetails,
         clickedPropertyImageURLs: state.PropertyReducer.clickedPropertyImageURLs,
         bookingInfo: state.PropertyReducer.bookingInfo,
         dashboardDetails: state.DashBoardReducer.dashboardDetails
      };
  }
  function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({ownerReplyHandler: ownerReplyHandler}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Inbox);
