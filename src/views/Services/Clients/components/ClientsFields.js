import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    composeValidators,
    onlyNumbers,
    floatNumbers,
    required,
} from '../../../../helpers/validatorsFinalForm';
import createDecorator from 'final-form-focus';
import moment from 'moment';
import {ru} from 'moment/locale/ru';
import DateTimePickerCustom from '../../../../hoc/DateTimePickerCustom/DateTimePickerCustom';
import {Field, Form} from "react-final-form";
import {Button, FormGroup, Input, Label} from "reactstrap";
import {bindActionCreators} from "redux";
import * as clientInfoActions from "../../../../actions/ClientInfoActions";

const focusOnError = createDecorator();
const documentCode = {
                        "21": "Паспорт гражданина Российской Федерации",
                        "03": "Свидетельство о рождении",
                        "07": "Военный билет",
                        "08": "Временное удостоверение, выданное взамен военного билета",
                        "10": "Паспорт иностранного гражданина",
                        "11": "Свидетельство о рассмотрении ходатайства о признании лица беженцем на территории Российской Федерации по существу",
                        "12": "Вид на жительство в Российской Федерации",
                        "13": "Удостоверение беженца",
                        "14": "Временное удостоверение личности гражданина Российской Федерации",
                        "15": "Разрешение на временное проживание в Российской Федерации",
                        "19": "Свидетельство о предоставлении временного убежища на территории Российской Федерации",
                        "23": "Свидетельство о рождении, выданное уполномоченным органом иностранного государства",
                        "24": "Удостоверение личности военнослужащего Российской Федерации",
                        "91": "Иные документы"
                    };

class ClientsFields extends Component {
    constructor(props){
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this); // кнопка отправки данных в table in DB для update
        this.inputChangedHandler = this.inputChangedHandler.bind(this); // событие onchange проверки вводимых данных в поле, запись в state для update data table in DB
        this.updateData = this.updateData.bind(this); // событие onchange проверки вводимых данных в поле, запись в state для update data table in DB

