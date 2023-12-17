import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import styles from "../../styles/chats.module.scss";
import ChatRoom from "../components/ChatRoom";
import profile from "../../assets/profile.png";
import { socket } from "../../util/socket";
export default function Chats() {
  const { user } = useAuth0();
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  console.log("User:", user);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    console.log("Socket:", socket);
    socket.on("get_message", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("get_message");
    };
  }, []);

  const handleJoinRoom = (roomID) => {
    console.log("Function", roomID);
    console.log("Current Room:", room);

    if (roomID !== room) {
      console.log("Leaving room", room);
      socket.emit("leave_room", room);
    }

    socket.emit("join_room", roomID);
    console.log("Joined room", roomID);
    setRoom(roomID);
  };

  const handleLeaveRoom = () => {
    socket.emit("leave_room", room);
    setRoom(null);
  };

  // Handle sending a message
  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {
    if (message === "") return;
    socket.emit("send_message", { message, room, name: user.name });
    console.log("Sent message:", message);
    setMessage("");
  };

  return (
    <section className={styles.chats}>
      <div className={styles.chats_content}>
        <section className={styles.chats_chat_window}>
          <div className={styles.chats_chat_window_inputs}>
            <input type="color" />
            <img
              src={user.picture || profile}
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
                    You are currently not connected to any rooms. Select any
                    room to join!
                  </p>
                </div>
              ) : (
                <div className={styles.room}>
                 {messages.map((message, index) => (
  <div key={index} className={styles.message}>
    <p>{message.name}: {message.message}</p>
    <p>Room: {message.room}</p>
  </div>
))}
                </div>
              )}
            </div>
            <div className={styles.chats_chat_window_messages_input}>
              <input
                type="textarea"
                placeholder="Type a message..."
                onChange={(e) => handleMessageInput(e)}
                value={message}
              />
              <div className={styles.chats_chat_window_messages_input_send}>
                <button className={styles.chat_inputBtn} disabled={true}>
                  {`${isConnected}`}
                </button>
                <button
                  className={styles.chat_inputBtn}
                  disabled={!room}
                  onClick={() => handleSendMessage()}
                >
                  Send
                </button>
                <button
                  className={styles.chat_inputBtn}
                  onClick={() => handleLeaveRoom()}
                  disabled={!room}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.chats_chats_select}>
          <ChatRoom chatRoomID={"A"} setRoom={handleJoinRoom} room={room} />
          <ChatRoom chatRoomID={"B"} setRoom={handleJoinRoom} room={room} />
          <ChatRoom chatRoomID={"C"} setRoom={handleJoinRoom} room={room} />
          <ChatRoom chatRoomID={"D"} setRoom={handleJoinRoom} room={room} />
        </section>
      </div>
    </section>
  );
}
