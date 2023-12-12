import Button from "../components/AuthButton";

export default function LandingPage(){
    return(
        <div>
            <h1>Welcome to SimpleChatApp</h1>
            <p>Click the button below to login</p>
            <Button type="login">Login</Button>
            <Button type="signup">Signup</Button>
        </div>
    )
}