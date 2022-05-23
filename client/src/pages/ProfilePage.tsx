import FollowBtn from "../components/FollowBtn";
import UserProfileInfo from "../components/UserProfileInfo";
import { useAuth } from "../context/AuthContext";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { useParams, Params, Link } from "react-router-dom";
import "../styles/profileInfoGrid.modules.css";
import ProfileStats from "../components/ProfileStats";
import TokenBalance from "../components/TokenBalance";
import BlogPostInfo from "../components/BlogPostInfo";
function ProfilePage() {
  const { accounts, error } = useAuth();
  const paramObj: Readonly<Params<string>> = useParams();
  console.log(paramObj);
  const { uid } = paramObj;
  console.log(`UID: ${uid}`);
  useAccountsChanged();
  return (
    <>
      <h1>Dashboard</h1>
      <main className="dashboard-main-grid">
        <UserProfileInfo />
        <ProfileStats />
        <TokenBalance />
        <BlogPostInfo />
        <Link to="/create-post">CreateBlogPost</Link>
        <Link to="/blogfeed">Blogfeed</Link>
      </main>
    </>
  );
}

export default ProfilePage;
