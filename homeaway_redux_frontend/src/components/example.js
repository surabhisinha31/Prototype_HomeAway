import React,{ Component } from 'react';
import './../images/example.css';
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem  from 'react-bootstrap/lib/NavItem'
import ProfileHeader from './profileheader.js';
import Nav from 'react-bootstrap/lib/Nav'
import './../images/card.css';
import { Button} from 'react-bootstrap';
import { Route, withRouter,Link } from 'react-router-dom';
import homeawaylogo from './../images/HomeAway_logo.png';
import homeicon from './../images/homeicon.png';
import inboxicon from './../images/mail.jpg';
import { Glyphicon } from 'react-bootstrap';
import * as UTIL from './../util/utils';
import homeimage from './../images/homeimage.jpg';
import './../images/card.css';
import 'tachyons';
import './../images/homeimage.jpg';
import * as Images from './../util/images.js';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {clickProperty} from './../api/Api';

class Example extends React.Component {
      constructor() {
        super();
        this.state={
          currentPage: 1,
          todosPerPage: 5
        }
        this.value=Math.random()*100;
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick(event) {
        event.preventDefault();
        this.setState({
          currentPage : Number(event.target.id)
        })
        ;
        alert(this.state.currentPage);
      }

      render() {
        const { currentPage, todosPerPage } = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        alert("index of last page: ",indexOfLastTodo);
        alert("index of first todo: ", indexOfFirstTodo);
        const currentTodos = this.props.displayedhotels.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((property, index) => {
          {this.value=Math.random()*100}
          return(
            <div className="tile-container-example">

                         <div className="card-container">
                           <div className='bg-light-orange dib br3 pa3 ma2 grow bw2 shadow-5'>

                               <img className="logo" alt = "home" src= {Images.retrievePropertyImages((parseInt(this.value)%4).toString())} />

                             <div>
                               <a href="#" id={property._id} onClick={() => this.props.clickProperty(property)} ><p className="para-description" >{property.property_headline} </p> </a>
                               <table>
                                 <tr>
                                   <td> <h3 className="bold-heading-1"> {property.bedrooms+" BR Condo"}</h3></td>
                                   <div className="vl"></div>
                                   <td> <h3 className="bold-heading-2"> {property.bathrooms+" BA"}</h3></td>
                                   <div className="vl"></div>
                                   <td> <h3 className="bold-heading-3"> {property.property_area+" sq ft"}</h3></td>
                                   <div className="vl"></div>
                                   <td> <h3 className="bold-heading-4"> {"Sleeps " +property.accommodation}</h3></td>
                                  </tr>
                              </table>
                            </div>
                       </div>
                   </div>
                       );
               }
            </div>
          );
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.displayedhotels.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          this.number=number;
          return (

            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });

        return (
          <div>


            <ul>
              {renderTodos}
            </ul>
            <ul id="page-numbers">
              {renderPageNumbers}
            </ul>
          </div>
        );
      }
    }

    function mapStateToProps(state) {
        console.log("State",state);
          return {
             displayedhotels: state.PropertyReducer.displayedhotels
          };
      }
      function matchDispatchToProps(dispatch){
          console.log("Dispatch",dispatch);
          return bindActionCreators({clickProperty: clickProperty}, dispatch);
      }
    export default connect(mapStateToProps, matchDispatchToProps)(Example);
