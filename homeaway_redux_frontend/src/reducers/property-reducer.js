import * as UTIL from './../util/utils';
const initialState = {
        propertyResults : [],
        displayedhotels :[],
        userResults : [],
        clickedProperty : {},
        clickedPropertyImageURLs : [],
        bookingInfo:{},
        leftHotelNavConfig:{},
        messageDetails: {},
        inboxDetails: {},
        replyDetails: {},
        booking_analysis_data:[{
          top_five_monthly_expense:{
              months:['August','Septmeber','October','November','December'],
              expenses:[140,176,120,180,500]
          },
          top_five_monthly_income:{
              months:['August','Septmeber','October','November','December'],
              income:[2000,1500,3000,1200,2200]
          }}
        ]
};
export default function (state = initialState, action) {
    switch (action.type) {
            case 'PROPERTY_SEARCH':
              let config =  UTIL.getleftNavConfigForProperties(action.data.result);
              console.log("Property searched", action, typeof(action), action.data);
              return Object.assign({}, state, {
              propertyResults: action.data.result,
              displayedhotels:action.data.result,
              leftHotelNavConfig:config
            })
            case 'USER_PROPERTY_SEARCH':
              console.log("User entered data", action, typeof(action), action.data);
              return Object.assign({}, state, {
              userResults: action.data
            })
            case 'PROPERTY_CLICKED':
              console.log("Property clicked");
              return Object.assign({}, state, {
              clickedProperty: action.data
            })
            case 'IMAGE_CLICKED':
              console.log("Image clicked", action, typeof(action), action.data.result);
              return Object.assign({}, state, {
              clickedPropertyImageURLs: action.data.result
            })
            case 'PROPERTY_BOOKED':
              console.log("Booking clicked", action, typeof(action), action.data.result);
              return Object.assign({}, state, {
              bookingInfo: action.data.result
            })
            case 'SET_PROPERTY_CONFIG':
                let updatedpropertylist = UTIL.filterPropertybasedOnLeftNavBar(state.propertyResults.slice(),action.config);
                return Object.assign({},state,{
                leftHotelNavConfig:action.config,
                displayedhotels:updatedpropertylist
              })
            case 'ASK_OWNER_QUESTION':
                    console.log("Question asked", action, typeof(action), action.data);
                    return Object.assign({}, state, {
                    messageDetails: action.data
                })
            case 'DISPLAY_MAIL':
                      console.log("Mail fetched", action, typeof(action), action.data);
                      return Object.assign({}, state, {
                      inboxDetails: action.data
                  })
            case 'REPLY_SENT':
                        console.log("Reply sent", action, typeof(action), action.data);
                        return Object.assign({}, state, {
                        replyDetails: action.data
                  })
            case 'DISPLAY_TRAVELER_MAIL':
                        console.log("Traveler Mail fetched", action, typeof(action), action.data);
                        return Object.assign({}, state, {
                        inboxDetails: action.data
                  })

    default:
    return state;
  }
}
