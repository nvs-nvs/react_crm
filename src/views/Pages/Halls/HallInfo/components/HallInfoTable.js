import React, { Component } from 'react';
import { connect } from 'react-redux';
import HallInfoTr from './HallInfoTr';
import HallInfoCss from './HallInfoCss.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

class HallInfoTable extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        if(this.props.clients && this.props.clients.length != 0){
            return (
               <ReactTable
          data={
			  {
				 "firstName":"dsd" 
			  }
		  }
          columns={[
            {
              Header: "Name",
              accessor: "firstName"
            }
            
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
            );
        } else {
            return '';
        }
    }
}

function mapStateToProps(state){
    return	{
        clients: state.hallInfo.clients
    }
    
}
export default connect(mapStateToProps)(HallInfoTable);