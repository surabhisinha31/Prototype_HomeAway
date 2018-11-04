import React,{ Component } from 'react';
import TopHeader from './topheader';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {userlogin} from './../api/Api';
import { Button,Modal,Checkbox } from 'react-bootstrap';
import facebookicon from './../images/facebookicon.jpg';
import googleicon from './../images/googleicon.jpg';
import './../images/redux.css';
import * as VALIDATION from './../util/validation';
class UserSignIn extends Component {
  constructor(){
      super();
      this.userinfo={
        username:'',
        password:''
      }
  }
  render() {
    console.log(" User Sign In render");
    return (
    <div className="main-div">
        <TopHeader/>
    <div className="login-div">
        <h1 className="login-header"> Need an account ?
            <a href="signup" className="header-img"> Sign Up</a>
        </h1>
        <h4 className="login-header"> Log in to HomeAway </h4>
    </div>
    <div className="container-fluid" style={{marginTop:"3%",marginLeft:"1%"}} >
          <form className="form-group">
            <div className="field-details">
              <h3 className="header-login1"> Account Login </h3>
              <hr/>
              <input type="text" className="txt-field" id="username" placeholder="Email Id "
              onChange={(userinput) => {
                  this.userinfo.username=userinput.target.value}}/>
              <input type="password" className="txt-field" id="password" placeholder="Password"
              onChange={(userpassword) => {
                  this.userinfo.password=userpassword.target.value}}/>
              </div>
            <div >
            <a href="#" className="forgot-pwd2"> Forgot Password </a><br></br>

            <button type="button" onClick={() =>
              (VALIDATION.validateEmail(this.userinfo.username,"Username") && VALIDATION.emptyDate(this.userinfo.password,"Password"))==true?this.props.userLogin(this.userinfo):''  
            } className="btn btn-primary login">Login</button>

            <Checkbox checked readOnly className="check-field1"> Keep me signed in </Checkbox>
            <button className="fb-button1" ><img className="fb-image" src ={facebookicon} />Log in with Facebook</button><br></br>
            <button className="google-button1"><img className="fb-image" src ={googleicon}/>Log in with Google</button>
            <p className="footer">We dont post anything without your permission.</p>
            <a href="ownersignin" className="header-owner"> Owner Login</a>
            </div>
          </form>

          </div>

    </div>
    );
  }
}

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({userLogin: userlogin}, dispatch);
}
export default connect(null, matchDispatchToProps)(UserSignIn);
