import React, { useEffect, useState } from "react";
import "./Chats.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { db } from "./firebase";
import Chat from "./Chat";
function Chats() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar" />
        <div className="chats__search">
          <SearchIcon />
          <input placeholder="Friends" types="text" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timeStamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              username={username}
              timeStamp={timeStamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Chats;
