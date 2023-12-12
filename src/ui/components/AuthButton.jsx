import { useAuth0 } from "@auth0/auth0-react";

export default function AuthButton({ children, ...props }) {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { isAuthenticated } = useAuth0();
  const isDisabled = !isAuthenticated && props.type === "logout";

  // Login Functionalities
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: "/chats" },
    });
  };

  // Signup Functionalities
  const handleSignup = async () => {
    await loginWithRedirect({
      appState: { returnTo: "/chats" },
      authorizationParams: { screen_hint: "signup" },
    });
  };

  // Logout Functionalities
  const handleLogout = async () => {
    await logout({
      returnTo: window.location.origin,
    });
  };

  const handleAction = () => {
    switch (props.type) {
      case "login":
        handleLogin();
        break;
      case "signup":
        handleSignup();
        break;
      case "logout":
        handleLogout();
        break;
      default:
        // Handle other cases or provide a default action
        console.error("Invalid action type");
    }
  };

  return (
    <button
      style={{
        ...props.style,
        padding: "1vh 4vw",
        borderRadius: "5px",
        cursor: "pointer",
        border: "1.5px solid rgba(57, 57, 57, 1)",
        backgroundColor: isDisabled ? "gray" : props.style.backgroundColor,
      }}
      onClick={handleAction}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
