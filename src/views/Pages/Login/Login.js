import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { login } from '../../../actions/AuthActions';
import { findDOMNode } from 'react-dom';
import * as authActions from '../../../actions/AuthActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {DefaultLayout} from '../../../containers';
import './Login.css';

class Login extends Component {
  constructor(props){
      super(props);
      this.onClick = this.onClick.bind(this);
      this.state = {
          validateError: false,
          message: this.message
      }
  }
  
    onClick (e){
    const name = findDOMNode(this.name).value;
    const pass = findDOMNode(this.password).value;
    
    if(!name || !pass){
        this.setState({
            validateError: true,
            message :  'Укажите логин и/или пароль',
        });
        return;
    }
    
    this.setState({
        validateError: false,
        message :  ''
    });
    this.props.authActions.login({
        login: name,
        password: pass
    });
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Вход</h1>
                      <p className="text-muted">Войти</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            ref={input => this.name = input}
                            type="text" placeholder="Username"
                            autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            ref={input => this.password = input}
                            type="password" placeholder="Password"
                            autoComplete="current-password" />
                      </InputGroup>
                        <p className="error">{
                            this.state.validateError && this.state.message
                        }
                        </p>
                      <Row>
                        <Col xs="6">
                          <Button
                              onClick={this.onClick}
                              color="primary" className="px-4">Войти</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

function mapStateToProps(state){
  return {
      error: state.auth.error,
      message: state.auth.errorMessage
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
