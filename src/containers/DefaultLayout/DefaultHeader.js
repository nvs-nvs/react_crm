import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo_bb_org.png'
import sygnet from '../../assets/img/brand/logo_bb_org.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
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
                <p>ID: {user.name}</p>
                <p>ID: {user.id}</p>
                <p>email: {user.email}</p>
                <p>Должность: {user.position}</p>
                <p>Роль: {user.role}</p>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-lock"></i>Выйти</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

function mapStateToProps(state){
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(DefaultHeader);
