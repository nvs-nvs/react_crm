import React, { Component } from 'react';
import IpInput from './IpInput';
import { textToInfoKind, textToKind } from '../../../../../helpers/common';
import {config} from '../../../../../config';
import axios from 'axios/index';
import Popup from 'reactjs-popup';
import { validateIpAddress } from '../../../../../helpers/validators';

class CommonIpInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            error:false,
            message:'',
            initValue: this.props.cellInfo.value,
            isUpdating: false,
            currentValue: this.props.cellInfo.value,
            row: this.props.getRow(this.props.cellInfo)
        };
    }
    
    onEdit = e => this.setState({
        initValue: this.props.cellInfo.value,
        currentValue: this.props.cellInfo.value,
        edit: true
    });
    
    editFinished = e => this.setState({
        edit: false,
        currentValue: this.state.initValue
    });
    
    onChange = (e) => {
        this.setState({...this.state, currentValue: e.target.value.trim()});
    };
    
    onUpdate = (e) => {
        if (this.state.currentValue === this.state.initValue){
            this.setState({edit: false});
            return false;
        }
        if(this.state.currentValue.length > 0 && !validateIpAddress(this.state.currentValue)){
            this.setState({
                error: true,
                message: 'Поле IP некорректно',
                edit: false,
                currentValue: this.state.initValue
            });
            return false;
        }
        this.setState({...this.state, isUpdating : true});
        axios(`${config.api_url}/api/halls/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                updatedRow: {...this.props.getRow(this.props.cellInfo), ip : this.state.currentValue}
            },
        }).then(response => {
                this.setState({
                    edit: false,
                    error: false,
                    isUpdating : false,
                    initValue: this.state.currentValue,
                });
                this.props.updateTable(this.state.currentValue, this.props.cellInfo);
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
            return <div>
                    <IpInput
                    onUpdate={this.onUpdate}
                    onChange={this.onChange}
                    cellInfo = {this.props.cellInfo}
                    initValue={this.state.initValue}
                    currentValue={this.state.currentValue}
                    editFinished = {this.editFinished }
                    />
                </div>
        } else {
            return (
                <div>
                    <Popup open={this.state.error}>
                        <div className="pop_up_custom_body">{this.state.message}</div>
                    </Popup>
                    <div className={"hall_info__div_template"} onDoubleClick={this.onEdit}>
                        {this.props.cellInfo.value}
                    </div>
                </div>
            )
        }
    }
}

export default CommonIpInput;