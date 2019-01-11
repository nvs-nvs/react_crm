import React, { Component } from 'react';
import { connect } from 'react-redux';
import HallInfoCss from './HallsCss.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getTkKindForRender, getInfoKindInString} from '../../../../helpers/common';
import moment from 'moment';
import {ru} from 'moment/locale/ru';
import DateTimePickerCustom from '../../../../hoc/DateTimePickerCustom/DateTimePickerCustom';
import SelectTemplate from './SelectTemplate';

class HallsTable extends Component {
    constructor(props){
        super(props);
        this.renderEditableTemplate = this.renderEditableTemplate.bind(this);
    }
    
    renderEditableTemplate(cellInfo) {
        return <SelectTemplate cellInfo={cellInfo}/>;
    }
    
    render() {
            return (
                <ReactTable
                    noDataText="Нет данных"
                    data={this.props.clients}
                    filterable
                    columns={[
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
                            accessor: "ip"
                        },
                        {
                            Header: "Зал",
                            accessor: "hall_id"
                        },
                        {
                            Header: "Тип",
                            id: 'kind',
                            accessor: d => getTkKindForRender(d.kind)
                            
                        },
                        {
                            Header: "Info-Kind",
                            id: "info_kind",
                            accessor: d => getInfoKindInString(d.info_kind)
                        },
                        {
                            Header: "Vip",
                            id: "vip",
                            accessor: "vip",
                            Cell: ({ value }) => (value) ? 'Да' : 'Нет',
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
                                    return moment(row.boot_dttm).local().format("DD-MM-YYYY h:mm:ss");
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
    return	{
        clients: state.hallInfo.clients
    }
    
}
export default connect(mapStateToProps)(HallsTable);