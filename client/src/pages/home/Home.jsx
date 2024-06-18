import react from "react";
import styles from "./Home.module.css";
import ProfileSide from "./ProfileSide";
import ProfileCard from "../../components/Profilecard/ProfileCard";
import Postside from "../../components/Postside/Postside";
import RightSide from "../../components/RightSide/RightSide";

export default function Home() {
  return <div className={styles.Home}>
        <ProfileSide/>
        <Postside/>
        <RightSide/>
  </div>;
}

