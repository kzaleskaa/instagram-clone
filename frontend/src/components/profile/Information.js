import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import NewPost from "../forms/NewPostForm";
import ChangeProfileImage from "../forms/ChangeProfileImage";
import classes from "./Information.module.css";

const Information = (props) => {
  const [follow, setFollow] = useState(props.follow);
  const [modal, setModal] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  const addNewPost = (
    <div className={classes["new-post"]}>
      <NewPost setUpdatePosts={props.setUpdatePosts} />
    </div>
  );

  const updateRelation = async () => {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    try {
      if (follow) {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND}/api/profile/followers/${props.user.pk}`,
          configuration
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND}/api/profile/followers/${props.user.pk}`,
          null,
          configuration
        );
      }
      setFollow((prev) => !prev);
      props.loadUser();
    } catch (err) {
      alert(err);
    }
  };

  const followUserHandler = (e) => {
    e.preventDefault();
    updateRelation();
  };

  const followNewUser = (
    <div>
      <button
        className={`btn-submit ${follow && "btn-gray"}`}
        onClick={followUserHandler}
      >
        {follow ? "Unfollow" : "Follow"}
      </button>
    </div>
  );

  return (
    <>
      {modal && props.user.nickname === currentUser.nickname && (
        <ChangeProfileImage onClose={() => setModal(false)} />
      )}
      <header className={classes.header}>
        <div className={classes.user}>
          <div
            className={classes["photo-container"]}
            onClick={() => setModal(true)}
          >
            {props.user.image ? (
              <img
                src={`${process.env.REACT_APP_BACKEND}${props.user.image}`}
                alt="user"
              />
            ) : (
              <img src="/avatar.png" alt="user" />
            )}
          </div>
          <div>
            <h3>@{props.user.nickname}</h3>
            <h4>{`${props.user.first_name} ${props.user.last_name}`}</h4>
          </div>
        </div>
        <div className={classes["info-container"]}>
          <ul className={classes["profile-info"]}>
            <li>
              <div>
                <span className={classes.number}>
                  {props.user.posts_number}
                </span>
                posts
              </div>
            </li>
            <li>
              <div>
                <span className={classes.number}>{props.user.followers}</span>
                followers
              </div>
            </li>
            <li>
              <div>
                <span className={classes.number}>{props.user.following}</span>
                following
              </div>
            </li>
          </ul>
        </div>
        {props.user.nickname === currentUser.nickname
          ? addNewPost
          : followNewUser}
      </header>
    </>
  );
};

export default Information;
