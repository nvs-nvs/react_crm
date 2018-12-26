import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    composeValidators,
    onlyNumbers,
    required,
} from '../../../helpers/validators';
import {bindActionCreators} from 'redux';
import * as hallInfoActions from '../../../actions/HallInfoActions';
import {Field, Form} from 'react-final-form';
import createDecorator from 'final-form-focus';
import { Button } from "reactstrap";
import HallsTable from './components/HallsTable';

const focusOnError = createDecorator();
const checkBoxStyle={
  marginLeft: '25px'
};

class Halls extends Component{
    
    onHallIdInputChangeHandler = function(e) {
        this.setState({hallIdInput: e.target.value});
    };
    
    onButtonClick = function(values) {
        if (!values.halls__hall_input) {
            return false;
        }
        
        this.props.getHallInfo(
            parseInt(values.halls__hall_input),
            values.halls__last_checkbox,
            values.halls__vip_checkbox
            );
    };
    
    constructor(props){
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onHallIdInputChangeHandler = this.onHallIdInputChangeHandler.bind(
            this);
        this.state = {
            hallIdInput: '',
        };
    }
    
    render(){
        return (
            <div>
            <Form
                onSubmit={this.onButtonClick}
                decorators={[
                    focusOnError,
                ]}
                subscription={{
                    submitting: true,
                }}
            >
                {({handleSubmit, values, submitting}) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <Field
                                    name="halls__hall_input"
                                    validate={composeValidators(onlyNumbers,
                                        required)}
                                    subscription={{
                                        value: true,
                                        active: true,
                                        touched: true,
                                        error: true,
                                    }}
                                >
                                    {({input, meta}) => (
                                        <div className={meta.active ? 'active' : ''}>
                                            <label className="control-label">Зал</label>
                                            {meta.error && meta.touched && <small className="error">{meta.error}</small>}
                                            <input className="form-control" {...input}/>
                                        </div>
                                    )}
                                </Field>
                            </div>
    
                            <div  className="form-check">
                                <label className="control-label">Активные за 12ч</label>
                                    <Field
                                        name="halls__last_checkbox"
                                        type="checkbox"
                                    >
                                        {
                                            ({input})=>(
                                                <div  style={checkBoxStyle} className="form-check">
                                                    <input type="checkbox" className="form-check-input" {...input}/>
                                                </div>
                                            )
                                        }
                                    </Field>
                            </div>
    
                            <div  className="form-check">
                                <label className="control-label">VIP</label>
                                <Field
                                    name="halls__vip_checkbox"
                                    type="checkbox"
                                >
                                    {
                                        ({input})=>(
                                            <div  className="form-check">
                                                <input type="checkbox" className="form-check-input" {...input}/>
                                            </div>
                                        )
                                    }
                                </Field>
                            </div>
                            
                            
                        </div>
                        <Button
                            type="submit"
                            className="btn btn-success"
                            disabled={submitting}
                        >Искать
                        </Button>
                    </form>
                )
                }
            </Form>
            <HallsTable/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        getHallInfo: bindActionCreators(hallInfoActions.getHallInfo, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(Halls);
