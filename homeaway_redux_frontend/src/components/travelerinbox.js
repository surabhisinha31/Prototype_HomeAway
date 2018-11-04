import React,{ Component } from 'react';
import './../images/inbox.css';
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
import {ownerReplyHandler} from './../api/Api';

class TravelerInbox extends Component {
  constructor(props){
    super(props);
    this.message={
      message:'',
      readStatus:'NOT REPLIED BY OWNER',
      replyStatus:'REPLIED'
    }
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
                                  <th >To</th>
                                  <th >Message</th>
                                  <th >Property Headline</th>
                                  <th>Status</th>
                                  <th>Response</th>
                                  </tr>
                                </thead>
                                {
                                  this.props.inboxDetails != undefined ?
                                      this.props.inboxDetails.map((inbox) => {

                                       return(
                                              <tbody>
                                                 <tr>
                                                    <td className="inbox-from">{inbox.owner_email}</td>
                                                    <td className="inbox-from">{inbox.sent_message}</td>
                                                    <td className="inbox-from">{inbox.property_headline}</td>
                                                    <td className="inbox-from">{inbox.mail_status=='Replied'?inbox.mail_status:this.message.readStatus}</td>
                                                    <td className="inbox-from">{inbox.mail_status=='Replied'?inbox.received_message: this.message.readStatus

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
         inboxDetails : state.PropertyReducer.inboxDetails
      };
  }
//   function matchDispatchToProps(dispatch){
//     console.log("Dispatch",dispatch);
//     return bindActionCreators({ownerReplyHandler: ownerReplyHandler}, dispatch);
// }
export default connect(mapStateToProps,null)(TravelerInbox);
