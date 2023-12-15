import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import styles from "../../styles/chats.module.scss";
import ChatRoom from "../components/ChatRoom";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Chats() {
  const { isAuthenticated, user } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  const sendMessage = () => {
    console.log('CURRENT', message);
    console.log('CURRENT', room);
    socket.emit("send_message", { message, room });
    setMessage("");
    document.querySelector('input[type="textarea"]').value = ""; 
  };
  
  const joinRoom = () => {
    if (room) {
      socket.emit("join_room", room);
    }
  };

  return (
    <section className={styles.chats}>
      <div className={styles.chats_content}>
        <section className={styles.chats_chat_window}>
          <div className={styles.chats_chat_window_inputs}>
            <input type="color" />
            <div className={styles.chats_userPhoto}>
              {/* //add user photo here */}
              {messages.length}
              {console.log(messages)}
              {room}
            </div>
          </div>
          <div className={styles.chats_chat_window_messages}>
            <div className={styles.chats_chat_window_messages_message}>
              {messages.map((message, index) => {
                return (
                  <div key={index}>
                    <p>{message}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.chats_chat_window_messages_input}>
              <input type="textarea" placeholder="Type a message..." onChange={(event) => {
                setMessage(event.target.value)
              }}/>
              <div className={styles.chats_chat_window_messages_input_send}>
                <button className={styles.chat_inputBtn} onClick={sendMessage} disabled={!room} >Send</button>
                <button className={styles.chat_inputBtn} onClick={joinRoom} disabled={!room} >Reply</button>
                <button className={styles.chat_inputBtn}>Exit</button>
                <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.chats_chats_select}>
          <ChatRoom chatRoomID={"A"} />
          <ChatRoom chatRoomID={"B"} />
          <ChatRoom chatRoomID={"C"} />
          <ChatRoom chatRoomID={"D"} />
        </section>
      </div>
    </section>
  );
}
