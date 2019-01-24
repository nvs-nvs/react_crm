import React, {Component} from 'react';
import {Button} from "reactstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {ru} from 'moment/locale/ru';
import * as clientInfoActions from "../../../../actions/ClientInfoActions";

class HallGeneratedButton extends Component{
    constructor(props){
        super(props);
        this.onButtonHallClick = this.onButtonHallClick.bind(this);
    }


    onButtonHallClick = () => {

        let phone_num = parseInt(this.props.phone.value);
        let hall_num = parseInt(this.props.hall_id);
        let wallet_num = 0;

        this.props.getClientInfo(
            {
                phone: phone_num ? phone_num : 0,
                hall_id: hall_num ? hall_num : 0,
                wallet: wallet_num ? wallet_num : 0
            }
        );

    };

    render(){

        // let halls_button = [];
        //
        // if(this.props.halls && this.props.halls.list_id != undefined) { // если получаем список холлов по телефону
        //     halls_button = this.props.halls.list_id;
        // } else if(this.props.clients && this.props.clients.hall_id != undefined){ // если поиск идет по кошельку
        //     halls_button = {hall_id:this.props.clients.hall_id};
        // }
        //
        // //console.log(halls_button);
        //
        // const hallsButtons = (halls_button.length > 0) ? halls_button.map((item, index) => {
        //     return (
        //         <Button
        //             key={index}
        //             className="btn btn-success"
        //             onClick={this.onButtonHallClick}
        //                 >
        //                 Зал № {item.hall_id}
        //         </Button>
        //     );
        // }) : '';
        //
        // return ( hallsButtons );

        const styles = {margin: '10px 10px 10px 0'};

        return (
            <Button
                className="btn btn-success"
                style={styles}
                onClick={this.onButtonHallClick}
                >
                Зал № {this.props.hall_id}
            </Button>
        );
    }
}

    function mapDispatchToProps(dispatch){
        return {
            getClientInfo: bindActionCreators(clientInfoActions.getClientInfo, dispatch),
        };
    }

    function mapStateToProps(state){
        return  {
            clients: state.client.clients.data,
            halls: state.client.halls
        }

    }

    export default connect(mapStateToProps, mapDispatchToProps)(HallGeneratedButton);

//export default HallGeneratedButton;