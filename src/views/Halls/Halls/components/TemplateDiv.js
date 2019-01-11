import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';

class TemplateDiv extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
            return <div
                onDoubleClick={this.props.onEdit}
                className={"hall_info__div_template"}>{this.props.cellInfo.value}</div>;
        
    }
}

export default TemplateDiv;