import React, { Component } from 'react';
import KindDiv from './KindDiv';
import KindInput from './KindInput';
import {
    kindToText,
    textToInfoKind,
    textToKind,
} from '../../../../../helpers/common';
import {config} from '../../../../../config';
import axios from 'axios/index';
import Popup from 'reactjs-popup';

class CommonSelectKind extends Component{
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            error:false,
            message:'',
            isUpdating: false,
            currentValue: textToKind(this.props.cellInfo.value),
            initValue: textToKind(this.props.cellInfo.value),
            row : {
                cli_id: this.props.cellInfo.row.cli_id,
                mac_addr: this.props.cellInfo.row.mac_addr,
                ip: this.props.cellInfo.row.ip,
                kind: textToKind(this.props.cellInfo.row.kind),
                info_kind: textToInfoKind(this.props.cellInfo.row.info_kind),
                vip: this.props.cellInfo.row.vip,
                template_name: this.props.cellInfo.row.template_name,
                soft_version: this.props.cellInfo.row.soft_version,
            }
        };
    }
    
    onEdit = e => this.setState({edit: true});
    
    editFinished = e => this.setState({
        edit: false,
        currentValue: this.state.initValue
    });
    
    onChange = (e) => {
        this.setState({...this.state, currentValue: e.target.value});
    };
    
    onUpdate = (e) => {
        if (this.state.currentValue === this.state.initValue){
            this.setState({edit: false});
            return false;
        }
        this.setState({...this.state, isUpdating : true});
        axios(`${config.api_url}/api/halls/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                updatedRow: {...this.state.row, kind : this.state.currentValue}
            },
        }).then(response => {
                this.setState({
                    edit: false,
                    error: false,
                    isUpdating : false,
                });
                this.props.updateTable({...this.state.row, kind : this.state.currentValue}, this.props.cellInfo.index);
            },
            (error) => {
                this.setState({
                    edit: false,
                    message: error.response ? error.response.data.message : 'Нет связи с сервером',
                    currentValue : this.state.initValue,
                    isUpdating : false,
                    error: true
                });
            });
    };
    
    render(){
        if(this.state.isUpdating){
            return <div className="spinner-border text-danger"></div>
        }
        else if (this.state.edit){
            return <KindInput
                onUpdate={this.onUpdate}
                onChange={this.onChange}
                cellInfo = {this.props.cellInfo}
                initValue={this.state.initValue}
                currentValue={this.state.currentValue}
                editFinished = {this.editFinished }
            />
        } else {
            return (
                <div className={"hall_info__div_template"}>
                    <Popup open={this.state.error}>
                        <div className="pop_up_custom_body">{this.state.message}</div>
                    </Popup>
                    <KindDiv
                        onEdit = {this.onEdit}
                        value = {kindToText(this.state.currentValue)}
                    />
                </div>
            )
        }
    }
}

function mapStateToProps (state){
    return({
        error: state.hallInfo.error
    });
};

export default CommonSelectKind;