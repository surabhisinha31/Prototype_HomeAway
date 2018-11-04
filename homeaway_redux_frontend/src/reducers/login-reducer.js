import * as UTIL from './../util/utils';
const initialState = {
        currentUser : '',
        currentUserDetails:{},
        message:'',
        ownerFlag:false,
        userProfileDetails:{
          firstName:'',
          lastName:'',
          aboutMe:'',
          city:'',
          company:'',
          school:'',
          hometown:'',
          language:'',
          gender:'',
          contactNumber:'',
          profileImage:'',
          selectedFile:''
        }
};
export default function (state = initialState, action) {
    switch (action.type) {
            case 'USER_LOGGED_IN':
              console.log("User Logged  IN");
              return Object.assign({}, state, {
              currentUser: action.data
            })
            case 'USER_SIGNED_UP':
              console.log("User signed up");
              return Object.assign({}, state, {
              currentUserDetails: action.data,
              currentUser: action.data.createdUser
            })
            case 'OWNER_LOGGED_IN':
              console.log("Owner Logged  IN");
              return Object.assign({}, state, {
              ownerFlag: true,
              currentUser: action.data
            })
            case 'OWNER_SIGNED_UP':
              console.log("Owner signed up");
              return Object.assign({}, state, {
              currentUserDetails: action.data,
              ownerFlag: true,
              currentUser: action.data.createdUser
            })
            case 'USER_PROFILE_UPDATION':
              console.log("User signed up");
              return state;

            case 'USER_PROFILE_DISPLAY':
              console.log("User Profile Fetched Successfully");
              return Object.assign({}, state, {
              userProfileDetails: action.data
            })
            case 'USER_PROFILE':
              console.log("User Profile Details Saved Successfully");
              return Object.assign({}, state, {
              userProfileDetails: action.data
            })
    default:
    return state;
  }
}
