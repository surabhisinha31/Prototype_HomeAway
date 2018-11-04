import * as UTIL from './../util/utils';
const initialState = {
        dashboardDetails:[],
        ownerdashboardDetails:[],
        updateddashboardDetails: [],
        filtereddashboardDetails: []
};
export default function (state = initialState, action) {
    switch (action.type) {
            case 'USER_DASHBOARD':
              console.log("User dashboard fetched");
              console.log("Dashboard clicked", action, typeof(action));
              return Object.assign({}, state, {
              dashboardDetails: action.data.dashboardDetails,
              filtereddashboardDetails : action.data.dashboardDetails

            })
            case 'OWNER_DASHBOARD':
              console.log("Owner dashboard fetched");
              console.log("Owner Dashboard clicked", action, typeof(action));
              return Object.assign({}, state, {
              ownerdashboardDetails: action.data.dashboardDetails,
              updateddashboardDetails : action.data.dashboardDetails
            })
            case 'UPDATED_OWNER_DASHBOARD':
              console.log("Updated Owner dashboard fetched");
              console.log("Updated Owner Dashboard clicked", action, typeof(action));
              return Object.assign({}, state, {
              updateddashboardDetails: action.data.dashboardDetails
            })
            case 'USER_DASHBOARD_FILTER':
              console.log("Filtered traveler dashboard", action, typeof(action));
              return Object.assign({}, state, {
              filtereddashboardDetails: action.data.dashboardDetails
            })

    default:
    return state;
  }
}
