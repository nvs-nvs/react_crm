import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';

class KindDiv extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
            return <div className={"hall_info__div_template"} onDoubleClick={this.props.onEdit}>
                        {this.props.value}
                    </div>;
        
    }
}

export default KindDiv;