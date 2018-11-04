import React,{ Component } from 'react';
import { Route, Redirect,withRouter } from 'react-router-dom';
import './../images/login.css';
import TopHeader from './topheader';
import facebookicon from './../images/facebookicon.jpg';
import googleicon from './../images/googleicon.jpg';
import { Button,Modal,Checkbox } from 'react-bootstrap';
// import * as UTIL from './../../utils/util';
// import * as VALIDATION from './../../utils/validation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ownerSignUp} from './../api/Api';
import * as VALIDATION from './../util/validation';

class OwnerSignUp extends Component {
	constructor(props) {
		super(props);
		this.userDetails = {
			firstName: "",
			lastName: "",
			username: "",
			password: ""
		};
	}
	render() {
		return(
			<div>
			<div className="topheader-style">
					<TopHeader/>
			</div>
				<div className="home-login">
					<div>
					<h4 className="login-header"> Sign up for HomeAway </h4>
					<div className="account-para">
					<h3 className="login-header"> Already have an account ?
					 	<a href="/ownersignin" className="header-img"> Log in</a>
					 </h3>
					</div>
					</div>
					<div className="form-login">
						<form className="form-group1">
    						<table className="login-table">
    						      <tr><h3 className="header-login"> Owner Account Signup </h3></tr>
    						      <hr></hr>
    						      <tr>
    						      		<td><input type="text" className="txt-field-small1" placeholder="First Name"
                          onChange={(userinput) => {
                              this.userDetails.firstName=userinput.target.value}}/>
                          </td>
    						      		<td> <input type="text" className="txt-field-small2" placeholder="Last Name"
                          onChange={(userinput) => {
                              this.userDetails.lastName=userinput.target.value}}/>
                          </td>
    						      </tr>
    						      <tr> <td><input type="text" className="txt-field-lg" placeholder="Email Address" onChange={(userinput) => {
                          this.userDetails.username=userinput.target.value}}/>
                      </td> </tr>
    						      <tr > <td><input type="password" className="txt-field-lg" placeholder="Password"
                      onChange={(userinput) => {
                          this.userDetails.password=userinput.target.value}}/>
                      </td></tr>
    						      <button type="button" onClick={() =>
												(VALIDATION.validateName(this.userDetails.firstName,"First Name") && VALIDATION.validateName(this.userDetails.lastName,"Last Name") && VALIDATION.validateEmail(this.userDetails.username,"Username") && VALIDATION.emptyDate(this.userDetails.password,"Password") )==true?
												this.props.ownerSignUp(this.userDetails):''}
												className="btn btn-primary">Sign Me Up</button>
    						      <h5 className="horizontal-line"> <span>or</span> </h5>
    			            <button className="fb-button"><img className="fb-image" src ={facebookicon} />Log in with Facebook</button>
    			            <button className="google-button"><img className="fb-image" src ={googleicon}/>Log in with Google</button>
    			            <p className="footer">We dont post anything without your permission.</p>
    							</table>
						   </form>
					   </div>
					</div>
			</div>
			);
	}
}

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({ownerSignUp: ownerSignUp}, dispatch);
}
export default connect(null, matchDispatchToProps)(OwnerSignUp);
