import react from 'react'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import ProfileCard from '../../components/Profilecard/ProfileCard'
import styles from "./ProfileSide.module.css"
import { FollowersCard } from '../../components/FollowersCard/FollowersCard'
export default function ProfileSide() {

    return (
        <div className={styles.profileside}>
            <div>
            <LogoSearch />
            </div>
            <div>
            <ProfileCard location="homapage"/>
            </div>
            <FollowersCard/>
        </div>
        )
    }