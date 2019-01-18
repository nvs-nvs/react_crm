import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import axios from 'axios/index';
import {config} from '../../../../../config';
import Popup from 'reactjs-popup';
import { onlyNumbers } from '../../../../../helpers/validators';

class IpInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            error:false,
            message:'',
        };
    }
    
    render(){
        return (
            <div>
                <Popup open={this.state.error}>
                    <div className="pop_up_custom_body">{this.state.message}</div>
                </Popup>
                <FormGroup>
                    <Input
                        value = {this.props.currentValue}
                        onChange={this.props.onChange}
                        className={"hall_info__select_template"}
                        type="text">
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

export default IpInput;