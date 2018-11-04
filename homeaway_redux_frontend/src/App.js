import React, { Component } from 'react';
import './App.css';
import ProfileHeader from './components/profileheader';
import UserSignIn from './components/usersignin';
import SignUp from './components/signup';
import OwnerSignIn from './components/ownersignin';
import OwnerSignUp from './components/ownersignup';
import UserHome from './components/userhome';
import SearchTile from './components/searchtile';
import SearchTileBackup from './components/searchtilebackup';
import PropertyDetailedList from './components/propertyDetailedList';
import MessageOwner from './components/messageowner';
import SuccessBooking from './components/successbooking';
import DashBoard from './components/travalerdashboard';
import OwnerDashBoard from './components/ownerdashboard';
import Welcome from './components/welcome';
import UserProfile from './components/userprofile';
import Location from './components/location';
import Details from './components/details';
import Booking from './components/booking';
import Pricing from './components/pricing';
import Photos from './components/photos';
import Inbox from './components/inbox';
import Example from './components/example';
import BookingSuccess from './components/bookingsuccess';
import TravelerInbox from './components/travelerinbox';
import {BrowserRouter, Route, Router, Switch, Redirect} from 'react-router-dom';
import {history} from './util/utils';
import {connect} from 'react-redux';
class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Route  exact path="/" render ={() => (
                <UserSignIn/>)
            }/>
            <Route  exact path="/userhome" render ={() => (
                <UserHome/>)
            }/>
            <Route  exact path="/example" render ={() => (
                <Example/>)
            }/>
            <Route  exact path="/signup" render ={() => (
                <SignUp/>)
             }/>
             <Route  exact path="/ownersignup" render ={() => (
                 <OwnerSignUp/>)
              }/>
              <Route  exact path="/ownersignin" render ={() => (
                  <OwnerSignIn/>)
               }/>
             <Route  exact path="/userprofile" render ={() => (
                 <UserProfile/>)
              }/>
            <Route  exact path="/searchtile" render ={() => (
                <SearchTile/>)
             }/>
             <Route  exact path="/searchtilebackup" render ={() => (
                 <SearchTileBackup/>)
              }/>
            <Route  exact path="/propertyDetailedList" render ={() => (
                <PropertyDetailedList/>)
             }/>
             <Route  exact path="/messageowner" render ={() => (
                 <MessageOwner/>)
              }/>
            <Route  exact path="/inbox" render ={() => (
                  <Inbox/>)
            }/>
              <Route  exact path="/travelerinbox" render ={() => (
                   <TravelerInbox/>)
              }/>
             <Route  exact path="/successbooking" render ={() => (
                <SuccessBooking/>)
             }/>
             <Route  exact path="/bookingsuccess" render ={() => (
                <BookingSuccess/>)
             }/>
             <Route  exact path="/profileheader" render ={() => (
                <ProfileHeader/>)
             }/>
             <Route  exact path="/travalerdashboard" render ={() => (
                <DashBoard/>)
             }/>
             <Route  exact path="/ownerdashboard" render ={() => (
                <OwnerDashBoard/>)
             }/>
             <Route  exact path="/welcome" render ={() => (
                <Welcome/>)
             }/>
             <Route  exact path="/location" render ={() => (
                <Location/>)
             }/>
              <Route  exact path="/details" render ={() => (
                <Details/>)
             }/>
             <Route  exact path="/booking" render ={() => (
                <Booking/>)
             }/>
             <Route  exact path="/pricing" render ={() => (
                <Pricing/>)
             }/>
             <Route  exact path="/photos" render ={() => (
                <Photos/>)
             }/>
          </div>
        </Router>
      </div>

      // <BrowserRouter>
      //   <Switch>
      //       <Route  exact path="/" render ={() => (
      //         this.props.currentUser ? <UserHome/>:<UserSignIn/>)
      //                   }/>
      //       <Route  exact path="/searchtile" render ={() => (
      //         <SearchTile/>)
      //                   }/>
      //   </Switch>
      // </BrowserRouter>
    );
  }
}
function mapStateToProps(state) {
  console.log("Initial State",state);
  console.log("Current User data:",state.LoginReducer.currentUser);
    return {
        currentUser: state.LoginReducer.currentUser
    };
}

export default connect(mapStateToProps)(App);
