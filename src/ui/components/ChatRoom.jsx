import styles from "../../styles/chatroom.module.scss";
import { useEffect } from "react";

export default function ChatRoom(props) {
  const { chatRoomID, connectedUsers } = props;

  return (
    <section className={styles.chatroom}>
      <div className={styles.chatroom_content}>
        <div className={styles.chatroom_ID}>
          <p>{chatRoomID || "E"}</p>
        </div>
        <div className={styles.chatroom_details}>
          <p>Chat Room: {chatRoomID || "E"}</p>
          <div className={styles.chatroom_connectedUsers}>
            <p>{(connectedUsers && connectedUsers.length) || 0} Users Online</p>
          </div>
        </div>
      </div>
    </section>
  );
}
