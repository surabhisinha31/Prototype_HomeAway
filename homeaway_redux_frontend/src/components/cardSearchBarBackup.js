import React,{ Component } from 'react';
import './../images/home.css';
import { Route, withRouter,Link } from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {propertysearch} from './../api/Api';
import { Button} from 'react-bootstrap';
// import * as API from './../../api/API';
class CardSearchBar extends Component {
  constructor() {
    super();
    this.propertyinfo={
      currentUser:'',
      propertyLocation:'',
      availabilityStartDate:'',
      availabilityEndDate: '',
      accomodation: ''
    };
  }

  handleSearch(data) {
    data.currentUser = this.props.currentUser;
    console.log("value of data: ", data);
    this.props.propertysearch(data);
  }
	render() {
		return (
				<div className="cardPage-search-bar">
                <input type="text"  className="text-field lg" id="location" placeholder={this.props.userResults.propertyLocation} name="propertyLocation"
                onChange={(event) => { this.propertyinfo.propertyLocation = event.target.value}}/>
                <input type="date"  className="text-field" id="checkInDate" name="availabilityStartDate" placeholder={this.props.userResults.availabilityStartDate}
                onChange={(event) => { this.propertyinfo.availabilityStartDate = event.target.value}}/>
                <input type="date"  className="text-field" id="checkOutDate" name="availabilityEndDate" placeholder={this.props.userResults.availabilityEndDate}
                onChange={(event) => { this.propertyinfo.availabilityEndDate = event.target.value}}/>
                <input type="number" className="text-field" id="accommodation" name="accomodation" placeholder={this.props.userResults.accomodation}
                onChange={(event) => { this.propertyinfo.accomodation = event.target.value}}/>
                <button type="button" className="btn-class" onClick={() => this.handleSearch(this.propertyinfo)} >Search</button>
          </div>

			);
		}
}
function mapStateToProps(state) {
  console.log("State",state);
    return {
       propertyResults: state.PropertyReducer.propertyResults,
       userResults: state.PropertyReducer.userResults,
       clickedProperty: state.PropertyReducer.clickedProperty,
       clickedPropertyImageURLs: state.PropertyReducer.clickedPropertyImageURLs
    };
}
function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({propertysearch: propertysearch}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(CardSearchBar);
