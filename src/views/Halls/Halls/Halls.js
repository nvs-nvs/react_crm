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

const focusOnError = createDecorator();
const checkboxStyle = {
    marginLeft: '35px',
};
const divStyle = {
    display: 'inline',
};

class Halls extends Component{
    
    onHallIdInputChangeHandler = function(e) {
        this.setState({hallIdInput: e.target.value});
    };
    
    onButtonClick = function(values) {
        if (!values.halls__hall_input) {
            return false;
        }
        console.log(values);
        this.props.getHallInfo(
            parseInt(values.halls__hall_input)
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
                                <label className="control-label">Зал</label>
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
                                        <div style={divStyle} className={meta.active ? 'active' : ''}>
                                            {meta.error && meta.touched && <small className="error">{meta.error}</small>}
                                            <input className="form-control" {...input}/>
                                        </div>
                                    )}
                                </Field>
                            </div>
    
                            <div style={checkboxStyle} className="form-group col-md-2">
                                <label>Активные за 12ч</label>
                                    <Field
                                        name="halls__last_checkbox"
                                    >
                                        {
                                            ({input})=>(
                                                <div>
                                                    <input type={"checkbox"} className="form-control" {...input}/>
                                                </div>
                                            )
                                        }
                                    </Field>
                                </div>
    
                            
                        </div>
    
                        <div className="form-row form-check col-md-3">
                            <div className="form-group">
                            <Button
                                type="submit"
                                className="btn btn-xs btn-success"
                                disabled={submitting}
                            >Искать
                            </Button>
                            </div>
                        </div>
                        
                    </form>
                )
                }
            </Form>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        getHallInfo: bindActionCreators(hallInfoActions.getHallInfo, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(Halls);
