import React, {Component} from 'react';
import Datetime from 'react-datetime';
import '../../assets/datetime.css';
import './DateTimePickerCustom.css';

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
                        this.props.onChange(date);
                        this.setState({display: 'none'});
                    }
                }
                inputProps={{readOnly: true}}
                dateFormat="DD-MM-YYYY"
                timeFormat={false}
                locale="ru"
            />
        );
    }
}

export default DateTimePickerCustom;