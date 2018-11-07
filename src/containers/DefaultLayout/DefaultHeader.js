import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo_bb_org.png'
import sygnet from '../../assets/img/brand/logo_bb_org.png'
import {onlyNumbers} from '../../helpers/validators';
import { logout } from '../../actions/AuthActions';
import { bindActionCreators } from 'redux';

const defaultProps = {};

class DefaultHeader extends Component {
    constructor(props){
      super(props);
      this.onClickHandler = this.onClickHandler.bind(this);
    }
    
    onClickHandler = function(e){
        this.props.logout();
    };
  
  render() {
    // eslint-disable-next-line
    const { children, user, ...attributes } = this.props;
    
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'BingoBoom Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'BingoBoom Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
                { user.email }
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem>
                <p>Пользватель: {user.name}</p>
                <p>Имя: {user.name}</p>
                <p>ID: {user.id}</p>
                <p>email: {user.email}</p>
                <p>Должность: {user.position}</p>
                <p>Роль: {user.role}</p>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.onClickHandler}><i className="fa fa-lock"></i>Выйти</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  };
}

function mapDispatchToProps (dispatch) {
    return {
      logout: bindActionCreators(logout, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
