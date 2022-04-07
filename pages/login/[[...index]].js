import { SignIn } from "@clerk/clerk-react";

const Login = () => {
    return (
        <div className="m-10">
            <SignIn path="/login" routing="path"/>
        </div>
    )
}
  
export default Login;
  