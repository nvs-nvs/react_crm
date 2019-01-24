import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import axios from 'axios/index';
import {config} from '../../../../../config';
import Popup from 'reactjs-popup';

class VipInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            vips: [0,1],
            error:false,
            message:'',
        };
    }
    
    render(){
        const vips = this.state.vips.map((item, index, array) => {
            return (
                <option key={`${index}`} value={item}>{item ? 'Да' : 'Нет'}</option>
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
                        {vips}
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

export default VipInput;