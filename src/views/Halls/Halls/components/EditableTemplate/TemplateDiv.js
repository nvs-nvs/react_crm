import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';

class TemplateDiv extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
            return <div className={"hall_info__div_template"} onDoubleClick={this.props.onEdit}>
                        {this.props.value ? this.props.value : ''}
                    </div>;
    }
}

export default TemplateDiv;