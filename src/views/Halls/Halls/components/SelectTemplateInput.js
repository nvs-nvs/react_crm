import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import axios from 'axios/index';
import {config} from '../../../../config';

class SelectTemplateInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            templates: [],
            isFetching: false,
        };
    }
    
    componentDidMount(){
        this.props.onInit();
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
    
    componentWillUpdate = prevProps => {
        console.log('sd');
        if (this.props.error !== prevProps.error) {
            this.props.onExit();
        }
    };
    
    render(){
        const templates = this.state.templates.map((item, index) => {
            let selected = (this.props.initValue === item.template_name) ? 'selected' : '';
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
                            value = {this.props.currentValue}
                            onChange={this.props.onChange}
                            className={"hall_info__select_template"}
                            ref={(select) => { this.nameSelect = select; }}
                            type="select">
                            {this.state.isFetching ? []: templatesWithFirstEmpty}
                        </Input>
                    </FormGroup>
                    <div>
                        <button className={"btn btn-success btn-sm update_btn"} onClick={this.props.onUpdate}>v</button>
                        <button className={"btn btn-danger btn-sm"} onClick={this.props.onExit}>x</button>
                    </div>
                </div>
            );
        }
    }
}

export default SelectTemplateInput;