import {
    GET_HALL_INFO_REQUEST,
    GET_HALL_INFO_SUCCESS,
} from '../constants/HallInfoConstants';

export function getHallInfo(hallId){
    return (dispatch) => {
        dispatch({
            type: GET_HALL_INFO_REQUEST,
            payload: {fetching: true},
        });
        
        setTimeout(() => {
            dispatch({
                type: GET_HALL_INFO_SUCCESS,
                payload: {
                    'clients': [
                        {
                            'id': 3,
                            'mac_addr': '80:ee:73:83:b6:c4',
                            'ip': '172.16.0.161',
                            'hall_id': '1',
                            'kind': 'game',
                            'vip': '0',
                            'blist': '0',
                            'boot_dttm': '2018-09-05 17:06:59',
                            'activ_dttm': null,
                            'info_kind': '5',
                            'hall_info': {
                                'hall_id': '1',
                                'gs_id': '1',
                                'permission': '1',
                                'tz': '3',
                                'fight_promo': '0',
                                'partners': '3',
                                'qiwi_promo': '1',
                                'balance': '0.00',
                                'cashback_mode': 'NORMAL',
                                'cashback_min': '1.00',
                                'cashback_pct': '10.0',
                                'insurance_max': '5000.00',
                                'race_bonus': '0',
                                'reg_bonus': '500.00',
                                'vpnpw': null,
                                'cashback_settings': '{"1000":"10","25000":"13","50000":"15"}',
                                'top3_on': '0',
                                'dhcp_enabled': '0',
                            },
                            'template_name': 'bbstom',
                            'soft_version': null,
                        },
                        {
                            'id': 7,
                            'mac_addr': '70:54:d2:16:20:73',
                            'ip': '172.16.3.4',
                            'hall_id': '1',
                            'kind': 'game',
                            'vip': '0',
                            'blist': '0',
                            'boot_dttm': '2018-04-12 10:33:17',
                            'activ_dttm': null,
                            'info_kind': '1',
                            'hall_info': {
                                'hall_id': '1',
                                'gs_id': '1',
                                'permission': '1',
                                'tz': '3',
                                'fight_promo': '0',
                                'partners': '3',
                                'qiwi_promo': '1',
                                'balance': '0.00',
                                'cashback_mode': 'NORMAL',
                                'cashback_min': '1.00',
                                'cashback_pct': '10.0',
                                'insurance_max': '5000.00',
                                'race_bonus': '0',
                                'reg_bonus': '500.00',
                                'vpnpw': null,
                                'cashback_settings': '{"1000":"10","25000":"13","50000":"15"}',
                                'top3_on': '0',
                                'dhcp_enabled': '0',
                            },
                            'template_name': null,
                            'soft_version': null,
                        },
                        {
                            'id': 8,
                            'mac_addr': '80:ee:73:67:dc:90',
                            'ip': '172.16.0.168',
                            'hall_id': '1',
                            'kind': 'game',
                            'vip': '0',
                            'blist': '0',
                            'boot_dttm': '2018-07-23 14:13:59',
                            'activ_dttm': '2017-08-18 15:20:00',
                            'info_kind': '1',
                            'hall_info': {
                                'hall_id': '1',
                                'gs_id': '1',
                                'permission': '1',
                                'tz': '3',
                                'fight_promo': '0',
                                'partners': '3',
                                'qiwi_promo': '1',
                                'balance': '0.00',
                                'cashback_mode': 'NORMAL',
                                'cashback_min': '1.00',
                                'cashback_pct': '10.0',
                                'insurance_max': '5000.00',
                                'race_bonus': '0',
                                'reg_bonus': '500.00',
                                'vpnpw': null,
                                'cashback_settings': '{"1000":"10","25000":"13","50000":"15"}',
                                'top3_on': '0',
                                'dhcp_enabled': '0',
                            },
                            'template_name': null,
                            'soft_version': null,
                        },
                        {
                            'id': 15,
                            'mac_addr': '80:ee:73:83:ba:cb',
                            'ip': '172.16.0.143',
                            'hall_id': '1',
                            'kind': 'game',
                            'vip': '0',
                            'blist': '0',
                            'boot_dttm': '2018-04-23 11:23:26',
                            'activ_dttm': null,
                            'info_kind': '7',
                            'hall_info': {
                                'hall_id': '1',
                                'gs_id': '1',
                                'permission': '1',
                                'tz': '3',
                                'fight_promo': '0',
                                'partners': '3',
                                'qiwi_promo': '1',
                                'balance': '0.00',
                                'cashback_mode': 'NORMAL',
                                'cashback_min': '1.00',
                                'cashback_pct': '10.0',
                                'insurance_max': '5000.00',
                                'race_bonus': '0',
                                'reg_bonus': '500.00',
                                'vpnpw': null,
                                'cashback_settings': '{"1000":"10","25000":"13","50000":"15"}',
                                'top3_on': '0',
                                'dhcp_enabled': '0',
                            },
                            'template_name': null,
                            'soft_version': null,
                        },
                        {
                            'id': 16,
                            'mac_addr': '80:EE:73:D0:9B:A3',
                            'ip': '172.16.0.160',
                            'hall_id': '1',
                            'kind': 'game',
                            'vip': '0',
                            'blist': '0',
                            'boot_dttm': '2018-07-23 15:07:35',
                            'activ_dttm': null,
                            'info_kind': '1',
                            'hall_info': {
                                'hall_id': '1',
                                'gs_id': '1',
                                'permission': '1',
                                'tz': '3',
                                'fight_promo': '0',
                                'partners': '3',
                                'qiwi_promo': '1',
                                'balance': '0.00',
                                'cashback_mode': 'NORMAL',
                                'cashback_min': '1.00',
                                'cashback_pct': '10.0',
                                'insurance_max': '5000.00',
                                'race_bonus': '0',
                                'reg_bonus': '500.00',
                                'vpnpw': null,
                                'cashback_settings': '{"1000":"10","25000":"13","50000":"15"}',
                                'top3_on': '0',
                                'dhcp_enabled': '0',
                            },
                            'template_name': null,
                            'soft_version': null,
                        },
                        {
                            'id': 21,
                            'mac_addr': '80:ee:73:bd:ae:fc',
                            'ip': '172.16.0.145',
                            'hall_id': '1',
                            'kind': 'info_win',
                            'vip': '0',
                            'blist': '0',
                            'boot_dttm': null,
                            'activ_dttm': null,
                            'info_kind': null,
                            'hall_info': {
                                'hall_id': '1',
                                'gs_id': '1',
                                'permission': '1',
                                'tz': '3',
                                'fight_promo': '0',
                                'partners': '3',
                                'qiwi_promo': '1',
                                'balance': '0.00',
                                'cashback_mode': 'NORMAL',
                                'cashback_min': '1.00',
                                'cashback_pct': '10.0',
                                'insurance_max': '5000.00',
                                'race_bonus': '0',
                                'reg_bonus': '500.00',
                                'vpnpw': null,
                                'cashback_settings': '{"1000":"10","25000":"13","50000":"15"}',
                                'top3_on': '0',
                                'dhcp_enabled': '0',
                            },
                            'template_name': null,
                            'soft_version': null,
                        },
                    ],
                    'hall_info': {
                        'hall_id': '1',
                        'gs_id': '1',
                        'permission': '1',
                        'tz': '3',
                        'fight_promo': '0',
                        'partners': '3',
                        'qiwi_promo': '1',
                        'balance': '0.00',
                        'cashback_mode': 'NORMAL',
                        'cashback_min': '1.00',
                        'cashback_pct': '10.0',
                        'insurance_max': '5000.00',
                        'race_bonus': '0',
                        'reg_bonus': '500.00',
                        'vpnpw': null,
                        'cashback_settings': '{"1000":"10","25000":"13","50000":"15"}',
                        'top3_on': '0',
                        'dhcp_enabled': '0',
                    },
                    fetching: false
                }
        })
        }, 2000);
    };
}
