import React,{ Component } from 'react';
import './../images/home.css';
import { Route, withRouter,Link } from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button} from 'react-bootstrap';
import {propertysearch} from './../api/Api';
import * as UTIL from './../util/utils';
import * as VALIDATION from './../util/validation';

class CardSearchBar extends Component {
	constructor() {
		super();
		this.propertyinfo={
			currentUser:'',
			propertyLocation:'',
			availabilityStartDate:'',
			availabilityEndDate: '',
			accomodation: '',
			servertoken: UTIL.getServerTokenDetails(),
			email : ''
		};
	}
	componentWillMount(){
		this.propertyinfo.currentUser = this.props.userResults.currentUser;
		this.propertyinfo.propertyLocation = this.props.userResults.propertyLocation;
		this.propertyinfo.availabilityStartDate = this.props.userResults.availabilityStartDate;
		this.propertyinfo.availabilityEndDate = this.props.userResults.availabilityEndDate;
		this.propertyinfo.accomodation = this.props.userResults.accomodation;
		this.propertyinfo.email = this.props.userResults.email;
	}
	handleSearch(data) {
		data.email = this.props.currentUser;
		console.log("value of data: ", data);
		this.props.propertysearch(data);
	}
	render() {
		return (
				<div className="cardPage-search-bar">
				<form>
                <input type="text"  className="text-field lg" id="location" placeholder={this.props.userResults.propertyLocation} name="propertyLocation"
								onChange={(event) => { this.propertyinfo.propertyLocation = event.target.value}}/>
                <input type="date"  className="text-field" id="checkInDate" name="availabilityStartDate" defaultValue={this.props.userResults.availabilityStartDate}
								onChange={(event) => { this.propertyinfo.availabilityStartDate = event.target.value}}/>
                <input type="date"  className="text-field" id="checkOutDate" name="availabilityEndDate" defaultValue={this.props.userResults.availabilityEndDate}
								onChange={(event) => { this.propertyinfo.availabilityEndDate = event.target.value}}/>
                <input type="number" className="text-field" id="accommodation" name="accomodation" placeholder="1 Guest" value={this.props.userResults.accomodation}
								onChange={(event) => { this.propertyinfo.accomodation = event.target.value}}/>
								<button type="button" className="btn-class"  onClick={() =>
                  (VALIDATION.emptyDate(this.propertyinfo.propertyLocation,"Location") && VALIDATION.emptyDate(this.propertyinfo.availabilityStartDate,"Start Date") && VALIDATION.emptyDate(this.propertyinfo.availabilityEndDate,"End Date")
                  && VALIDATION.validateStartEndDate(this.propertyinfo.availabilityStartDate,this.propertyinfo.availabilityEndDate) && VALIDATION.emptyDate(this.propertyinfo.accomodation,"Accomodation") )==true? this.handleSearch(this.propertyinfo):''}>Search</button>
					</form>
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
       clickedPropertyImageURLs: state.PropertyReducer.clickedPropertyImageURLs
    };
}
function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({propertysearch: propertysearch}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(CardSearchBar);
