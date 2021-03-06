import { useState } from "react";
import classes from "./Posts.module.css";
import Modal from "../modal/Modal";
import PostDetails from "./PostDetails";
import LocationMap from "./LocationMap";

const Posts = (props) => {
  const [modalIsShow, setModalIsShown] = useState(false);
  const [mapIsShow, setMapIsShow] = useState(false);
  const [showNumber, setShowNumber] = useState(0);

  const posts = props.posts;

  const showModalHandler = (e) => {
    setShowNumber(Number(e.target.id));
    setModalIsShown(true);
  };

  const changePostNextHandler = () => {
    if (showNumber + 1 < posts.length) {
      setShowNumber(showNumber + 1);
    }
  };

  const changePostBackHandler = () => {
    if (showNumber - 1 >= 0) {
      setShowNumber(showNumber - 1);
    }
  };

  const presentUserPosts = () => {
    if (typeof posts === "string") {
      return <p className={classes["no-posts"]}>{posts}</p>;
    }
    return (
      <div className={classes["posts-container"]}>
        {posts.map((item, index) => (
          <div
            className={classes.post}
            onClick={showModalHandler}
            key={index}
            id={index}
          >
            <img
              src={`${process.env.REACT_APP_BACKEND}${item.image}`}
              alt="post"
              id={index}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {presentUserPosts()}
      {modalIsShow && !mapIsShow && (
        <Modal
          onCloseModal={() => setModalIsShown(false)}
          changePostNextHandler={changePostNextHandler}
          changePostBackHandler={changePostBackHandler}
          typeOfModal="posts"
        >
          <div className={classes.container}>
            <div className={classes.photo}>
              <img
                src={`${process.env.REACT_APP_BACKEND}${posts[showNumber].image}`}
                alt="post"
              />
            </div>
            <PostDetails
              post={posts[showNumber]}
              setUpdatePosts={props.setUpdatePosts}
              setMapIsShow={setMapIsShow}
            />
          </div>
        </Modal>
      )}
      {mapIsShow && (
        <LocationMap
          lat={posts[showNumber].lat}
          lon={posts[showNumber].lon}
          location={posts[showNumber].location}
          onCloseModal={() => setMapIsShow(false)}
        />
      )}
    </>
  );
};

export default Posts;
