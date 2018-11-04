import React, { Component } from 'react';
import  { Carousel, CarouselInner, CarouselItem, View, Container,Mask } from 'mdbreact';
import './../images/card.css';
import { connect } from 'react-redux';

class ControlledCarousel extends Component {

  render(){
    return(
      <Container className="carousel-container">
        <Carousel
          activeItem={0}
          length={this.props.clickedPropertyImageURLs.length-1}
          showControls={true}
          showIndicators={true}
          className="z-depth-1">
          <CarouselInner>
          {
            this.props.clickedPropertyImageURLs != undefined ?
              this.props.clickedPropertyImageURLs.map((image,index) => {
                return(
                        <div>
                          <CarouselItem itemId= {index} >
                            <View>
                              <img className="d-block w-80 h-200 change" src={'http://localhost:3001/'+image.img} alt="First slide" />
                              <Mask overlay="black-slight"></Mask>
                            </View>
                          </CarouselItem>
                        </div>
                  );
              })
              : ''
          }

          </CarouselInner>
        </Carousel>
      </Container>
    );
  }
}

function mapStateToProps(state) {
    console.log("State",state);
      return {
         propertyResults: state.PropertyReducer.propertyResults,
         clickedProperty: state.PropertyReducer.clickedProperty,
         clickedPropertyImageURLs: state.PropertyReducer.clickedPropertyImageURLs
      };
  }


export default connect(mapStateToProps)(ControlledCarousel);
