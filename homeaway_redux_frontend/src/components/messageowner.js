import React,{ Component } from 'react';
import './../images/card.css';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import ProfileHeader from './profileheader';
import { Button} from 'react-bootstrap';
import {sendMessage} from './../api/Api';
import * as VALIDATION from './../util/validation';
import { Glyphicon } from 'react-bootstrap';
import { Route, withRouter,Link } from 'react-router-dom';
// import * as UTIL from './../util/utils';
class MessageOwner extends Component {
  constructor() {
    super();
    this.messageInfo={
      message:''
    };
  }
clickHandler(data){
  data.currentUser=this.props.currentUser;
  data.property_headline=this.props.clickedProperty.property_headline;
  data.property_id=this.props.clickedProperty.property_id;
  data.owner_email=this.props.clickedProperty.owner_email;
  this.props.sendMessage(data);
}
  render() {
    return (
          <div>
          <div className="message-container">
             <ProfileHeader/>
           </div>
              <label className="message-label">
                  Message to owner
               </label>
               <br></br>
              <textarea className="message-cls"rows="5" cols="50" placeholder="Message"
              onChange={(event) => { this.messageInfo.message = event.target.value}}/>
              <button type="button" onClick={() =>
                (VALIDATION.emptyDate(this.messageInfo.message,"Message"))==true?
                this.clickHandler(this.messageInfo):''}className="btn-class send">Send</button>
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
    return bindActionCreators({sendMessage: sendMessage}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(MessageOwner);
