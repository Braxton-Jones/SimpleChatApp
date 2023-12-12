import { useAuth0 } from "@auth0/auth0-react";
import styles from "../../styles/chats.module.scss";

export default function Chats() {
  const { isAuthenticated, user } = useAuth0();
  console.log(user);
  return (
    <div>
      <h1>Chats</h1>
      <p>Chat with your friends {isAuthenticated ? "true" : "false"} </p>
    </div>
  );
}
