import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import styles from "../../styles/chats.module.scss";
import ChatRoom from "../components/ChatRoom";
import io from "socket.io-client";
import profile from "../../assets/profile.png";

const socket = io("http://localhost:3001");

export default function Chats() {
  const [room, setRoom] = useState(null);

  const handleJoinRoom = (room) => {
    socket.emit("join_room", room);
    setRoom(room);
  }

  const handleLeaveRoom = (room) => {
    socket.emit("leave_room", room);
    setRoom(null);
  }

  // Handle sending a message

  return (
    <section className={styles.chats}>
      <div className={styles.chats_content}>
        <section className={styles.chats_chat_window}>
          <div className={styles.chats_chat_window_inputs}>
            <input type="color" />
            <img
              src={profile}
              alt="profile"
              className={styles.chats_userPhoto}
            />
          </div>
          <div className={styles.chats_chat_window_messages}>
            <div className={styles.chats_chat_window_messages_message_board}>
              {room === null || room === "" ? (
                <div className={styles.noRoom}>
                <h1>Ready to Dive into Conversations?</h1>
                <p>
                  You are currently not connected to any rooms. 
                  Select any room to join!
                </p>
              </div>              
              ) : (
                <div className={styles.room}>Room Connected!</div>
              )}
            </div>
            <div className={styles.chats_chat_window_messages_input}>
              <input type="textarea" placeholder="Type a message..." />
              <div className={styles.chats_chat_window_messages_input_send}>
                <button className={styles.chat_inputBtn} disabled={!room}>
                  Send
                </button>
                <button className={styles.chat_inputBtn} disabled={!room}>
                  Reply
                </button>
                <button className={styles.chat_inputBtn} onClick={() => handleLeaveRoom(room)} disabled={!room}>Exit</button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.chats_chats_select}>
          <ChatRoom chatRoomID={"A"} setRoom={handleJoinRoom} room={room}/>
          <ChatRoom chatRoomID={"B"} setRoom={handleJoinRoom} room={room}/>
          <ChatRoom chatRoomID={"C"} setRoom={handleJoinRoom} room={room}/>
          <ChatRoom chatRoomID={"D"} setRoom={handleJoinRoom} room={room}/>
        </section>
      </div>
    </section>
  );
}
