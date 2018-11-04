import React,{ Component } from 'react';
import './../images/card.css';
import { connect } from 'react-redux';
import { Button,Pagination } from 'react-bootstrap';
import Card from './card';
import './../images/homeimage.jpg';
import 'tachyons';
import * as UTIL from './../util/utils';
import ProfileHeader from './profileheader';
import CardSearchBar from './cardSearchBar';
import {bindActionCreators} from 'redux';
import {userlogin} from './../api/Api';
import { push } from "react-router-redux";
class SearchTileBackup extends Component {
constructor(props) {
  super(props);
  this.changePage=this.changePage.bind(this);
}
  changePage(page) {
    this.props.dispatch(push('/?page=' + page));
  }
  render() {
    const per_page=10;
    const pages=Math.ceil(this.props.propertyResults.length/per_page);
    const current_page=this.props.page;
    const start_offset=(current_page-1)*per_page;
    let start_count=0;
    return (
    		  <div className="card-header">
              <ProfileHeader/>
              <CardSearchBar/>
              <div className="tile-container">
                 {
                  this.props.propertyResults.map((property,index) => {
                        if(index>=start_offset && start_count<per_page) {
                          start_count++;
                          return(<Card key={property.property_id} property={property}/> );
                        }

                        })
                 }
              </div>
              <Pagination className="property-pagination pull-right" bsSize="medium" maxButtons={10} first last next
                prev boundaryLinks items={pages} activePage={current_page} onSelect={this.changePage}/>
            </div>
        );
	  }
	}
function mapStateToProps(state) {
    console.log("State",state);
      return {
         propertyResults: state.PropertyReducer.propertyResults,
         page: Number(state.routing.locationBeforeTransitions.query.page) || 1
      };
  }
export default connect(mapStateToProps, null)(SearchTileBackup);
