import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, FormFeedback, FormGroup, Label } from 'reactstrap';

class HallNumberInput extends Component {
    constructor(props){
        super(props);
        this.onKeyPres = this.props.onKeyPres.bind(this);
    }
    
    render() {
        const { hall_id, name, errorMessage } = this.props;
        let invalid = false;
        if(errorMessage.length >0){
            invalid = true;
        }
        return (
            <FormGroup>
                <Label>Номер зала</Label>
                <Input
                    invalid={invalid}
                    onKeyPress = {this.onKeyPres}
                    onChange = {this.props.onHallIdInputChangeHandler}
                    name={name}
                    type="text"
                    value = {this.props.hallIdInput}
                />
                <FormFeedback>
                    {errorMessage.length == 0 ? "" : errorMessage}
                </FormFeedback>
            </FormGroup>
        );
    }
}

function mapStateToProps(state){
    return {
        hall_id: state.hallInfo.hall_id
    };
}

export default connect(mapStateToProps)(HallNumberInput);