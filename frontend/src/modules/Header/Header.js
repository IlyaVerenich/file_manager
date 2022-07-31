import React, { useState } from 'react';
import Profile from '../../components/Profile/Profile';
import headerStyles from './Header.module.scss';

const Header = () => {
    const [isOpenProfile, setIsOpenProfile] = useState(false);

    return (
        <div className={headerStyles.container}>
            <p className={headerStyles.logo}>LOGO</p>
            <p className={headerStyles.title}>File manager</p>
            <div className={ isOpenProfile ? `${headerStyles.profile_open}` : `${headerStyles.profile}`}>
                <Profile isOpenProfile={isOpenProfile} setIsOpenProfile={setIsOpenProfile}/>
            </div>
        </div>
    )
}

export default Header;