import {history} from "../util/utils";
import {userLoggedIn} from './../actions/index';
import {ownerLoggedIn} from './../actions/index';
import {propertySearch} from './../actions/index';
import {userPropertySearch} from './../actions/index';
import {propertyClick} from './../actions/index';
import {propertyImageClick} from './../actions/index';
import {propertyBookingAction} from './../actions/index';
import {userDashBoardAction} from './../actions/index';
import {ownerDashBoardAction} from './../actions/index';
import {updatedDashBoardAction} from './../actions/index';
import {ownerAuthenticationAction} from './../actions/index';
import {locationUpdateAction} from './../actions/index';
import {detailsUpdateAction} from './../actions/index';
import {bookingUpdateAction} from './../actions/index';
import {pricingUpdateAction} from './../actions/index';
import {propertyPostingAction} from './../actions/index';
import {propertyImageUploadAction} from './../actions/index';
import {userSignupAction} from './../actions/index';
import {ownerSignupAction} from './../actions/index';
import {updateProfileAction} from './../actions/index';
import {fetchUserProfileAction} from './../actions/index';
import {updateUserProfileAction} from './../actions/index';
import {sendMessageAction} from './../actions/index';
import {inboxDisplayAction} from './../actions/index';
import {travelerinboxDisplayAction} from './../actions/index';
import {ownerReplyAction} from './../actions/index';
import {filterDashBoardAction} from './../actions/index';
import * as UTIL from './../util/utils';
const server_url = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

const headers = {
    'Accept': 'application/json'
};

export const userlogin = function(userDetail){
  return (dispatch) => {
    fetch(`${server_url}/users/travelerlogin`, {
          method: 'POST',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(userDetail)
      }).then(res => {
          if(res.status === 200){
            console.log("userlogin status:",res.status);
            return res.json();
          }else if(res.status==405){
            alert((res.message)?res.message:"User Does not exists please sign up  !!!");
            throw "userlogin Failed !!!"
          }
          else if(res.status==400){
            alert((res.message)?res.message:"User entered wrong password!!!");
            throw "User Login Failed !!!"
          }
     }).then(result=>{
         console.log("result",result.loginUser," token :",result.servertoken)
         UTIL.saveServerToken(result);
         dispatch(userLoggedIn(result.loginUser));
         history.push('/userhome');
  }).catch(err => {
    alert(err);
          console.log("Error while Sign up!!!");
          return err;
        });
    };
};
export const userSignUp = function(userDetail){
  return (dispatch) => {
    fetch(`${server_url}/users/signup`, {
          method: 'POST',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(userDetail)
      }).then(res => {
          if(res.status === 200){
            console.log("userlogin status:",res.status);
            return res.json();
          }else{
            throw "user signup Failed !!!"
          }
     }).then(result=>{
         console.log("result",result," token :",result.servertoken)
         UTIL.saveServerToken(result);
         dispatch(userSignupAction(result));
         history.push('/userhome');
  }).catch(err => {
    alert(err);
          console.log("Error while Login!!!");
          return err;
        });
    };
};
export const ownerlogin = function(userDetail){
  return (dispatch) => {
    fetch(`${server_url}/users/ownerlogin`, {
          method: 'POST',
          mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(userDetail)
      }).then(res => {
          if(res.status === 200){
            console.log("ownerlogin status:",res.status);
            return res.json();
          }else{
            alert((res.message)?res.message:"Owner Does not exists please sign up  !!!");
            throw "ownerlogin Failed !!!"
          }
     }).then(result=>{
         console.log("result",result.loginUser," token :",result.servertoken)
         UTIL.saveServerToken(result);
         dispatch(ownerLoggedIn(result.loginUser));
         history.push('/userhome');
  }).catch(err => {
    alert(err);
          console.log("Error while Sign up!!!");
          return err;
        });
    };
};
export const ownerSignUp = function(userDetail){
  return (dispatch) => {
    fetch(`${server_url}/users/ownersignup`, {
          method: 'POST',
          mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(userDetail)
      }).then(res => {
          if(res.status === 200){
            console.log("owner signup status:",res.status);
            return res.json();
          }else{
            throw "owner signup Failed !!!"
          }
     }).then(result=>{
         console.log("result",result," token :",result.servertoken)
         UTIL.saveServerToken(result);
         dispatch(ownerSignupAction(result));
         history.push('/userhome');
  }).catch(err => {
    alert(err);
          console.log("Error while Login!!!");
          return err;
        });
    };
};

