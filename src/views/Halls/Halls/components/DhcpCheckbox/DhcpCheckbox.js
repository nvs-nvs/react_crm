import React, { Component } from 'react';
import {config} from '../../../../../config';
import axios from 'axios/index';
import Popup from 'reactjs-popup';
import { updateHallDhcp } from '../../../../../actions/HallInfoActions';
import { bindActionCreators } from 'redux';
import * as hallInfoActions from '../../../../../actions/HallInfoActions';
import { connect } from 'react-redux';

class DhcpCheckbox extends Component{
    constructor(props){
        super(props);
        this.state={
            isUpdating: false,
            error: false,
            message: '',
        };
    }
    
    onDhcpChange = (e) => {
        this.setState({
            ...this.state,
            isUpdating: true,
            error: false,
            message: '',
        });
        
        axios(`${config.api_url}/api/halls/updateDhcp`, {
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
                this.props.updateHallDhcp();
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
                return <div className="spinner-border text-danger"></div>
            }
            else {
                return <div className="form-check">
                            <Popup
                                open={this.state.error}
                            >
                                <div className="pop_up_custom_body">
                                    {this.state.message}
                                </div>
                            </Popup>
                            <input
                                type="checkbox"
                                checked={this.props.input.value}
                                onChange={this.onDhcpChange}
                                className="form-check-input"
                            />
                    </div>
            }
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateHallDhcp: bindActionCreators(hallInfoActions.updateHallDhcp, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(DhcpCheckbox);