import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientInfoCss from './ClientsCss.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getTkKindForRender, getInfoKindInString} from '../../../../helpers/common';
import moment from 'moment';
import {ru} from 'moment/locale/ru';
import DateTimePickerCustom from '../../../../hoc/DateTimePickerCustom/DateTimePickerCustom';
import ChangeInputValue from './ChangeValue';

class ClientsTable extends Component {
    constructor(props){
        super(props);
        this.renderEditableInputValue = this.renderEditableInputValue.bind(this);
    }

    renderEditableInputValue(cellInfo) {
        return <ChangeInputValue cellInfo={cellInfo}/>;
    }


    render() {
        return (
            <ReactTable
                noDataText="Нет данных"
                data={this.props.clients}
                filterable
                columns={[
                    {
                        Header: "ID кошелька",
                        accessor: "wallet_id",
                    },
                    {
                        Header: "ID зала",
                        accessor: "hall_id"
                    },
                    {
                        Header: "Телефон",
                        accessor: "phone"
                    },
                    {
                        Header: "Баланс",
                        accessor: "balance"
                    },
                    {
                        Header: "Nickname",
                        accessor: "nickname",
                        Cell: this.renderEditableInputValue

                    },
                    {
                        Header: "Дата создания",
                        id: "create_dttm",
                        Filter: ({ filter, onChange }) =>
                            <DateTimePickerCustom
                                onChange = {onChange}
                            />,
                        filterMethod: (filter, row) => {
                            const rowMomentValue = moment(row[filter.id], 'DD-MM-YYYY');
                            if(
                                filter.value.isValid()
                                &&
                                rowMomentValue.isValid()
                                &&
                                (filter.value.format("DD-MM-YYYY") === rowMomentValue.format("DD-MM-YYYY"))
                            ){
                                return true;
                            }
                            return false;
                        },
                        accessor: row => {
                            let time = moment(row.create_dttm);
                            if (time.isValid()) {
                                return moment(row.create_dttm).local().format("DD-MM-YYYY hh:mm:ss");
                            }
                            return '';
                        }
                    },
                    {
                        Header: "Активность",
                        id: "activ",
                        accessor: "active",
                        Cell: ({ value }) => (value) ? 'Активен' : 'Неактивен',
                        Filter: ({ filter, onChange }) => (
                            <select
                                onChange = {
                                    (event) => onChange(event.target.value)
                                }
                                value={filter ? filter.value : "all"}
                            >
                                <option value="all"></option>
                                <option value="true">Активен</option>
                                <option value="false">Неактивен</option>
                            </select>
                        ),
                        filterMethod: (filter, row) => {
                            if (filter.value === "all") {
                                return true;
                            }
                            if (filter.value === 'true') {
                                return row[filter.id] === 1;
                            }
                            return row[filter.id] === 0;
                        },
                    }
                ]}
                className="-striped -highlight"
                defaultPageSize={ 100 }
                style={{
                    textAlign: 'center',
                    height: "700px"
                }}
            />
        );
    }
}

function mapStateToProps(state){
    return  {
        clients: state.client.clients.clients
    }

}
export default connect(mapStateToProps)(ClientsTable);