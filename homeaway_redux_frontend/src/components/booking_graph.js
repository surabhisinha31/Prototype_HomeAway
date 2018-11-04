import React,{ Component } from 'react';
import {connect} from 'react-redux';
import './../images/graph.css';
import BarChart from './graph';
import PieChart from './piechart';
class BookingGraphs extends Component {


  getTravelerDashBoardGraph(labels, datasets, label_name, header_text){
    if(labels.length >0 && datasets.length >0){
        var data={
          labels: labels,
          datasets:datasets,
          labelName:label_name,
          header_text:header_text
         }
      return (<BarChart data={data}/>)
    }else{
      return (<h2 style={{color:"red"}}> Analysis data not available </h2>)
    }
}
getTravelerDashBoardPieGraph(labels, datasets, label_name, header_text){
  if(labels.length >0 && datasets.length >0){
      var data={
        labels: labels,
        datasets:datasets,
        labelName:label_name,
        header_text:header_text
       }
    return (<PieChart data={data}/>)
  }else{
    return (<h2 style={{color:"red"}}> Analysis data not available </h2>)
  }
}

  render() {
    return (
            <div>
                <div className="bar-graph">
                    {this.getTravelerDashBoardGraph(this.props.booking_analysis_data[0]['top_five_monthly_expense'].months,this.props.booking_analysis_data[0]['top_five_monthly_expense'].expenses,
                    "Monthly Expense","Your Monthly Expense")}
                </div>
                <div className="pie-chart">
                    {this.getTravelerDashBoardPieGraph(this.props.booking_analysis_data[0]['top_five_monthly_expense'].months,this.props.booking_analysis_data[0]['top_five_monthly_expense'].expenses,
                    "Monthly Expense","Your Monthly Expense")}
                </div>
                <br></br>
            </div>
           );
  }
}


function mapStateToProps(state) {
    return {
        booking_analysis_data: state.PropertyReducer.booking_analysis_data,
    };

}
export default connect(mapStateToProps,null)(BookingGraphs);
