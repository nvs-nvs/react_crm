import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import {config} from '../../../../../config';
import Popup from 'reactjs-popup';
import * as hallInfoActions from '../../../../../actions/HallInfoActions';
import { bindActionCreators } from 'redux';
import { updateSportPartner } from '../../../../../actions/HallInfoActions';

class SportPartnerSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            isUpdating: false,
            error:false,
            message:'',
        };
    }
    
    onChange = (e) => {
        this.setState = ({
            isUpdating: true,
            error: false,
            message: '',
        });
        
        axios(`${config.api_url}/api/halls/updateHallPartner`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                hall_id: this.props.hall_id,
                partner_id: parseInt(e.target.value)
            },
        }).then(response => {
                this.setState({
                    ...this.state,
                    isUpdating: false,
                    error: false,
                    message: '',
                });
                this.props.updateSportPartner(e.target.value);
            },
            (error) => {
                this.setState = ({
                    isUpdating: false,
                    error: true,
                    message: error.response ? error.response.data.message : 'Нет связи с сервером',
                });
                
            });
    };
    
    render(){
        const combo = this.props.partners.map((item, index, array) => {
            return (
                <option key={`${item.partner_id}`} value={item.partner_id}>{item.name}</option>
            );
        });
        
        return (
            <div>
                <Popup open={this.state.error}>
                    <div className="pop_up_custom_body">{this.state.message}</div>
                </Popup>
                <FormGroup>
                    <Input
                        value = {this.props.partner}
                        onChange={this.onChange}
                        type="select">
                        {combo}
                    </Input>
                </FormGroup>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateSportPartner: bindActionCreators(updateSportPartner, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(SportPartnerSelect);