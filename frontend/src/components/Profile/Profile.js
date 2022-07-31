import React from "react";
import ArrowIcon from '../../assets/icons/arrow_icon.jpg';
import profileStyles from './Profile.module.scss';

const Profile = ({setIsOpenProfile, isOpenProfile}) => {
    
    return (
        <div className={profileStyles.container} onClick={() => setIsOpenProfile(!isOpenProfile)}>
            My profile
            <div className={profileStyles.arrow}>
                <img alt="arrow_icon" src={ArrowIcon} className={isOpenProfile ? `${profileStyles.arrow_not_clicked}` : `${profileStyles.arrow_clicked}`}/>
            </div>
        </div>
    )
}

export default Profile;