import styles from "./ProfileCard.module.css"
import cover from "../../img/cover.jpg";
import avatar from "../../img/profiled.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard=({location})=>{
    const {user}=useSelector((state)=> state.authReducer.authData)
    const posts=useSelector((state)=>state.postReducer.posts)
    const serverPublic= process.env.REACT_APP_PUBLIC

    const ProfilePage = false;

    return(
    <div className={styles.profileCard}>
        <div className={styles.profileImg}>
            <img src={user.coverphoto? serverPublic+user.coverPicture:cover} alt=""/>
            <img  src={user.profilephoto? serverPublic+user.coverPicture:avatar} alt=""/>
        </div>

        <div className={styles.profileName}>
            <span> {user.firstname} {user.lastname}</span>
            <span> {user.worksat? user.worksat: "Write about yourself"}</span>
        </div>
        <div className={styles.followStatus}>
            <hr/>
            <div>
            <div className={styles.follow}>
                <span> {user.following.length}  </span>
                <span> Followings</span>
            </div>
            <div className={styles.vl}></div>
            <div className={styles.follow}>
                <span> {user.followers.length}  </span>
                <span> Followers</span>
            </div>
            {location==='profilePage' && (
                <>
                    <div className={styles.vl}>

                    </div>
                    <div className={styles.follow}>
                        <span> {posts.filter((post)=>post.userId===user._id).length}</span>
                        <span> Posts</span>
                    </div>
                </>
            )}
            </div>
            <hr/>
        </div>
        { location==='profilePage'? '':<span>
            <Link style={{textDecoration:"none", color:"inherit"}} to ={`/profile/${user._id}`}> 
            My Profile
            </Link>
        </span>}
        
    </div>
    )
}

export default ProfileCard;

