import React, { Component } from 'react';
import { connect } from 'react-redux';
import HallInfoCss from './HallsCss.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {kindToText, infoKindToText, textToInfoKind, textToKind, getInfoKindsForStore,getKindsForStore} from '../../../../helpers/common';
import moment from 'moment';
import {ru} from 'moment/locale/ru';
import DateTimePickerCustom from '../../../../hoc/DateTimePickerCustom/DateTimePickerCustom';
import CommonSelectTemplate from './EditableTemplate/CommonSelectTemplate';
import CommonVipInput from './EditableVip/CommonVipInput';
import CommonIpInput from './EditableiIp/CommonIpInput';
import CommonSelectKind from './EditableKind/CommonSelectKind';
import CommonSelectInfoKind from './EditableInfoKind/CommonSelectInfoKind';
import matchSorter from 'match-sorter';
import {config} from '../../../../config';
import axios from 'axios/index';

class HallsTable extends Component {
    constructor(props){
        super(props);
        this.renderEditableInfoKind = this.renderEditableInfoKind.bind(this);
        this.renderEditableIp = this.renderEditableIp.bind(this);
        this.renderEditableKind = this.renderEditableKind.bind(this);
        this.renderEditableVip = this.renderEditableVip.bind(this);
        this.renderEditableTemplate = this.renderEditableTemplate.bind(this);
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
                        accessor: 'kind',
                        Cell: this.renderEditableKind,
                        Filter: ({ filter, onChange }) => {
                            const infoKinds = getKindsForStore().map((item, index) => {
                                return (
                                    <option key={item.value} value={item.name}>{item.name}</option>
                                );
                            });
        
                            let kindsWithFirstEmpty = [<option  value="all" key={'hall_info__kind_filter_first_empty_value'}></option>, ...infoKinds];
        
                            return <select
                                onChange = {
                                    (event) => onChange(event.target.value)
                                }
                                value={filter ? filter.value : "all"}
                            >
                                {kindsWithFirstEmpty}
                            </select>
                        },
                        filterMethod: (filter, row) => {
                            if (filter.value === "all") {
                                return true;
                            }
                            return row[filter.id] === textToKind(filter.value);
                        },
                    },
                    {
                        Header: "Info-Kind",
                        id:'info_kind',
                        accessor: 'info_kind',
                        Cell: this.renderEditableInfoKind,
                        Filter: ({ filter, onChange }) => {
                            const infoKinds = getInfoKindsForStore().map((item, index) => {
                                return (
                                    <option key={item.value} value={item.name}>{item.name}</option>
                                    );
                            });
    
                            let infoKindsWithFirstEmpty = [<option  value="all" key={'hall_info__info_kind_filter_first_empty_value'}></option>, ...infoKinds];
                            
                            return <select
                                onChange = {
                                    (event) => onChange(event.target.value)
                                }
                                value={filter ? filter.value : "all"}
                            >
                                {infoKindsWithFirstEmpty}
                            </select>
                        },
                        filterMethod: (filter, row) => {
                            if (filter.value === "all") {
                                return true;
                            }
                            if (!row[filter.id]) {
                                return false;
                            }
                            return row[filter.id] === textToInfoKind(filter.value);
                        },
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
    
    getRow = (cellInfo) => {
        return {
            cli_id: cellInfo.row.cli_id,
            mac_addr: cellInfo.row.mac_addr,
            ip: cellInfo.row.ip,
            kind: cellInfo.row.kind,
            info_kind: cellInfo.row.info_kind,
            vip: cellInfo.row.vip,
            template_name: cellInfo.row.template_name ? cellInfo.row.template_name : '',
            soft_version: cellInfo.row.soft_version,
        }
    };
    
    renderEditableKind(cellInfo) {
        return <CommonSelectKind
            getRow={this.getRow}
            updateTable={this.updateTable}
            cellInfo={cellInfo} />;
    };
    
    renderEditableInfoKind(cellInfo){
        return <CommonSelectInfoKind
            getRow={this.getRow}
            updateTable={this.updateTable}
            cellInfo={cellInfo} />;
    };
    
    renderEditableTemplate(cellInfo){
        return <CommonSelectTemplate
            getRow={this.getRow}
            updateTable={this.updateTable}
            cellInfo={cellInfo} />;
    };
    
    renderEditableVip(cellInfo){
        return <CommonVipInput
            updateTable={this.updateTable}
            getRow={this.getRow}
            cellInfo={cellInfo} />
    };
    
    renderEditableIp = (cellInfo) => {
        return <CommonIpInput
            getRow={this.getRow}
            updateTable={this.updateTable}
            cellInfo={cellInfo}
        />
    };
    
    updateTable = (value, cellInfo) => {
        let newData = [...this.state.table.data];
        let newValue = {};
        newValue[cellInfo.column.id] = value;
        newData[cellInfo.index] = {...newData[cellInfo.index], ...newValue};
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
                    contentEditable
                    suppressContentEditableWarning
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