import React, { Component } from 'react';
import TemplateDiv from './TemplateDiv';
import SelectTemplateInput from './SelectTemplateInput';

class SelectTemplate extends Component{
    constructor(props){
        super(props);
        this.state = {edit: false};
    }
    
    onEdit = (e) => this.setState({edit: true});
    onExit = (e) => this.setState({edit: false});
    
    render(){
        if (this.state.edit){
            return <SelectTemplateInput
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

export default SelectTemplate;