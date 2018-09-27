import React, { Component } from 'react';
import HallNumberInput from '../components/Halls/HallInfo/HallNumberInput';

class DateInput extends Component {
    constructor(props){
        super(props);
    }
   
    render(){
        const { onClick, ...propsToPass } = this.props;
        return <HallNumberInput
            onClick = { this.onClick }
            {...propsToPass} />
    }
    }

export default DateInput;