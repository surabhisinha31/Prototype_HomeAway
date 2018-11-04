import React,{ Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar'
import {Redirect} from 'react-router';
import { Route, withRouter,Link } from 'react-router-dom';
import ProfileHeader from './profileheader.js';
import './../images/property.css';
// import Success from './../PropertyListing/success';
import { connect } from 'react-redux';
import {propertyPhotoUploadHandler} from './../api/Api';
import {bindActionCreators} from 'redux';
import {history} from "../util/utils";
import axios from 'axios';
class Photos extends Component {
  constructor() {
        super();
        this.photoFile='',
        this.clickFlag=false
      }

  handleUpload=(event)=> {
          event.preventDefault();
          var photos=event.target.files;
          var propertyid=this.props.postedPropertyDetail.result;
          var fd=new FormData();
          fd.append('propertyId',propertyid);
          for(var i=0;i<photos.length;i++) {
              fd.append('photos',photos[i]);
          }
          var contentType={
            headers : {
              "content-type" : "multipart/form-data"
            }
          }
          axios.post('http://localhost:3001/uploadproperty/uploadpropertypic',fd,contentType)
            .then(res=> {
              console.log("Response here: ", res);
              this.message=res.data.message
              alert("Image uploaded Successfully.!!!");
          })
  }

  clickHandler = (event) => {
    event.preventDefault();
    alert("Property Posted Successfully.!!")
    history.push("/photos");
  }

  render() {
    return (
              <div className="location-container1">
              <div className="location1-container">
                 <ProfileHeader/>
               </div>
                      <div className="col-xs-3">
                        <ul className="nav nav-tabs tabs-left">
                          <li className="first"><a href="#home" data-toggle="tab">Welcome</a></li>
                          <li className="second"><a href="/location" data-toggle="tab">Location</a></li>
                          <li className="third"><a href="/details" data-toggle="tab">Details</a></li>
                          <li className="fourth"><a href="/booking" data-toggle="tab">Booking</a></li>
                          <li className="fifth"><a href="/pricing" data-toggle="tab">Pricing</a></li>
                          <li className="sixth"><a href="/photos" data-toggle="tab">Photos</a></li>
                        </ul>
                     </div>
                  <div className="tab-pane profile">
                    <form  className="property-form1">
                        <h1 className="photos-heading">Add up to 5 photos of your property</h1>
                        <hr className="photo-line"/>
                        <p className="para-main">Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 6 photos minimum. Need photos? Hire a professional.</p>

                        <div className="photo-upload-div">
                            <input className="image-upload" type="file" name="photos" onChange={this.handleUpload} multiple/>
                            <button type="button" className="btn-class photos" onClick={this.clickHandler}>SELECT PHOTOS TO UPLOAD</button>
                            <h4 className="upload-para">0 of 5 uploaded. 2 are required. You can choose to upload more than one photo at a time.</h4>
                        </div>
                        <Link to='/userhome' className="pic-upload">Go to Home Page </Link>
                     </form>
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
         propertyLocation: state.PostPropertyReducer.propertyLocation,
         propertyDetails: state.PostPropertyReducer.propertyDetails,
         bookingType: state.PostPropertyReducer.bookingType,
         postedPropertyDetail: state.PostPropertyReducer.postedPropertyDetail

      };
  }
//   function matchDispatchToProps(dispatch){
//     console.log("Dispatch",dispatch);
//     return bindActionCreators({propertyPhotoUploadHandler: propertyPhotoUploadHandler}, dispatch);
// }
export default connect(mapStateToProps)(Photos);
