import React from 'react';
import styles from './LogoSearch.module.css'
import Logo from "../../img/logo.png"
import {UilSearch} from '@iconscout/react-unicons';

const LogoSearch = () => {
    return (
        <div className={styles.logo_search}>
            <img src={Logo} alt="" />
            <div className={styles.search}>
                <input type="text" placeholder="#Explore" />
                <div className={styles.s_icon}>
                    <UilSearch/>
                </div>
            </div>
        </div>
    )
}
export default LogoSearch
