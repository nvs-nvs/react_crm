import React, { Component } from 'react';
import SelectTemplateInput from './SelectTemplateInput';
import { textToInfoKind, textToKind } from '../../../../../helpers/common';
import {config} from '../../../../../config';
import axios from 'axios/index';
import Popup from 'reactjs-popup';

class CommonSelectTemplate extends Component{
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            error:false,
            message:'',
            isUpdating: false,
            currentValue: this.props.cellInfo.value,
            initValue: this.props.cellInfo.value,
            row: this.props.getRow(this.props.cellInfo)
        };
    }
    
    onEdit = e => this.setState({edit: true});
    
    editFinished = e => this.setState({
        edit: false,
        currentValue: this.state.initValue
    });
    
    onInit = () => {
        this.setState({
            ...this.state,
            currentValue: this.props.cellInfo.value ? this.props.cellInfo.value : '',
            initValue: this.props.cellInfo.value ? this.props.cellInfo.value : '',
        });
    };
    
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
                updatedRow: {...this.props.getRow(this.props.cellInfo), template_name : this.state.currentValue}
            },
        }).then(response => {
                this.setState({
                    edit: false,
                    error: false,
                    isUpdating : false,
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
            return <SelectTemplateInput
                    onUpdate={this.onUpdate}
                    onChange={this.onChange}
                    cellInfo = {this.props.cellInfo}
                    initValue={this.state.initValue}
                    currentValue={this.state.currentValue}
                    onInit={this.onInit}
                    editFinished = {this.editFinished }
                />
        } else {
            return (
                <div className={"empty_editable_item"}>
                    <Popup open={this.state.error}>
                        <div className="pop_up_custom_body">{this.state.message}</div>
                    </Popup>
                    <div className={"empty_editable_item"} onDoubleClick={this.onEdit}>
                        {this.props.cellInfo.value ? this.props.cellInfo.value: ''}
                    </div>
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

export default CommonSelectTemplate;