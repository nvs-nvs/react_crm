import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';
import axios from 'axios/index';
import {config} from '../../../../config';

class SelectTemplateInput extends Component{
    constructor(props){
        super(props);
        this.state = {templates: []};
    }
    
    clickHandler = (e) => {
        if (!e.target.closest('.hall_info__select_template')){
            this.props.onExit();
        };
        return;
    };
    
    componentDidMount(){
        document.addEventListener('click', this.clickHandler);
        axios(`${config.api_url}/api/templates/getAllTemplate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
               this.setState(response.templates);
            },
            (error) => {
                console.log(error);
            });
    }
    
    componentWillUnmount(){
        document.removeEventListener('click', this.clickHandler);
    }
    
    render(){
        const templates = this.state.templates.map(function(item, index){
            console.log(item);
        });
        
        return (
            <FormGroup>
                <Input
                    className={"hall_info__select_template"}
                    ref={(select) => { this.nameSelect = select; }}
                    type="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
            </FormGroup>
        );
    }
}

export default SelectTemplateInput;