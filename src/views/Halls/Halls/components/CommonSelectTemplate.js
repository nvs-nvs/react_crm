import React, { Component } from 'react';
import TemplateDiv from './TemplateDiv';
import SelectTemplateInput from './SelectTemplateInput';
import { connect } from 'react-redux';
import { textToInfoKind, textToKind } from '../../../../helpers/common';
import {bindActionCreators} from 'redux';
import * as hallInfoActions from '../../../../actions/HallInfoActions';

class CommonSelectTemplate extends Component{
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            error:false,
            message:'',
            currentValue: this.props.cellInfo.value ? this.props.cellInfo.value : '',
            initValue: this.props.cellInfo.value ? this.props.cellInfo.value : '',
        };
    }
    
    onEdit = e => this.setState({edit: true});
    
    onExit = e => this.setState({edit: false});
    
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
    };
    
    render(){
        if (this.state.edit && !this.props.error){
            return <SelectTemplateInput
                    onUpdate={this.onUpdate}
                    onChange={this.onChange}
                    cellInfo = {this.props.cellInfo}
                    initValue={this.state.initValue}
                    currentValue={this.state.currentValue}
                    onInit={this.onInit}
                    onExit = {this.onExit }
                />
        } else {
            return <TemplateDiv
                onEdit = {this.onEdit}
                cellInfo = {this.props.cellInfo}
            />
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hallInfoUpdate: bindActionCreators(hallInfoActions.hallInfoUpdate, dispatch),
    }
}

function mapStateToProps (state){
    return({
        error: state.hallInfo.error
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonSelectTemplate);