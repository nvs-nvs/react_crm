import React, { Component } from 'react';

class HallsTr extends Component {
    render() {
        const { mac_addr, id} = this.props.client;
        return (
            <tr>
                <td className="hall_info_td_center">
                    { mac_addr }
                </td>
                <td className="hall_info_td_center">
                    { id }
                </td>
            </tr>
        );
    }
}

export default HallsTr;