import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/applayout.module.scss";
import { AuthNavigateProvider } from "./util/AuthNavigateProvider";
import AuthButton from "./ui/components/AuthButton";
import github from "./assets/github.png";

const AppLayout = () => {
  return (
    <AuthNavigateProvider>
      <main className={styles.app_layout}>
        <header className={styles.app_layout_header}>
          <h1>SimpleChatApp</h1>
          <AuthButton
            type="logout"
            style={{
              backgroundColor: "rgba(233, 179, 255, 1)",
              color: "rgba(57, 57, 57, 1)",
            }}
          >
            Logout
          </AuthButton>
        </header>
        <Outlet />
        <footer className={styles.app_layout_footer}>
          <p className={styles.tagline}>
            Created with Love 💜 by{" "}
            {
              <a
                href="https://portfolio.braxtonjones.dev/"
                className={styles.linkTo_me}
              >
                brx
              </a>
            }
          </p>
        </footer>
      </main>
    </AuthNavigateProvider>
  );
};

export default AppLayout;
