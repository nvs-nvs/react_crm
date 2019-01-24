import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import axios from 'axios/index';
import {config} from '../../../../config';
import {bindActionCreators} from 'redux';
import {clientInfoUpdate} from '../../../../actions/ClientInfoActions';
import * as authActions from '../../../../actions/AuthActions';
import {composeValidators, onlyNumbers, required} from "../../../../helpers/validators";
import {Field} from "react-final-form";
import * as clientInfoActions from "../../../../actions/ClientInfoActions";

class ChangeValueInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            isUpdated: false,
            initValue: this.props.cellInfo.value,
            currentValue: this.props.cellInfo.value,
            columnname: this.props.cellInfo.name,
            id_row: this.props.cellInfo.wallet_id
        };

        //const { dispatch } = this.state;
    }

    onExit = (e) => {
        this.props.onExit();
    };


    onUpdate = (e) => {
        if (this.state.currentValue === this.state.initValue){
            this.props.deleteInput();
            return false;
        }

        if(this.props.clientInfoUpdate(this.state)) {
            this.props.deleteInput(this.state.currentValue);
        }

    };

    onChange = (e) => {
        this.setState({...this.state, currentValue: e.target.value});
    };

    render(){
        return (
            <div>
                <FormGroup>
                    <Input
                        onChange={this.onChange}
                        className={"clients_info__input"}
                        value={this.state.currentValue}>
                    </Input>
                </FormGroup>
                <div>
                    <button className={"btn btn-success btn-sm update_btn"} onClick={this.onUpdate}>v</button>
                    <button className={"btn btn-danger btn-sm"} onClick={this.onExit}>x</button>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
     return {
         clientInfoUpdate: bindActionCreators(clientInfoActions.clientInfoUpdate, dispatch)
     }
 }

 export default connect(null, mapDispatchToProps)(ChangeValueInput);