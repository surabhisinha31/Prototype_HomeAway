import * as UTIL from './../util/utils';
const initialState = {
        ownerDetails : {},
        propertyLocation:'',
        propertyDetails:{},
        bookingType:'',
        postedPropertyDetail:{},
        postedPropertyImages:[]
};
export default function (state = initialState, action) {
    switch (action.type) {
            case 'OWNER_AUTHENTICATION':
              console.log("Owner Authenticated", action, typeof(action), action.data);
              return Object.assign({}, state, {
              ownerDetails: action.data
            })
            case 'PROPERTY_LOCATION_UPDATE':
              console.log("Property location updated", action, typeof(action), action.data);
              return Object.assign({}, state, {
              propertyLocation: action.data
            })
            case 'PROPERTY_DETAILS_UPDATE':
              console.log("Property details updated", action, typeof(action), action.data);
              return Object.assign({}, state, {
              propertyDetails: action.data
            })
            case 'PROPERTY_BOOKING_UPDATE':
              console.log("Property booking type updated", action, typeof(action), action.data);
              return Object.assign({}, state, {
              bookingType: action.data
            })
            case 'PROPERTY_PRICING_UPDATE':
              console.log("Property pricing updated", action, typeof(action), action.data);
              return Object.assign({}, state, {
              propertyPricing: action.data
            })
            case 'PROPERTY_POSTING':
              console.log("Property  Posted", action, typeof(action), action.data);
              return Object.assign({}, state, {
              postedPropertyDetail: action.data
            })
            case 'PROPERTY_PHOTOS_UPLOAD':
              console.log("Property  Images Uploaded", action, typeof(action), action.data);
              return Object.assign({}, state, {
              postedPropertyImages: action.data
            })   
    default:
    return state;
  }
}