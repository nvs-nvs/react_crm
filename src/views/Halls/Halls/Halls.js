import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    composeValidators,
    onlyNumbers,
    required,
} from '../../../helpers/validatorsFinalForm';
import {bindActionCreators} from 'redux';
import * as hallInfoActions from '../../../actions/HallInfoActions';
import {Field, Form} from 'react-final-form';
import createDecorator from 'final-form-focus';
import { Button } from "reactstrap";
import HallsTable from './components/HallsTable';
import Popup from 'reactjs-popup';
import DhcpCheckbox from './components/DhcpCheckbox/DhcpCheckbox';
import OnOffButton from './components/OnOffButton/OnOffButton';
import {config} from '../../../config';
import axios from 'axios/index';
import SportPartnerSelect from './components/SportPartnerSelect/SportPartnerSelect';

const focusOnError = createDecorator();
const checkBoxStyle={
  marginLeft: '25px'
};

class Halls extends Component{
    
    constructor(props){
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    
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
    
    render(){
        return (
            <div>
                <Popup
                    open={this.props.error}
                >
                    <div className="pop_up_custom_body">
                        {this.props.message}
                    </div>
                </Popup>
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
                        <form id={'hall_info__form'} onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="hall_info_inputs form-group">
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
        
                                <div className="align_center_top hall_info_inputs">
                                    <label className="control-label">Активные за 6ч</label>
                                        <Field
                                            name="halls__last_checkbox"
                                            type="checkbox"
                                        >
                                            {
                                                ({input})=>(
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" {...input}/>
                                                    </div>
                                                )
                                            }
                                        </Field>
                                </div>
        
                                <div className=" col-md-1 align_center_top">
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
                                
                                <div id='hall_info__find_btn'>
                                    <Button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={submitting}
                                    >Искать
                                    </Button>
                                </div>
    
                                {this.props.hall_id ?
                                    <div style={{marginLeft: 50}} className="align_center_top col-md-1">
                                    <label className="control-label">DHCP*</label>
                                    <Field
                                    name="halls__dhcp_checkbox"
                                    type="checkbox"
                                    value={this.props.dhcp_enabled}
                                    hall_id={this.props.hall_id}
                                    component={DhcpCheckbox}
                                    >
                                    </Field>
                                    </div>
                                : ''}
    
                                {
                                    this.props.hall_id ?
                                        <OnOffButton
                                            hall_id={this.props.hall_id}
                                            value={this.props.permission}
                                        />
                                        : ''
                                }
    
                                {
                                    this.props.hall_id ?
                                        <div style={{marginLeft: '200px'}}>
                                            <h5>Зал №
                                                <span id="hall_info__hall_number_span">{this.props.hall_id}</span>
                                            </h5>
                                            <SportPartnerSelect
                                                partners={this.props.partners}
                                                partner={this.props.sport_partner_id}
                                                hall_id={this.props.hall_id}
                                            />
                                            {
                                                this.props.limit_multiplier ?
                                                    <div>
                                                        <span>Лимит зала(Спорт):</span>
                                                        <span style={{marginLeft: '20px'}}>{this.props.limit_multiplier}%</span>
                                                    </div>
                                                    : ''
                                            }
                                        </div> : ''
                                }
                                
                                
                                
                            </div>
                        </form>
                    )
                    }
                </Form>
                <span>* Изменяемые значения</span>
                <hr/>
                {!this.props.isFetching ? <HallsTable/> :
                    <div className={"spinner-wrapper"}>
                        <div className="spinner-border text-danger"></div>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        error: state.hallInfo.error,
        message: state.hallInfo.message,
        isFetching: state.hallInfo.isFetching,
        limit_multiplier: state.hallInfo.hallInfo.limit_multiplier,
        dhcp_enabled: state.hallInfo.hallInfo.dhcp_enabled,
        hall_id: state.hallInfo.hallInfo.hall_id,
        permission: state.hallInfo.hallInfo.permission,
        partners: state.hallInfo.hallInfo.sport_partners_list,
        sport_partner_id: state.hallInfo.hallInfo.sport_partner_id,
    };
}

function mapDispatchToProps(dispatch){
    return {
        getHallInfo: bindActionCreators(hallInfoActions.getHallInfo, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Halls);
