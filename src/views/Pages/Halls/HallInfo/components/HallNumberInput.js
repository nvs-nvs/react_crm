import React, { Component } from 'react';
import { connect } from 'react-redux';

class HallNumberInput extends Component {
    constructor(props){
        super(props);
        this.onKeyPres = this.props.onKeyPres.bind(this);
    }
    
    render() {
        const { hall_id } = this.props;
        return (
            <input
                value={hall_id}
                onKeyPress = {this.onKeyPres}
                className="form-control" type="text"/>
        );
    }
}

function mapStateToProps(state){
    return {
        hall_id: state.hallInfo.hall_id
    };
}

export default connect(mapStateToProps)(HallNumberInput);