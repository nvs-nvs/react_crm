import React, { Component } from 'react';
import HallNumberInput from '../components/Halls/HallInfo/HallNumberInput';

class DateInput extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return <HallNumberInput
            {...this.props} />
    }
    }

export default DateInput;