import React, { Component } from 'react';
import TemplateDiv from './TemplateDiv';
import SelectTemplateInput from './SelectTemplateInput';
import { connect } from 'react-redux';

class CommonSelectTemplate extends Component{
    constructor(props){
        super(props);
        this.state = {edit: false};
    }
    
    onEdit = e => this.setState({edit: true});
    onExit = e => this.setState({edit: false});
    deleteSelect = () => {
        this.setState({edit: false})
    };
    
    componentDidUpdate = prevProps => {
        if (this.props.error) {
            this.deleteSelect();
        }
    };
    
    render(){
        if (this.state.edit){
            return <SelectTemplateInput
                    cellInfo = {this.props.cellInfo}
                    table={this.props.table}
                    deleteSelect = {this.deleteSelect}
                    onExit = {this.onExit }
                />
            
        } else {
            return <TemplateDiv
                onEdit = {this.onEdit}
                cellInfo = {this.props.cellInfo}
            />
        }
    }
}

function mapStateToProps (state){
    return({
        error: state.hallInfo.error
    });
};

export default connect(mapStateToProps)(CommonSelectTemplate);