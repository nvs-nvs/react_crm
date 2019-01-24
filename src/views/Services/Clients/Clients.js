import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    composeValidators,
    onlyNumbers,
    required,
} from '../../../helpers/validatorsFinalForm';
import {bindActionCreators} from 'redux';
import * as clientInfoActions from '../../../actions/ClientInfoActions';
import {Field, Form} from 'react-final-form';
import createDecorator from 'final-form-focus';
import {Button, FormGroup} from "reactstrap";
//import ClientsTable from './components/ClientsTable';
import ClientsFields from './components/ClientsFields';
import HallGeneratedButton from './components/HallGeneratedButton'

const focusOnError = createDecorator();

class Clients extends Component {

    constructor(props){
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onClientPhoneInputChangeHandler = this.onClientPhoneInputChangeHandler.bind(this);

        this._assignFormRef = (formElement) => {
            this.formElement = formElement;
        };

        this.state = {
            clientPhoneInput: '',
            hall_id: 0,
            halls: [],
            hide: false,
        };
    }

    onClientPhoneInputChangeHandler = function(e) {
        this.setState({clientPhoneInput: e.target.value});
    };

    onButtonClick = function(values) {
        if(this.props.formClient != undefined) this.props.formClient.reset();
        if (!values.clients__client_input_phone && !values.clients__client_input_wallet) {
            console.log('false');
            return false;
        }

        let phone_num = parseInt(values.clients__client_input_phone);
        let hall_num = parseInt(values.clients__client_input_hall);
        let wallet_num = parseInt(values.clients__client_input_wallet);

        this.props.getClientInfo(
            {
                phone: phone_num ? phone_num : 0,
                hall_id: hall_num ? hall_num : 0,
                wallet: wallet_num ? wallet_num : 0
            }
        );

    };

    onClickHandler = function(event) {
        this.setState({
            hide: ((event.target.name == 'clients__client_input_wallet') ? true : false),
        });
    };
    
    render() {
        let halls_button = [];

        if(this.props.halls && this.props.halls.list_id != undefined) { // если получаем список холлов по телефону
            halls_button = this.props.halls.list_id;
        } else if(this.props.clients && this.props.clients.hall_id != undefined){ // если поиск идет по кошельку
            halls_button = [{hall_id:this.props.clients.hall_id}];
        }

        const hallsButtons = (halls_button.length > 0) ? halls_button.map((item, index) => {
            return (
                <HallGeneratedButton
                    key={index}
                    phone={this.phone}
                    hall_id={item.hall_id}
                ></HallGeneratedButton>
            );
        }) : '';

        //const hallsButtons = <HallGeneratedButton/>;

        const clientsFields = (this.props.clients && this.props.clients != undefined && this.props.clients.wallet_id) ? (<ClientsFields/>) : '';
        //const clientsFields = <ClientsFields/>;

        const hidefields = (this.state.hide && this.state.hide === true) ? true : '';

        const divSearchcoltyles = {
            border:'1px solid whitesmoke',
            padding: '5px 10px 10px 10px',
            margin: '0 10px 0 10px'
        };

        return (
            <div>
                <Form
                    onSubmit={this.onButtonClick}
                    decorators={[
                        focusOnError,
                    ]}
                    subscription={{
                        submitting: true,
                    }}
                >
                    {({handleSubmit, values, submitting}) => (
                        <form onSubmit={handleSubmit} onClick={(event)=>this.onClickHandler(event)}>
                            <div className="form-group row">
                                <div className="col" hidden={hidefields} style={divSearchcoltyles}>
                                    <div className="row">
                                        <div className="col">
                                            <Field
                                                name="clients__client_input_phone"
                                                //validate={composeValidators(required)} // onlyNumbers,
                                                subscription={{
                                                    value: true,
                                                    active: true,
                                                    touched: true,
                                                    error: true,
                                                }}

                                            >
                                                {({input, meta}) => (
                                                    <div className={meta.active ? 'active' : ''}>
                                                        <label className="control-label">Тел. номер клиента</label>
                                                        {meta.error && meta.touched && <small className="error">{meta.error}</small>}
                                                        <input ref={(phone)=>{this.phone = phone}} onChange={this.onFocusHandler} className="form-control" {...input}/>
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="col">
                                            <Field
                                                name="clients__client_input_hall"
                                                onFocus={this.onFocusHandler}
                                                validate={composeValidators(onlyNumbers)}
                                                subscription={{
                                                    value: true,
                                                    active: true,
                                                    touched: true,
                                                    error: true,
                                                }}
                                            >
                                                {({input, meta}) => (
                                                    <div className={meta.active ? 'active' : ''}>
                                                        <label className="control-label">Номер зала</label>
                                                        {meta.error && meta.touched && <small className="error">{meta.error}</small>}
                                                        <input className="form-control" {...input}/>
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                                <div className="align-self-center" hidden={hidefields}>ИЛИ</div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col" style={divSearchcoltyles}>
                                            <Field
                                                name="clients__client_input_wallet"
                                                autoComplete="off"
                                                validate={composeValidators(onlyNumbers)}
                                                subscription={{
                                                    value: true,
                                                    active: true,
                                                    touched: true,
                                                    error: true,
                                                }}
                                            >
                                                {({input, meta}) => (
                                                    <div className={meta.active ? 'active' : ''}>
                                                        <label className="control-label">Номер кошелька</label>
                                                        {meta.error && meta.touched && <small className="error">{meta.error}</small>}
                                                        <input
                                                            onClick={(event)=>this.onClickHandler(event)}
                                                            width={100}
                                                            className="form-control" {...input}
                                                        />
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="col align-self-center">
                                            <Button
                                                type="submit"
                                                className="btn btn-success"
                                                disabled={submitting}
                                            >Искать
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div>В каких залах зарегистрирован:</div>
                                <FormGroup>
                                    {hallsButtons}
                                </FormGroup>
                            </div>
                        </form>
                    )
                    }
                </Form>
                {clientsFields}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
