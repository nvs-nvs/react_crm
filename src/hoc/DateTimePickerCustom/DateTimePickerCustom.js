import React, {Component} from 'react';
import Datetime from 'react-datetime';
import '../../assets/datetime.css';
import './DateTimePickerCustom.css';
import {Input} from "reactstrap";

class DateTimePickerCustom extends Component{
    constructor(props){
        super(props);
        this.state = {
            display: 'none',
        };
    }
    
    render(){
        return (
            <Datetime
                renderInput = {
                    (props, openCalendar, closeCalendar) => {

                        const clear = (e) => {
                            props.onChange({target: {value: ''}});
                        };
                        return (
                            <div>
                                <input {...props} />
                                <button style={{display: this.state.display}}
                                        className={'btn-xs btn-success datetime_picker_close_btn'}
                                        onClick={clear}>x
                                </button>
                            </div>
                        );
                    }}
                
                onFocus = {() => this.setState({display: 'block'})}
               
                onBlur = {
                    (date) => {

                        if(this.props.name != undefined && this.props.name != ""){

                            this.props.updateData(date, this.props.name, this.props.dateFormat);

                        } else {
                            this.props.onChange(date);
                        }

                        this.setState({
                            display: 'none',
                        });
                        
                    }
                }
                inputProps={{readOnly: true}}
                dateFormat={this.props.dateFormat ? this.props.dateFormat : "DD-MM-YYYY"}
                timeFormat={this.props.timeFormat ? this.props.timeFormat : false}
                defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}
                name={this.props.name ? this.props.name : ''}
                locale="ru"
            />
        );
    }
}

export default DateTimePickerCustom;