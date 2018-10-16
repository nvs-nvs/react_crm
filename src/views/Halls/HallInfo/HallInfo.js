import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import HallNumberInput from '../../../components/Halls/HallInfo/HallNumberInput';
import DateInput from '../../../HOC/DateInput';
import HallInfoTable from '../../../components/Halls/HallInfo/HallInfoTable';
import { onlyNumbers } from '../../../helpers/validators';
import { bindActionCreators } from 'redux';
import * as hallInfoActions from '../../../actions/HallInfoActions';

class HallInfo extends Component {
    
    constructor(props){
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    
    onInputKeyPres = function(e){
         if(!onlyNumbers(e.key)) {
             e.preventDefault()
         }
    };
    
    
    
    onButtonClick = function(e) {
        let hallId = findDOMNode(this.input).value;
        if(!hallId){
            return false;
        }
        this.props.hallInfoActions.getHallInfo(hallId);
    };
    
  render() {
      return (
        <div>
            <DateInput
                onKeyPres={this.onInputKeyPres}
                ref={input=>this.input = input}
            />
            <button
                onClick={this.onButtonClick}
                className = "btn btn-success">Отправить
            </button>
            <HallInfoTable />
        </div>
    );
  }
}

function	mapDispatchToProps(dispatch) {
    return {
        hallInfoActions: bindActionCreators(hallInfoActions, dispatch)
    }
}


export default connect(null, mapDispatchToProps)(HallInfo);