export const updateProfileHandler = function(userDetail){
  console.log("User profile details: ", userDetail)
  return (dispatch) => {
    dispatch(updateUserProfileAction(userDetail));
    fetch(`${server_url}/users/updateProfile`, {
          method: 'POST',
          mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(userDetail)
      }).then(res => {
          if(res.status === 200){
            console.log("User profile update status:",res.status);
            return res.json();
          }else{
            throw "User Profile Update Failed !!!"
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(updateProfileAction(result));
         alert("Profile Updated Successfully");
         history.push('/userhome');
  }).catch(err => {
    alert(err);
          console.log("Error while updating user profile!!!");
          return err;
        });
    };
};

export const userProfileHandler = function(userDetail){
  return (dispatch) => {
    fetch(`${server_url}/users/getProfile`, {
          method: 'POST',
          mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(userDetail)
      }).then(res => {
          if(res.status === 200){
            console.log("User profile fetching status:",res.status);
            return res.json();
          }else{
            throw "User Profile Fetching Failed !!!"
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(fetchUserProfileAction(result));
         history.push('/userprofile');
  }).catch(err => {
    alert(err);
          console.log("Error while fetching user profile!!!");
          return err;
        });
    };
};

export const propertysearch = function(propertyDetails){
  console.log("property details:",propertyDetails)
  return (dispatch) => {
    fetch(`${server_url}/search/search`, {
          method: 'POST',
          credentials:'include',
           mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(propertyDetails)
      }).then(res => {
          if(res.status === 200){
            console.log("property search status:",res.status);
            return res.json();
          }else{
            alert((res.message)?res.message:"User Does not exists please sign up  !!!");
            throw "search Failed !!!"
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(userPropertySearch(propertyDetails));
         dispatch(propertySearch(result));
         history.push('/searchtile');
  }).catch(err => {
          alert(err);
          console.log("Error while searching!!!");
          return err;
        });
    };
};

export const clickProperty = function(singlePropertyDetail){
  console.log("single property details:",singlePropertyDetail)
  return (dispatch) => {
    fetch(`${server_url}/getpropertyimages/getpropertyimages`, {
          method: 'POST',
          credentials:'include',
          mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(singlePropertyDetail)
      }).then(res => {
          if(res.status === 200){
            console.log("property search status:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         //saveServerToken(result);
         console.log("singlePropertyDetail: ", singlePropertyDetail)
         dispatch(propertyClick(singlePropertyDetail));
         dispatch(propertyImageClick(result));
         history.push('/propertyDetailedList');
  }).catch(err => {
          alert(err);
          console.log("Error while searching!!!");
          return err;
        });
    };
};

export const propertyBooking = function(bookinginfo) {
  console.log("property booking details:",bookinginfo)
  return (dispatch) => {
    fetch(`${server_url}/booking/booking`, {
          method: 'POST',
          credentials:'include',
           mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(bookinginfo)
      }).then(res => {
          if(res.status === 200){
            console.log("booking success status:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(propertyBookingAction(result));
         // history.push('/successbooking');
         history.push('/bookingsuccess');
  }).catch(err => {
          alert(err);
          console.log("Error while searching!!!");
          return err;
        });
    };
};


export const travalerDashboardHandler = function(userinfo) {
  console.log("DashBoard details:",userinfo)
  return (dispatch) => {
    fetch(`${server_url}/dashboard/userdashboard`, {
          method: 'POST',
          credentials:'include',
           mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(userinfo)
      }).then(res => {
          if(res.status === 200){
            console.log("DashBoard status:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(userDashBoardAction(result));
        history.push('/travalerdashboard');
  }).catch(err => {
          alert(err);
          console.log("Error while fetching user DashBoard!!!");
          return err;
        });
    };
};
export const filteredDashBoard = function(userinfo) {
  console.log("DashBoard details:",userinfo)
  return (dispatch) => {
    fetch(`${server_url}/dashboard/filtereduserdashboard`, {
          method: 'POST',
          credentials:'include',
           mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(userinfo)
      }).then(res => {
          if(res.status === 200){
            console.log("DashBoard status:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(filterDashBoardAction(result));
         history.push('/travalerdashboard');
  }).catch(err => {
          alert(err);
          console.log("Error while fetching user DashBoard!!!");
          return err;
        });
    };
};

export const ownerDashboardHandler = function(userinfo) {
  console.log("owner DashBoard details:",userinfo)
  return (dispatch) => {
    fetch(`${server_url}/dashboard/ownerdashboard`, {
          method: 'POST',
          credentials:'include',
           mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(userinfo)
      }).then(res => {
          if(res.status === 200){
            console.log("Owner DashBoard status:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(ownerDashBoardAction(result));
         history.push('/ownerdashboard');
  }).catch(err => {
          alert(err);
          console.log("Error while fetching user DashBoard!!!");
          return err;
        });
    };
};

export const updatedDashBoardHandler = function(value) {
  console.log("filtered owner DashBoard details:",value);
  return (dispatch) => {
    fetch(`${server_url}/dashboard/fetchedownerdashboard`, {
          method: 'POST',
          credentials:'include',
           mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json'},
          body: JSON.stringify(value)
      }).then(res => {
          if(res.status === 200){
            console.log("Owner DashBoard status:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(updatedDashBoardAction(result));
         history.push('/ownerdashboard');
  }).catch(err => {
          alert(err);
          console.log("Error while fetching user DashBoard!!!");
          return err;
        });
    };
};


export const ownerAuthenticationHandler = function(ownerinfo) {
  console.log("owner details before posting profile:",ownerinfo)
  return (dispatch) => {
    fetch(`${server_url}/search/ownerpost`, {
          method: 'POST',
          credentials:'include',
           mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(ownerinfo)
      }).then(res => {
          if(res.status === 200){
            console.log("Owner Authentication status:",res.status);
            return res.json();
          }
          else{
            alert((res.message)?res.message:"User is not Owner,could not post property  !!!");
            throw "User is not Owner!!!"
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(ownerAuthenticationAction(result));
         history.push('/welcome');
  }).catch(err => {
          alert(err);
          console.log("Error while authentication owner");
          return err;
        });
    };
};
export const propertyLocationHandler = function(propertyLocationInfo) {
  return(dispatch) => {
    console.log("location info on API: ",propertyLocationInfo)
    dispatch(locationUpdateAction(propertyLocationInfo));
    history.push('/details')
  }
};
export const propertyDetailsHandler = function(propertyDetailsInfo) {
  return(dispatch) => {
    console.log("property details info on API: ",propertyDetailsInfo)
    dispatch(detailsUpdateAction(propertyDetailsInfo));
    history.push('/booking')
  }
};
export const bookingTypeHandler = function(bookingTypeInfo) {
  return(dispatch) => {
    console.log("booking type details info on API: ",bookingTypeInfo)
    dispatch(bookingUpdateAction(bookingTypeInfo));
    history.push('/pricing')
  }
};


export const propertyPricingHandler = function(propertyInfo) {
  console.log("Property pricing details:",propertyInfo)
  return (dispatch) => {
   // dispatch(pricingUpdateAction(propertyPricingInfo));
  fetch(`${server_url}/search/propertypost`, {
          method: 'POST',
          credentials:'include',
           mode: 'cors',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(propertyInfo)
      }).then(res => {
          if(res.status === 200){
            console.log("Property post response:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(propertyPostingAction(result));
         history.push('/photos');
  }).catch(err => {
          alert(err);
          console.log("Error while posting property");
          return err;
        });
  }
};

export const propertyPhotoUploadHandler = function(propertyImagesInfo) {
  console.log("Property photos details:",propertyImagesInfo)
  return (dispatch) => {
   // dispatch(pricingUpdateAction(propertyPricingInfo));
  fetch(`${server_url}/uploadproperty/uploadpropertypic`, {
          method: 'POST',
          credentials:'include',
           mode: 'cors',
          headers: { ...headers,'Content-Type' : 'multipart/form-data'},
          body: JSON.stringify(propertyImagesInfo)
      }).then(res => {
          if(res.status === 200){
            console.log("Property images post response:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(propertyImageUploadAction(result));
         // history.push('/photos');
  }).catch(err => {
          alert(err);
          console.log("Error while uploading property images");
          return err;
        });
  }
};

export const sendMessage = function(messageInfo) {
  return (dispatch) => {
   // dispatch(pricingUpdateAction(propertyPricingInfo));
  fetch(`${server_url}/travelerOwnerEmail/travelermail`, {
          method: 'POST',
          credentials:'include',
          mode: 'cors',
          headers: { ...headers,'Content-Type' : 'application/json'},
          body: JSON.stringify(messageInfo)
      }).then(res => {
          if(res.status === 200){
            console.log("Sending message response:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(sendMessageAction(messageInfo));
         alert("Message Sent successfully.!!!!");
         history.push('/propertyDetailedList');
  }).catch(err => {
          alert(err);
          console.log("Error while uploading property images");
          return err;
        });
  }
};

export const inboxHandler = function(currentUser) {
  console.log("logged in user details:",currentUser)
  return (dispatch) => {
  fetch(`${server_url}/travelerOwnerEmail/fetchmail`, {
          method: 'POST',
          credentials:'include',
          mode: 'cors',
          headers: { ...headers,'Content-Type' : 'application/json'},
          body: JSON.stringify(currentUser)
      }).then(res => {
          if(res.status === 200){
            console.log("Sending message response:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(inboxDisplayAction(result.result));
         history.push('/inbox');
  }).catch(err => {
          alert(err);
          console.log("Error while uploading property images");
          return err;
        });
  }
};
export const travelerinboxHandler = function(currentUser) {
  console.log("logged in user details:",currentUser)
  return (dispatch) => {
  fetch(`${server_url}/travelerOwnerEmail/fetchTravelermail`, {
          method: 'POST',
          credentials:'include',
          mode: 'cors',
          headers: { ...headers,'Content-Type' : 'application/json'},
          body: JSON.stringify(currentUser)
      }).then(res => {
          if(res.status === 200){
            console.log("Sending message response:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(travelerinboxDisplayAction(result.result));
         history.push('/travelerinbox');
  }).catch(err => {
          alert(err);
          console.log("Error while uploading property images");
          return err;
        });
  }
};

export const ownerReplyHandler = function(sentMessage) {
  console.log("loggen in user details:",sentMessage)
  return (dispatch) => {
  fetch(`${server_url}/travelerOwnerEmail/ownermail`, {
          method: 'POST',
          credentials:'include',
          mode: 'cors',
          headers: { ...headers,'Content-Type' : 'application/json'},
          body: JSON.stringify(sentMessage)
      }).then(res => {
          if(res.status === 200){
            console.log("Sending message response:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch(ownerReplyAction(sentMessage));
         alert("Successful Reply.....!!!!");
         history.push('/userhome');
  }).catch(err => {
          alert(err);
          console.log("Error while uploading property images");
          return err;
        });
  }
};
