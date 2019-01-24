import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import axios from 'axios/index';
import {config} from '../../../../../config';
import Popup from 'reactjs-popup';
import { kindToText, getInfoKindsForStore } from '../../../../../helpers/common';

class InfoKindInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            store: getInfoKindsForStore(),
            error:false,
            message:'',
        };
    }
    
    componentDidMount(){
        if(!this.props.currentValue){
           this.props.onInit();
        }
    }
    
    render(){
        const combo = this.state.store.map((item, index, array) => {
            return (
                <option key={`${index}`} value={item.value}>{item.name}</option>
            );
        });
        
        return (
            <div>
                <Popup open={this.state.error}>
                    <div className="pop_up_custom_body">{this.state.message}</div>
                </Popup>
                <FormGroup>
                    <Input
                        value = {this.props.currentValue}
                        onChange={this.props.onChange}
                        type="select">
                        {combo}
                    </Input>
                </FormGroup>
                <div>
                    <button className={"btn btn-success btn-sm update_btn"} onClick={this.props.onUpdate}>v</button>
                    <button className={"btn btn-danger btn-sm"} onClick={this.props.editFinished}>x</button>
                </div>
            </div>
        );
    }
}

export default InfoKindInput;