       this.state = {
            input_error:[],
            active: "",
            document:"",
            rezident:"",
       };
    }

    //отправка данных в table in DB для update
    onButtonClick = function(event) {

        if(this.state.input_error.length > 0) {
            return false;
        }

        this.props.clientInfoUpdate(this.state);

    };

    // вставка даты в массив для отправки на update
    updateData = (value, column, dateFormat) => {

        let time = moment(value._d);
        time = time.format(dateFormat);

        this.setState({
            [column] : time
        });

        //console.log(this.state);

    }

    // проверка вводимых данных в поле, запись в state для update data table in DB
    inputChangedHandler = function(event, typeValidate = '') {
        let column = event.target.name;
        let value = event.target.value;
        let wallet_id = (this.props && this.props.clients) ? this.props.clients.wallet_id : null;

        if(typeValidate != ""){

            if(typeValidate.call(this,value) != undefined) {

                this.setState({
                    input_error: {...this.state.input_error, [column]: typeValidate.call(this,value)},
                });
                return false;

            } else {

                let arr = this.state.input_error;
                delete arr[column];
                this.setState({
                    input_error: arr,
                });
            }
        }

        // if(event.target.type == 'select') {
        //
        //     console.log(event.target.type, value);
        //     this.setState({
        //         [column]: value,
        //     });
        // }

        this.setState({
            [column]: value,
            id_row: wallet_id
        });
    };


    render() {

        // данные, полученые в результате выборки из бд функцией getClientInfo в классе Clients

        const wallet_id = (this.props.clients && this.props.clients.wallet_id != undefined && this.props.clients.wallet_id != null) ? this.props.clients.wallet_id : '';

        let name_from_db = (this.props.clients && this.props.clients.name != undefined && this.props.clients.name != null) ? this.props.clients.name : '';
        const name = (this.state.name && this.state.name != undefined && this.state.name != null) ? this.state.name : name_from_db;
        const str_name = name;

        let surname_from_db = (this.props.clients && this.props.clients.surname != undefined && this.props.clients.surname != null) ? this.props.clients.surname : '';
        const surname = (this.state.surname && this.state.surname != undefined && this.state.surname != null) ? this.state.surname : surname_from_db;
        const str_surname = surname;

        const nickname = (this.props.clients && this.props.clients.nickname != undefined && this.props.clients.nickname != null) ? this.props.clients.nickname : '';
        const patronymic = (this.props.clients && this.props.clients.patronymic != undefined && this.props.clients.patronymic != null) ? this.props.clients.patronymic : '';
        const birthday = (this.props.clients && this.props.clients.birthday != undefined && this.props.clients.birthday != null) ? this.props.clients.birthday : '';
        const sex = (this.props.clients && this.props.clients.sex != undefined && this.props.clients.sex != null) ? this.props.clients.sex : '';
        const citizenship = (this.props.clients && this.props.clients.citizenship != undefined && this.props.clients.citizenship != null) ? this.props.clients.citizenship : '';

        let document_from_db = (this.props.clients && this.props.clients.document != undefined && this.props.clients.document != null) ? this.props.clients.document : '';
        const document = (this.state.document && this.state.document != undefined && this.state.document != null) ? this.state.document : document_from_db;
        const str_document = documentCode[document];

        const doc_list = Object.entries(documentCode).map(([k, v]) => {
            return (
                <option key={k} value={k}>{v}</option>
            );
        });

        const docNumber = (this.props.clients && this.props.clients.docNumber != undefined && this.props.clients.docNumber != null) ? this.props.clients.docNumber : '';
        const docBirthday = (this.props.clients && this.props.clients.docBirthday != undefined && this.props.clients.docBirthday != null) ? this.props.clients.docBirthday : '';
        const docFrom = (this.props.clients && this.props.clients.docFrom != undefined && this.props.clients.docFrom != null) ? this.props.clients.docFrom : '';
        const docFromCode = (this.props.clients && this.props.clients.docFromCode != undefined && this.props.clients.docFromCode != null) ? this.props.clients.docFromCode : '';

        let rezident_from_db = (this.props.clients && this.props.clients.rezident != undefined && this.props.clients.rezident != null) ? this.props.clients.rezident : '';
        const rezident = (this.state.rezident && this.state.rezident != undefined && this.state.rezident != null) ? this.state.rezident : rezident_from_db;

        const country = (this.props.clients && this.props.clients.country != undefined && this.props.clients.country != null) ? this.props.clients.country : '';
        const address = (this.props.clients && this.props.clients.address != undefined && this.props.clients.address != null) ? this.props.clients.address : '';
        const region = (this.props.clients && this.props.clients.region != undefined && this.props.clients.region != null) ? this.props.clients.region : '';
        const city = (this.props.clients && this.props.clients.city != undefined && this.props.clients.city != null) ? this.props.clients.city : '';
        const locality = (this.props.clients && this.props.clients.locality != undefined && this.props.clients.locality != null) ? this.props.clients.locality : '';

        const hall_id = (this.props.clients && this.props.clients.hall_id != undefined && this.props.clients.hall_id != null) ? this.props.clients.hall_id : '';

        const balance = (this.props.clients && this.props.clients.balance != undefined && this.props.clients.balance != null) ? this.props.clients.balance : '';
        const bonus = (this.props.clients && this.props.clients.bonus != undefined && this.props.clients.bonus != null) ? this.props.clients.bonus : '';

        const pin = (this.props.clients && this.props.clients.pin != undefined && this.props.clients.pin != null) ? this.props.clients.pin : '';
        const card_id = (this.props.clients && this.props.clients.card_id  != undefined && this.props.clients.card_id  != null) ? this.props.clients.card_id : '';

        const create_dttm = (this.props.clients && this.props.clients.create_dttm != undefined && this.props.clients.create_dttm != null) ? this.props.clients.create_dttm : '';

        let active_from_db = (this.props.clients && this.props.clients.active != undefined && this.props.clients.active != null) ? this.props.clients.active : '';
        const active = (this.state.active && this.state.active != undefined && this.state.active != null) ? this.state.active : active_from_db;

        const active_arr = {"2":"Выбрать", "1":"Да", "0":"Нет"}
        const active_list = Object.entries(active_arr).map(([k, v]) => {
            return (
                <option key={k} value={k}>{v}</option>
            );
        });

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
                        <form onSubmit={handleSubmit} ref={(formClient) => this.formClient = formClient}>
                            <div className="form-row">
                                <div className="form-group">
                                    <div><h5>Общая информация о клиенте (при вводе зала):</h5></div>
                                    <FormGroup>
                                        <Input
                                            className="form-control"
                                            name='wallet_id'
                                            type="hidden"
                                            defaultValue = {wallet_id}
                                            ref={(wallet_id)=>{this.wallet_id = wallet_id}}
                                        />
                                        <Label>Имя</Label>
                                        <Input
                                            className="form-control"
                                            name="str_name"
                                            readOnly={true}
                                            type="text"
                                            defaultValue = {str_name}
                                            onChange={(event)=>this.inputChangedHandler(event)}
                                            //ref={(str_name)=>{this.str_name = str_name}}
                                        />
                                        <Label>Фамилия</Label>
                                        <Input
                                            className="form-control"
                                            name='str_surname'
                                            readOnly={true}
                                            type="text"
                                            onChange={(event)=>this.inputChangedHandler(event)}
                                            defaultValue = {str_surname}
                                            ref={(str_surname)=>{this.str_surname = str_surname}}
                                        />
                                        <Label>Документ удостоверяющий личность по которому зарегистрирован игрок в системе</Label>
                                        <Input
                                            className="form-control"
                                            onChange={(event)=>this.inputChangedHandler(event)}
                                            name='str_document'
                                            readOnly={true}
                                            ref={(str_document) => { this.str_document = str_document; }}
                                            type="text"
                                            defaultValue = {str_document}
                                        />
                                    </FormGroup>
                                    <div><h5>Баланс (при обязательном вводе зала):</h5></div>
                                    <FormGroup>
                                        <div className="row">
                                            <div className="col">
                                                <label className="control-label">Основной</label>
                                                <Input
                                                    className="form-control"
                                                    name='balance'
                                                    type="text"
                                                    onChange={(event)=>this.inputChangedHandler(event, floatNumbers)}
                                                    defaultValue = {balance}
                                                    ref={(balance)=>{this.balance = balance}}
                                                />
                                                {this.state.input_error.balance && <small className="error">{this.state.input_error.balance}</small>}
                                            </div>
                                            <div className="col">
                                                <Label>Бонусный</Label>
                                                <Input
                                                    className="form-control"
                                                    name='bonus'
                                                    type="text"
                                                    onChange={(event)=>this.inputChangedHandler(event, floatNumbers)}
                                                    defaultValue = {bonus}
                                                />
                                                {this.state.input_error.bonus && <small className="error">{this.state.input_error.bonus}</small>}
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <div><h5>ПИН</h5></div>
                                    <FormGroup>
                                        <div className="row">
                                            <div className="col">
                                                <Label>Основной</Label>
                                                <Input
                                                    className="form-control"
                                                    name='pin'
                                                    type="text"
                                                    onChange={(event)=>this.inputChangedHandler(event,required)}
                                                    defaultValue = {pin}
                                                />
                                                {this.state.input_error.pin && <small className="error">{this.state.input_error.pin}</small>}
                                            </div>
                                            <div className="col">
                                                <Label>Изменение карты</Label>
                                                <Input
                                                    className="form-control"
                                                    name='card_id'
                                                    type="number"
                                                    onChange={(event)=>this.inputChangedHandler(event,onlyNumbers, required)}
                                                    defaultValue = {card_id}
                                                />
                                                {this.state.input_error.card_id && <small className="error">{this.state.input_error.card_id}</small>}
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <div><h5>Регистрация игрока в системе</h5></div>
                                    <FormGroup>
                                        <div className="row">
                                            <div className="col">
                                                <Label>Активирован</Label>
                                                <Input
                                                    onChange={(event)=>this.inputChangedHandler(event)}
                                                    name='active'
                                                    className="form-control"
                                                    ref={(active) => { this.active = active; }}
                                                    type="select"
                                                    value = {active}>
                                                    {active_list}
                                                </Input>
                                                {this.state.input_error.active && <small className="error">{this.state.input_error.active}</small>}
                                            </div>
                                            <div className="col">
                                                <Label>Дата активации</Label>
                                                <DateTimePickerCustom
                                                    targetInput = 'create_dttm'
                                                    updateData={this.updateData}
                                                    timeFormat = {true}
                                                    name='create_dttm'
                                                    defaultValue = {create_dttm}
                                                    dateFormat = "DD-MM-YYYY h:mm:ss"
                                                    onChange = {(event)=>this.onChange(event.target.value)}
                                                />
                                                {this.state.input_error.create_dttm && <small className="error">{this.state.input_error.create_dttm}</small>}
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <div><h5>ПД (персональные данные)</h5></div>
                                    <FormGroup>
                                        <div className="row">
                                            <div className="col">
                                                <Label>НикНейм</Label>
                                                <Input
                                                    className="form-control"
                                                    name='nickname'
                                                    type="text"
                                                    onChange={(event)=>this.inputChangedHandler(event,required)}
                                                    defaultValue = {nickname}
                                                />
                                                {this.state.input_error.nickname && <small className="error">{this.state.input_error.nickname}</small>}
                                            </div>
                                            <div className="col">
                                                <Label>Имя</Label>
                                                <Input
                                                    className="form-control"
                                                    name='name'
                                                    type="text"
                                                    onChange={(event)=>this.inputChangedHandler(event,required)}
                                                    defaultValue = {name}
                                                />
                                                {this.state.input_error.name && <small className="error">{this.state.input_error.name}</small>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <Label>Фамилия</Label>
                                                <Input
                                                    className="form-control"
                                                    name='surname'
                                                    type="text"
                                                    onChange={(event)=>this.inputChangedHandler(event,required)}
                                                    defaultValue = {surname}
                                                />
                                                {this.state.input_error.surname && <small className="error">{this.state.input_error.surname}</small>}
                                            </div>
                                            <div className="col">
                                                <Label>Отчество</Label>
                                                <Input
                                                    className="form-control"
                                                    name='patronymic'
                                                    type="text"
                                                    onChange={(event)=>this.inputChangedHandler(event)}
                                                    defaultValue = {patronymic}
                                                />
                                                {this.state.input_error.patronymic && <small className="error">{this.state.input_error.patronymic}</small>}
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <div><h5>Паспортные данные</h5></div>
                                    <FormGroup>
                                        <div className="row">
                                            <div className="col">
                                                <div>
                                                    <Label>Документ удостоверяющий личность</Label>
                                                    <Input
                                                        onChange={(event)=>this.inputChangedHandler(event,required)}
                                                        name='document'
                                                        className="form-control"
                                                        ref={(document) => { this.document = document; }}
                                                        type="select"
                                                        value = {document}>
                                                        {doc_list}
                                                    </Input>
                                                    {this.state.input_error.document && <small className="error">{this.state.input_error.document}</small>}
                                                </div>
                                                <div>
                                                    <Label>День рождения</Label>
                                                    <DateTimePickerCustom
                                                        targetInput = 'create_dttm'
                                                        updateData={this.updateData}
                                                        timeFormat = {false}
                                                        name='birthday'
                                                        defaultValue = {birthday}
                                                        dateFormat = "DD-MM-YYYY"
                                                        onChange = {(event)=>this.onChange(event.target.value)}
                                                    />
                                                    {this.state.input_error.birthday && <small className="error">{this.state.input_error.birthday}</small>}
                                                </div>
                                                <div>
                                                    <Label>Пол</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='sex'
                                                        type="text"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        defaultValue = {sex}
                                                    />
                                                    {this.state.input_error.sex && <small className="error">{this.state.input_error.sex}</small>}
                                                </div>
                                                <div>
                                                    <Label>citizenship</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='citizenship'
                                                        type="text"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        defaultValue = {citizenship}
                                                    />
                                                    {this.state.input_error.citizenship && <small className="error">{this.state.input_error.citizenship}</small>}
                                                </div>
                                                <div>
                                                    <Label>Номер документа</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='docNumber'
                                                        type="text"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        defaultValue = {docNumber}
                                                    />
                                                    {this.state.input_error.docNumber && <small className="error">{this.state.input_error.docNumber}</small>}
                                                </div>
                                                <div>
                                                    <Label>docBirthday</Label>
                                                    <DateTimePickerCustom
                                                        targetInput = 'docBirthday'
                                                        updateData={this.updateData}
                                                        timeFormat = {false}
                                                        name='docBirthday'
                                                        defaultValue = {docBirthday}
                                                        dateFormat = "DD-MM-YYYY"
                                                        onChange = {(event)=>this.onChange(event.target.value)}
                                                    />
                                                    {this.state.input_error.docBirthday && <small className="error">{this.state.input_error.docBirthday}</small>}
                                                </div>
                                                <div>
                                                    <Label>docFrom</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='docFrom'
                                                        type="text"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        defaultValue = {docFrom}
                                                    />
                                                    {this.state.input_error.docFrom && <small className="error">{this.state.input_error.docFrom}</small>}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div>
                                                    <Label>docFromCode</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='docFromCode'
                                                        type="text"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        defaultValue = {docFromCode}
                                                    />
                                                    {this.state.input_error.docFromCode && <small className="error">{this.state.input_error.docFromCode}</small>}
                                                </div>
                                                <div>
                                                    <Label>Резидент</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='rezident'
                                                        type="select"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        value = {rezident}>
                                                        {active_list}
                                                    </Input>
                                                    {this.state.input_error.rezident && <small className="error">{this.state.input_error.rezident}</small>}
                                                </div>
                                                <div>
                                                    <Label>Страна</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='country'
                                                        type="text"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        defaultValue = {country}
                                                    />
                                                    {this.state.input_error.country && <small className="error">{this.state.input_error.country}</small>}
                                                </div>
                                                <div>
                                                    <Label>Адрес</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='address'
                                                        type="text"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        defaultValue = {address}
                                                    />
                                                    {this.state.input_error.address && <small className="error">{this.state.input_error.address}</small>}
                                                </div>
                                                <div>
                                                    <Label>Регион</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='region'
                                                        type="text"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        defaultValue = {region}
                                                    />
                                                    {this.state.input_error.region && <small className="error">{this.state.input_error.region}</small>}
                                                </div>
                                                <div>
                                                    <Label>Город</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='city'
                                                        type="text"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        defaultValue = {city}
                                                    />
                                                    {this.state.input_error.city && <small className="error">{this.state.input_error.city}</small>}
                                                </div>
                                                <div>
                                                    <Label>locality</Label>
                                                    <Input
                                                        className="form-control"
                                                        name='locality'
                                                        type="text"
                                                        onChange={(event)=>this.inputChangedHandler(event)}
                                                        defaultValue = {locality}
                                                    />
                                                    {this.state.input_error.locality && <small className="error">{this.state.input_error.locality}</small>}
                                                </div>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <div><h5>Бонусный счет</h5></div>
                                    <FormGroup>
                                        <div>
                                            <Label>активация/деактивация накоплений бонусных средств на бонусном счете игрока</Label>
                                            <Input
                                                className="form-control"
                                                name='deactive'
                                                type="text"
                                                onChange={(event)=>this.inputChangedHandler(event)}
                                                value = ''
                                            />
                                            {this.state.input_error.deactive && <small className="error">{this.state.input_error.deactive}</small>}
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="btn btn-success"
                                disabled={submitting}
                            >Редактировать
                            </Button>
                            <br />
                            <br />
                        </form>
                    )
                    }
                </Form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        getClientInfo: bindActionCreators(clientInfoActions.getClientInfo, dispatch),
        clientInfoUpdate: bindActionCreators(clientInfoActions.clientInfoUpdate, dispatch)
    };
}

function mapStateToProps(state){

    return  {
        clients: state.client.clients.data,
        halls: state.client.halls
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ClientsFields); //, mapDispatchToProps