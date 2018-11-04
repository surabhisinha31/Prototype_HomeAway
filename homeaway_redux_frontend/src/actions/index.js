export const userLoggedIn = (userDetail) => {
    return {
        type: 'USER_LOGGED_IN',
        data: userDetail
    }
};
export const userSignupAction = (userDetail) => {
    return {
        type: 'USER_SIGNED_UP',
        data: userDetail
    }
};
export const ownerLoggedIn = (userDetail) => {
    return {
        type: 'OWNER_LOGGED_IN',
        data: userDetail
    }
};
export const ownerSignupAction = (userDetail) => {
    return {
        type: 'OWNER_SIGNED_UP',
        data: userDetail
    }
};
export const updateUserProfileAction = (userDetail) => {
    return {
        type: 'USER_PROFILE',
        data: userDetail
    }
};
export const updateProfileAction = (userDetail) => {
    return {
        type: 'USER_PROFILE_UPDATION',
        data: userDetail
    }
};
export const fetchUserProfileAction = (userDetail) => {
    return {
        type: 'USER_PROFILE_DISPLAY',
        data: userDetail
    }
};

export const propertySearch = (propertyDetails) => {
    return {
        type: 'PROPERTY_SEARCH',
        data: propertyDetails
    }
};

export const userPropertySearch = (userData) => {
    return {
        type: 'USER_PROPERTY_SEARCH',
        data: userData
    }
};

export const propertyClick = (singlepropertyDetails) => {
    return {
        type: 'PROPERTY_CLICKED',
        data: singlepropertyDetails
    }
};

export const propertyImageClick = (imageDetails) => {
    return {
        type: 'IMAGE_CLICKED',
        data: imageDetails
    }
};

export const propertyBookingAction = (bookingDetails) => {
    console.log("Booking clicked: ", bookingDetails);
    return {
        type: 'PROPERTY_BOOKED',
        data: bookingDetails
    }
};

export const userDashBoardAction = (dashboardinfo) => {
    console.log("User DashBoard link clicked: ", dashboardinfo);
    return {
        type: 'USER_DASHBOARD',
        data: dashboardinfo
    }
};
export const filterDashBoardAction = (dashboardinfo) => {
    console.log("User DashBoard filtered: ", dashboardinfo);
    return {
        type: 'USER_DASHBOARD_FILTER',
        data: dashboardinfo
    }
};
export const ownerDashBoardAction = (dashboardinfo) => {
    console.log("Owner DashBoard link clicked: ", dashboardinfo);
    return {
        type: 'OWNER_DASHBOARD',
        data: dashboardinfo
    }
};
export const updatedDashBoardAction = (dashboardinfo) => {
    console.log("Updated Owner DashBoard searched: ", dashboardinfo);
    return {
        type: 'UPDATED_OWNER_DASHBOARD',
        data: dashboardinfo
    }
};
export const ownerAuthenticationAction = (ownerinfo) => {
    console.log("Owner Post Property link clicked: ", ownerinfo);
    return {
        type: 'OWNER_AUTHENTICATION',
        data: ownerinfo
    }
};
export const locationUpdateAction = (propertyLocationInfo) => {
    console.log("Property Location ", propertyLocationInfo);
    return {
        type: 'PROPERTY_LOCATION_UPDATE',
        data: propertyLocationInfo
    }
};
export const detailsUpdateAction = (propertyDetailsInfo) => {
    console.log("Property Details ", propertyDetailsInfo);
    return {
        type: 'PROPERTY_DETAILS_UPDATE',
        data: propertyDetailsInfo
    }
};
export const bookingUpdateAction = (bookingTypeInfo) => {
    console.log("Booking Type Details ", bookingTypeInfo);
    return {
        type: 'PROPERTY_BOOKING_UPDATE',
        data: bookingTypeInfo
    }
};
export const pricingUpdateAction = (propertyPricingInfo) => {
    console.log("Property Pricing Details ", propertyPricingInfo);
    return {
        type: 'PROPERTY_PRICING_UPDATE',
        data: propertyPricingInfo
    }
};
export const propertyPostingAction = (propertyInfo) => {
    console.log("Property Details ", propertyInfo);
    return {
        type: 'PROPERTY_POSTING',
        data: propertyInfo
    }
};
export const propertyImageUploadAction = (propertyImagesInfo) => {
    console.log("Property Images Details ", propertyImagesInfo);
    return {
        type: 'PROPERTY_PHOTOS_UPLOAD',
        data: propertyImagesInfo
    }
};

export const setPropertyConfig = (config)=>{
  console.log("Config value in action: ", config);
return {
  type:'SET_PROPERTY_CONFIG',
  config:config
  }
}
export const sendMessageAction = (messageInfo) => {
    console.log("Send message Details ", messageInfo);
    return {
        type: 'ASK_OWNER_QUESTION',
        data: messageInfo
    }
};
export const inboxDisplayAction = (messageInfo) => {
    console.log("Inbox details retrieved: ", messageInfo);
    return {
        type: 'DISPLAY_MAIL',
        data: messageInfo
    }
};
export const ownerReplyAction = (messageInfo) => {
    console.log("Inbox details retrieved: ", messageInfo);
    return {
        type: 'REPLY_SENT',
        data: messageInfo
    }
};
export const travelerinboxDisplayAction = (messageInfo) => {
    console.log("Inbox details retrieved: ", messageInfo);
    return {
        type: 'DISPLAY_TRAVELER_MAIL',
        data: messageInfo
    }
};
