import { SignUp } from "@clerk/clerk-react";

const UserProfilePage = () => {
    return (
        <div className="m-10">
            <SignUp path="/register" routing="path" />
        </div>
    )
}
  
export default UserProfilePage;
  