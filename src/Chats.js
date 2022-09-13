import React, { useEffect, useState } from "react";
import "./Chats.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { selectUser } from "./features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input placeholder="Friends" types="text" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
};

export default Chats;
