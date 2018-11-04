import { LOCATION_CHANGE } from 'react-router-redux';

// This initial state is *copied* from react-router-redux's
// routerReducer (the property name 'locationBeforeTransitions' is
// because this is designed for use with react-router)
const initialState = { locationBeforeTransitions: null };

function routing(state = initialState, action) {
  // This LOCATION_CHANGE case is copied from react-router-redux's routerReducer
  if (action.type === LOCATION_CHANGE) {
    return { ...state, locationBeforeTransitions: action.payload }
  }

  // Here is our code to set the location state when the user chooses
  // a different option in the menu
  // if (action.type === SET_OPERATION) {
  //   const { name } = action;
  //   let location = state.locationBeforeTransitions;
  //   const pathname = `/redux-history-demo/${name}`;
  //   location = { ...location, pathname, action: 'PUSH' };
  //   return { ...state, locationBeforeTransitions: location };
  // }

  return state;
}
export default routing;
