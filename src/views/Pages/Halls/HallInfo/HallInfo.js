import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import HallNumberInput from './components/HallNumberInput';
import HallInfoTable from './components/HallInfoTable';
import { onlyNumbers } from '../../../../helpers/validators';
import { bindActionCreators } from 'redux';
import * as hallInfoActions from '../../../../actions/HallInfoActions';
import { FormGroup, Form, Row, Col, Input, Label, Button } from 'reactstrap';

class HallInfo extends Component {
    
    constructor(props){
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onHallIdInputChangeHandler = this.onHallIdInputChangeHandler.bind(this);
        this.state = {
            hallIdInput: ''
        };
    }
    
    onInputKeyPres = function(e){
         if(!onlyNumbers(e.key)) {
             e.preventDefault();
             return false;
         }
    };
    
    onHallIdInputChangeHandler = function(e){
        this.setState({hallIdInput: e.target.value});
    };
    
    onButtonClick = function(e) {
        let hallId = this.state.hallIdInput;
        if(!hallId){
            return false;
        }
        this.props.getHallInfo(parseInt(hallId));
    };
    
  render() {
      return (
            <Form>
                <Row form>
                    <Col md={3}>
                            <HallNumberInput
                                errorMessage = {""}
                                name={"hallInfo__hall_number"}
                                onKeyPress={this.onInputKeyPres}
                                onChange = {this.onHallIdInputChangeHandler}
                                ref={input=>this.input = input}
                                value={this.state.hallIdInput}
                            />
                    </Col>
                    <Col md={3}>
                        <FormGroup check>
                            <Input type="checkbox" name="active" id="hallInfo__active_checkbox"/>
                            <Label for="hallInfo__active_checkbox" check>Активные за 6ч</Label>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup check>
                            <Input type="checkbox" name="active" id="hallInfo__vip_checkbox"/>
                            <Label for="hallInfo__vip_checkbox" check>VIP</Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Button
                    onClick={this.onButtonClick}
                    className = "btn btn-success">Искать
                </Button>
                
                <HallInfoTable />
            </Form>
    );
  }
}

function	mapDispatchToProps(dispatch) {
    return {
        getHallInfo: bindActionCreators(hallInfoActions.getHallInfo, dispatch),
    }
}


export default connect(null, mapDispatchToProps)(HallInfo);
