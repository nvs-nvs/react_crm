import React, { Component } from 'react';
import {config} from '../../../../../config';
import axios from 'axios/index';
import Popup from 'reactjs-popup';
import { updateHallDhcp } from '../../../../../actions/HallInfoActions';
import { bindActionCreators } from 'redux';
import * as hallInfoActions from '../../../../../actions/HallInfoActions';
import { connect } from 'react-redux';

const ON = 'Включен';
const OFF = 'Выключен';

class onOffButton extends Component{
    constructor(props){
        super(props);
        this.state={
            isUpdating: false,
            error: false,
            message: '',
        };
    }
    
    onClick = (e) => {
        this.setState({
            ...this.state,
            isUpdating: true,
            error: false,
            message: '',
        });
        
        axios(`${config.api_url}/api/halls/updateOnOffHall`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                hall_id: this.props.hall_id
            },
        }).then(response => {
                this.setState({
                    ...this.state,
                    isUpdating: false,
                    error: false,
                    message: '',
                });
                this.props.updateOnOffHall();
            },
            (error) => {
                this.setState({
                    ...this.state,
                    isUpdating: false,
                    error: true,
                    message: error.response ? error.response.data.message : 'Нет связи с сервером',
                });
            });
    };
    
    render(){
        if(this.state.isUpdating){
            return <div style={{marginTop: 29}} className={"align_center_top"}>
                    <div className="spinner-border text-danger"></div>
                   </div>
        }
        else {
            return <div style={{marginTop: 29}}>
                <Popup
                    open={this.state.error}
                >
                    <div className="pop_up_custom_body">
                        {this.state.message}
                    </div>
                </Popup>
                <button className={this.props.value ? "btn btn-success" : "btn btn-danger"}
                        onClick={this.onClick}
                >
                    {this.props.value ? ON : OFF}
                </button>
            </div>
        }
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateOnOffHall: bindActionCreators(hallInfoActions.updateOnOffHall, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(onOffButton);