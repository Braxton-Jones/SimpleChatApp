import Button from "../components/AuthButton";
import styles from "../../styles/landingpage.module.scss";

export default function LandingPage() {
  return (
    <section className={styles.landingPage}>
      <div className={styles.landingPage_content}>
        <h1 className={styles.landingPage_title}>Welcome to SimplyChatApp</h1>
        <p className={styles.landingPage_description}>
          Discover a new way to connect, communicate, and share with
          ConnectChat, the most innovative and user-friendly chat app on the
          market. Whether you're chatting with friends, family, or colleagues,
          our app provides a seamless and enjoyable experience that goes beyond
          traditional messaging.
        </p>
        <div className={styles.landingPage_btn_wrapper}>
          <Button
            type="login"
            style={{
              backgroundColor: "rgba(225, 215, 229, 0.8)",
              color: "white",
            }}
          >
            Login
          </Button>
          <Button
            type="signup"
            style={{
              backgroundColor: "rgba(200, 190, 204, 1)",
              color: "white",
            }}
          >
            Signup
          </Button>
        </div>
      </div>
    </section>
  );
}
