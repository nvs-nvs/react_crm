import React, { Component } from 'react';

class HallNumberInput extends Component {
    constructor(props){
        super(props);
        this.onKeyPres = this.props.onKeyPres.bind(this);
    }
    
    
    render() {
        return (
            <input id="hall_info_hall_number_input"
            onKeyPress = {this.onKeyPres}
            className="form-control" type="text"/>
        );
    }
}

export default HallNumberInput;