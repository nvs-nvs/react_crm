import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, FormFeedback, FormGroup, Label } from 'reactstrap';

class ClientNumberInput extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        let invalid = false;
        if(this.props.errorMessage.length >0){
            invalid = true;
        }
        return (
            <FormGroup>
                <Label>ID клиента</Label>
                <Input
                    invalid={invalid}
                    onKeyPress = {this.props.onKeyPress}
                    onChange = {this.props.onChange}
                    name={this.props.name}
                    type="text"
                    value = {this.props.clientPhoneInput}
                />
                <FormFeedback>
                    {this.props.errorMessage.length == 0 ? "" : this.props.errorMessage}
                </FormFeedback>
            </FormGroup>
        );
    }
}

export default ClientNumberInput;