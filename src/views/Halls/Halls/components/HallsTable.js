import React, { Component } from 'react';
import { connect } from 'react-redux';
import HallInfoCss from './HallsCss.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
    kindToText,
    infoKindToText,
    textToInfoKind, textToKind,
} from '../../../../helpers/common';
import moment from 'moment';
import {ru} from 'moment/locale/ru';
import DateTimePickerCustom from '../../../../hoc/DateTimePickerCustom/DateTimePickerCustom';
import CommonSelectTemplate from './EditableTemplate/CommonSelectTemplate';
import CommonVipInput from './EditableVip/CommonVipInput';
import CommonIpInput from './EditableiIp/CommonIpInput';
import CommonSelectKind from './EditableKind/CommonSelectKind';

class HallsTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            table: {
                data: this.props.clients,
                columns: [
                    {
                        Header: "Id",
                        accessor: "cli_id",
                    },
                    {
                        Header: "Mac",
                        accessor: "mac_addr"
                    },
                    {
                        Header: "Ip",
                        accessor: "ip",
                        Cell: this.renderEditableIp,
                    },
                    {
                        Header: "Зал",
                        accessor: "hall_id"
                    },
                    {
                        Header: "Тип",
                        id:'kind',
                        accessor: d => kindToText(d.kind),
                        Cell: this.renderEditableKind,
                    },
                    {
                        Header: "Info-Kind",
                        id: "info_kind",
                        accessor: d => d.info_kind ? infoKindToText(d.info_kind) : ''
                    },
                    {
                        Header: "Vip",
                        id: "vip",
                        accessor: "vip",
                        Cell: this.renderEditableVip,
                        Filter: ({ filter, onChange }) => (
                            <select
                                onChange = {
                                    (event) => onChange(event.target.value)
                                }
                                value={filter ? filter.value : "all"}
                            >
                                <option value="all"></option>
                                <option value="true">Да</option>
                                <option value="false">Нет</option>
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
                    },
                    {
                        Header: "Загрузка",
                        id: "boot_dttm",
                        Filter: ({ filter, onChange }) =>
                            <DateTimePickerCustom
                                onChange = {onChange}
                            />
                        ,
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
                            let time = moment(row.boot_dttm);
                            if (time.isValid()) {
                                return moment(row.boot_dttm).local().format("DD-MM-YYYY hh:mm:ss");
                            }
                            return '';
                        }
                    },
                    {
                        Header: "Активность",
                        id: "activ_dttm",
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
                            let time = moment(row.activ_dttm);
                            if (time.isValid()) {
                                return moment(row.activ_dttm).local().format("DD-MM-YYYY hh:mm:ss");
                            }
                            return '';
                        }
                    },
                    {
                        Header: "BlackList",
                        id: "blis_dttm",
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
                            let time = moment(row.blis_dttm);
                            if (time.isValid()) {
                                return moment(row.blis_dttm).local().format("DD-MM-YYYY hh:mm:ss");
                            }
                            return '';
                        }
                    },
                    {
                        Header: "Шаблон",
                        accessor: "template_name",
                        Cell: this.renderEditableTemplate
                    },
                    {
                        Header: "Версия",
                        accessor: "soft_version"
                    },
                    {
                        Header: "Перезагрузить",
                        accessor: "sdf",
                        filterable: false
                    },
                    {
                        Header: "Ping",
                        accessor: "sd",
                        filterable: false
                    },
                    {
                        Header: "ScreenShot",
                        accessor: "s",
                        filterable: false
                    }
                ]
            }
        };
    }
    
    renderEditableKind = (cellInfo) => {
        return <CommonSelectKind updateTable={this.updateTable} cellInfo={cellInfo} />;
    };
    
    renderEditableTemplate = (cellInfo) => {
        return <CommonSelectTemplate updateTable={this.updateTable} cellInfo={cellInfo} />;
    };
    
    renderEditableVip = (cellInfo) => {
        return <CommonVipInput updateTable={this.updateTable} cellInfo={cellInfo} />
    };
    
    renderEditableIp = (cellInfo) => {
        return <CommonIpInput updateTable={this.updateTable} cellInfo={cellInfo} />
    };
    
    updateTable = (row, index) => {
        let newData = [...this.state.table.data];
        newData[index] = {...newData[index], ...row};
        this.setState({
            table: {
                columns: this.state.table.columns,
                data: newData
            }
        });
    };
    
    render() {
            return (
                <ReactTable
                    noDataText="Нет данных"
                    data={this.state.table.data}
                    filterable
                    columns={this.state.table.columns}
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
    return	{
        clients: state.hallInfo.clients
    }
    
}
export default connect(mapStateToProps)(HallsTable);