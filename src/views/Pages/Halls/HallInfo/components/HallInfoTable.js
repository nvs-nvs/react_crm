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
//        if(this.props.clients && this.props.clients.length != 0){
            return (

                <ReactTable
                    data={[
                        {
                        
                        }
                    ]}
                    columns={[
                        {
                            Header: "Name",
                            accessor: "firstName"
                        },
                        {
                            Header: "Last Name",
                            accessor: "lastName"
                        }
                    ]}
                    className="-striped -highlight"
                />
                /*
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col hall_info_td_center">
                            Номер Устройства
                        </th>
                        <th scope="col hall_info_td_center">
                            Mac-Адрес
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.props.clients.map((value, i) => <HallInfoTr client={value} key={i}/>) }
                    </tbody>
                </table>
                */
            );
//        } else {
//            return '';
//        }
    }
}

function mapStateToProps(state){
    return	{
        clients: state.hallInfo.clients
    }
    
}
export default connect(mapStateToProps)(HallInfoTable);