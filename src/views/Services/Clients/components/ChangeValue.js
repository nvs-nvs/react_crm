import React, { Component } from 'react';
import TemplateDiv from './TemplateDiv';
import ChangeValueInput from './ChangeValueInput';
import {bindActionCreators} from "redux";
import * as clientInfoActions from "../../../../actions/ClientInfoActions";
import {connect} from "react-redux";
import axios from "axios";
import {config} from "../../../../config";
import {CLIENT_INFO_UPDATE_REQUEST} from "../../../../actions/ClientInfoActions";
import {CLIENT_INFO_UPDATE_SUCCESS} from "../../../../actions/ClientInfoActions";
import {CLIENT_INFO_UPDATE_SUCCESS_FAIL} from "../../../../actions/ClientInfoActions";

class ChangeValue extends Component{
    constructor(props){
        super(props);
        this.state = {edit: false};
    }

    onEdit = e => this.setState({edit: true});
    onExit = e => this.setState({edit: false});
    deleteInput = e => this.setState({edit: false});

    render(){
        if (this.state.edit){
            return <ChangeValueInput
                cellInfo = {this.props.cellInfo}
                deleteInput = {this.deleteInput}
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

export default ChangeValue;