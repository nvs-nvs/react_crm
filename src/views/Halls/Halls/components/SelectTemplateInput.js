import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import axios from 'axios/index';
import {config} from '../../../../config';
import {bindActionCreators} from 'redux';
import * as hallInfoActions from '../../../../actions/HallInfoActions';
import { textToInfoKind, textToKind } from '../../../../helpers/common';

class SelectTemplateInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            error:false,
            message:'',
            open:false,
            templates: [],
            isChanged: false,
            isFetching: false,
            currentValue: this.props.cellInfo.value ? this.props.cellInfo.value : '',
            initValue: this.props.cellInfo.value ? this.props.cellInfo.value : '',
        };
    }
    
    onExit = (e) => {
        this.props.onExit();
    };
    
    componentDidMount(){
        this.setState({...this.state, isFetching: true});
        axios(`${config.api_url}/api/templates/getAllTemplate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
                this.setState({...this.state, templates: response.data.templates, isFetching: false});
            },
            (error) => {
                this.setState({...this.state, isFetching: false});
                console.log(error);
            });
    }
    
    onUpdate = (e) => {
        if (this.state.currentValue === this.state.initValue){
            this.props.deleteSelect();
            return false;
        }
        this.props.hallInfoUpdate(
            {
                cli_id: this.props.cellInfo.row.cli_id,
                mac_addr: this.props.cellInfo.row.mac_addr,
                ip: this.props.cellInfo.row.ip,
                hall_id: this.props.cellInfo.row.hall_id,
                kind: textToKind(this.props.cellInfo.row.kind),
                info_kind: textToInfoKind(this.props.cellInfo.row.info_kind),
                vip: this.props.cellInfo.row.vip,
                boot_dttm: this.props.cellInfo.row.boot_dttm,
                activ_dttm: this.props.cellInfo.row.activ_dttm,
                blist: this.props.cellInfo.row.blist,
                gs_id: this.props.cellInfo.row.gs_id,
                permission: this.props.cellInfo.row.permission,
                template_name: this.state.currentValue
            }, this.props.cellInfo.index);
//            if(!this.props.error){
//                this.props.cellInfo.value = this.state.currentValue;
//            }
//            this.props.deleteSelect();
    };
    
    onChange = (e) => {
        this.setState({...this.state, currentValue: e.target.value});
    };
    
    render(){
        const templates = this.state.templates.map((item, index) => {
            let selected = (this.state.initValue === item.template_name) ? 'selected' : '';
            return (
                <option key={item.template_name} value={item.template_name}>{item.template_name}</option>
            );
        });
    
        const templatesWithFirstEmpty = [<option key={'first_empty_value'}></option>, ...templates];

        if(this.state.isFetching){
            return (
                <div className="spinner-border text-success"/>
            );
        } else {
            return (
                <div>
                    <FormGroup>
                        <Input
                            value = {this.state.currentValue}
                            onChange={this.onChange}
                            className={"hall_info__select_template"}
                            ref={(select) => { this.nameSelect = select; }}
                            type="select">
                            {this.state.isFetching ? []: templatesWithFirstEmpty}
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
}

function mapDispatchToProps(dispatch) {
    return {
        hallInfoUpdate: bindActionCreators(hallInfoActions.hallInfoUpdate, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(SelectTemplateInput);