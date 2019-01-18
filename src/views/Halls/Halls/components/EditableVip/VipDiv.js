import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';

class VipDiv extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
            return <div className={"hall_info__div_template"} onDoubleClick={this.props.onEdit}>
                        {this.props.value === 1 ? 'Да' : 'Нет'}
                    </div>;
        
    }
}

export default VipDiv;