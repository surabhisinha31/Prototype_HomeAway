import React,{ Component } from 'react';
// import CustomCheckbox from './../subcomponents/custom/custom_checkbox';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setPropertyConfig} from './../actions/index';
import './../images/card.css';

class PropertySearchLeftNav extends Component{

handlePriceSlide(slidevalue){
  console.log("slidevalue:",slidevalue);
  let config = Object.assign({},this.props.leftHotelNavConfig);
  config.price = slidevalue;
  console.log("COnfig Value: ", config);
  this.props.setPropertyConfig(config);
}
handleBedSlide(slidevalue){
  console.log("slidevalue:",slidevalue);
  let config = Object.assign({},this.props.leftHotelNavConfig);
  config.beds = slidevalue;
  console.log("COnfig Value: ", config);
  this.props.setPropertyConfig(config);
}
  render() {
    console.log("Search leftnav Bar Page Render",this.props.leftHotelNavConfig);
    return (
      <div className="slider-div">
          <p>Filter: </p>
            <p className="priceslider"> Price: ${this.props.leftHotelNavConfig.price} </p>
            <input type="range" min="0" max="1000" className="priceslider" defaultValue={this.props.leftHotelNavConfig.price}
            onChange={(slidevalue)=>{this.handlePriceSlide(slidevalue.target.value)}}/>
            <p className="bedslider"> Bed: {this.props.leftHotelNavConfig.beds} </p>
            <input type="range" min="0" max="20" className="bedslider" defaultValue={this.props.leftHotelNavConfig.beds}
            onChange={(slidevalue)=>{this.handleBedSlide(slidevalue.target.value)}}/>
      </div>
    );
  }
}



function mapStateToProps(state) {
    console.log("mapStateToProps hotel left nav",state.PropertyReducer.leftHotelNavConfig);
      return {
          leftHotelNavConfig:state.PropertyReducer.leftHotelNavConfig
      };
  }

function matchDispatchToProps(dispatch){
        return bindActionCreators({setPropertyConfig:setPropertyConfig}, dispatch);
    }

export default connect(mapStateToProps,matchDispatchToProps)(PropertySearchLeftNav);
