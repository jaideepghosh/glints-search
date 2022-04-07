import { UserProfile } from "@clerk/clerk-react";

const UserProfilePage = () => {
    return (
        <UserProfile path="/my-account" routing="path" />
    )
}
  
export default UserProfilePage;
  