import React,{ Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import homeimage from './../images/homeimage.jpg';
import './../images/card.css';
import 'tachyons';
import './../images/homeimage.jpg';
import * as Images from './../util/images.js';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {clickProperty} from './../api/Api';
//import Header from './../Headers/signup_header.js';
//import PropertyDetailedList from './propertyDetailedList';
//import CarouselView from './carouselView';
import TopHeader from './topheader';


class Card extends Component {
  constructor(){
    super();
    this.value=Math.random()*10;
  }
  render() {

    return(
          <div className="card-container">
            <div className='bg-light-orange dib br3 pa3 ma2 grow bw2 shadow-5'>
                <img className="logo" alt = "home" src= {Images.retrievePropertyImages((parseInt(Math.random()*10)%7).toString())} />
              <div>
                <a href="#" id={this.props.property._id} onClick={() => this.props.clickProperty(this.props.property)} ><p className="para-description" >{this.props.property.property_headline} </p> </a>
                <table>
                  <tr>
                    <td> <h3 className="bold-heading-1"> {this.props.property.bedrooms+" BR Condo"}</h3></td>
                    <div className="vl"></div>
                    <td> <h3 className="bold-heading-2"> {this.props.property.bathrooms+" BA"}</h3></td>
                    <div className="vl"></div>
                    <td> <h3 className="bold-heading-3"> {this.props.property.property_area+" sq ft"}</h3></td>
                    <div className="vl"></div>
                    <td> <h3 className="bold-heading-4"> {"Sleeps " +this.props.property.accommodation}</h3></td>
                   </tr>
               </table>
             </div>
        </div>
    </div>

      );
  }
}


  function mapStateToProps(state) {
    console.log("State",state);
      return {
         propertyResults: state.PropertyReducer.propertyResults
      };
  }

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({clickProperty: clickProperty}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Card);
