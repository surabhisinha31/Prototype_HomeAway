import React,{ Component } from 'react';
import './../images/card.css';
import { connect } from 'react-redux';
import { Button} from 'react-bootstrap';
import Card from './card';
import './../images/homeimage.jpg';
import 'tachyons';
import Pagination from "react-js-pagination";
import * as UTIL from './../util/utils';
import ProfileHeader from './profileheader';
import CardSearchBar from './cardSearchBar';
import PropertySearchLeftNav from './propertysearchleftnav';
import {bindActionCreators} from 'redux';
import {userlogin} from './../api/Api';
class SearchTile extends Component {
  constructor() {
    super();
    this.state={
      currentPage: 1,
      todosPerPage: 10
    }
    this.value=Math.random()*100;
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage : Number(event.target.id)
    });
    window.scrollTo(0, 0);
  }
  render() {
    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.props.displayedhotels.slice(indexOfFirstTodo, indexOfLastTodo);
    const TOTAL_COUNT=this.props.displayedhotels.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.displayedhotels.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
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
    		  <div className="card-header">
              <ProfileHeader/>
              <CardSearchBar/>
              <div className="searchtile-slider">
                <PropertySearchLeftNav/>
              </div>
              <div className="tile-container">
                 {
                  currentTodos.map((property) => {
                         return(<Card property={property}/> );
                        })
                 }
              </div>
                    <ul id="page-numbers" className="pagination-style">
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
export default connect(mapStateToProps, null)(SearchTile);
